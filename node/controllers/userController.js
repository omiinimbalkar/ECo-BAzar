
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Mongoose Models
const Users = mongoose.model('Users', {
    username: String,
    email: String,
    mobile: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likedProduct = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.dislikedProduct = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $pull : { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'Disliked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err' })
        })

}

module.exports.signup = async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;
        const user = new Users({ username, email, mobile, password });

        await user.save();
        res.json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId

    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: " sucess. ",
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: " server error in user  " })
        })
}


module.exports.getUserById = async (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: " sucess. ",
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: " server error in user  " })
        })
}

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });

        if (!user) {
            return res.json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.json({ message: 'Password not matched' });
        }

        const token = jwt.sign({ data: user }, 
        'MYKEY', { expiresIn: '1h' });
        res.json({ message: 'User found', token, userId: user._id , username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports.likedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })

}

