
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    pname: String,
    pdesc: String,
    price: String,
    category: String,
    pimg: String,
    pimg2: String,
    addedBy: mongoose.Schema.Types.ObjectId,
    pLoc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number]
        }
    }

})

schema.index({ pLoc: '2dsphere' }); // four side area scan

const Products = mongoose.model('Products', schema);

module.exports.search = (req, res) => {
    let latitude = req.query.loc.split(',')[0];
    let longitude = req.query.loc.split(',')[1];

    let search = req.query.search;
    Products.find({
        $or: [
            { pname: { $regex: search } },
            { pdesc: { $regex: search } },
            { price: { $regex: search } },
        ],
        pLoc: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                },
                $maxDistance: 500 * 1000,
            }
        }
    })
        .then((results) => {
            res.send({ message: 'success', product: results })
        })
        .catch((err) => {
            res.send({ message: ' server error in search ' })
        })
}

module.exports.addProduct = async (req, res) => {
    console.log(req.files)
    console.log(req.body)
    const plat = req.body.plat;
    const plog = req.body.plog;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const price = req.body.price;
    const category = req.body.category;
    const pimg = req.files?.pimg?.[0]?.path || '';
    const pimg2 = req.files?.pimg2?.[0]?.path || '';
    const addedBy = req.body.userId;

    const product = new Products({
        pname, pdesc, price, category, pimg, pimg2, addedBy, pLoc: {
            type: 'Point', coordinates: [plat, plog]
        }
    })
    product.save()
        .then(() => {
            res.send({ message: "saved success product." })
        })
        .catch(() => {
            res.send({ message: "server error product." })
        })
}

module.exports.getProducts = async (req, res) => {
    const catName = req.query.catName;
    let _f = {}

    if (catName) {
        _f = {
            category: catName
        }
    }

    try {
        const products = await Products.find(_f);
        if (products.length === 0) {
            return res.json({ message: "No products found", products: [] });
        }
        res.json({ message: "Products fetched successfully", products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.getProductsById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.pId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product found", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.myProducts = async (req, res) => {
    const userId = req.body.userId;

    Products.find({ addedBy: userId })
        .then((result) => {
            res.send({ message: 'success', products: result })
        })
        .catch((err) => {
            res.send({ message: 'server err in addproduct' })
        })

}

