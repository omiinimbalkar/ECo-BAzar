// const express = require('express')
// const path = require('path');
// const cors = require('cors')
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const fileExtension = file.originalname.split('.').pop(); // Get file extension
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
//   },
// })

// const upload = multer({ storage: storage })

// const bodyParser = require('body-parser')

// const app = express()

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cors())

// const port = 4000
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://omssn21:om212006@cluster0.vr8ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')



// const Users = mongoose.model('Users', 
//   { username: String, 
//     password: String,
//     likedProducts : [{type : mongoose.Schema.Types.ObjectId,ref:'Products'}]
//   });  // we are creating a model
// const Products = mongoose.model('Products', { pname: String, pdesc:String, price:String, category:String, pimg:String});  // we are creating a model for product 

// // app.get('/ap', (req, res) => {
// app.get('/', (req, res) => {
//   res.send('Hello Coder.....🌐 ')
// })

// app.post('/liked-product', (req ,res) =>{
//     let productId = req.body.productId;
//     let userId = req.body.userId;


//     //update user model
//     Users.updateOne({_id: ( userId )} ,{$addToSet : { likedProducts : productId }})
//     .then(() => {
//       res.send({message : 'Liked successfully'})
//     })
//     .catch(() => {
//     res.send({message: 'Server Error'});  
//     });
// })
// //we get data frm frotend fro add product
// app.post('/add-product',upload.single('pimg'),(req,res)=>{
//     const pname  = req.body.pname;
//     const pdesc  = req.body.pdesc;
//     const price  = req.body.price;
//     const category  = req.body.category;
//     const pimg  = req.file.path;

//     const product = new Products({ pname, pdesc, price, category, pimg});
//     product.save()
//     .then(() => {
//       res.send({message : 'Product is Saved'})
//     })
//     .catch(() => {
//     res.send({message: 'Server Error'});  
//     });
// })
// //For main products 
// app.get('/get-products',(req,res)=>{
//   Products.find()//findall
//   .then((result)=>{
//     res.send({message:"succesfully saved.." , products : result})
//   })
//   .catch((err)=>{
//     res.send({message:"server err"})
//   })
// })

// //for product detail
// app.get('/get-product/:pId',(req,res)=>{
//   console.log(req.params)
//   Products.findOne({ _id : req.params.pId}) //id match get result
//   .then((result)=>{
//     res.send({message:"succesfully saved.." , products : result})
//   })
//   .catch((_err)=>{
//     res.send({message:"server err"})
//   })
// })

// //liked product
// app.post('/liked-products', (req, res) => {
//   Users.findOne({_id: req.body.userId}).populate('likedProducts')
//     .then((result) => {
//       res.send({ message: "succesfully saved..", products: result.likedProducts})
//     })
//     .catch((err) => {
//       res.send({ message: "server err" })
//     })
// })

// // we get data frm frontend so we give name as signup

// app.post ('/signup', (req, res) => {
//   const username  = req.body.username;
//   const password = req.body.password; 
//   const user = new Users({ username: username, password: password });

//   user.save()
//   .then(() => {
//     res.send({message : 'User created'})
//   })
//   .catch(() => {
//   res.send({message: 'Server Error'});  
//   });
// })  

// // we get data frm frontend so we give name as login

// app.post ('/login', (req, res) => {
//   const username  = req.body.username;
//   const password = req.body.password; 

//   Users.findOne({username: username})  

//   .then((result) => {
//     if(!result){
//       res.send({message : 'User not found'}) //user dta not found
//     }
//     else{
//       if(result.password === password){ 
//         const token = jwt.sign({
//           data:  result 
//         }, 'MYKEY', { expiresIn: '1h'});
//         res.send({message : 'User found',token:token , userId : result._id}) //user data found
//       }
//       if(result.password !== password){
//         res.send({message : 'Password not matched'}) //password not matched
//       }
//     }
//   })

//   // if api not runs the it return thissss
//   .catch(() => {
//   res.send({message: 'Server Error'});  
//   });
// })  

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { type } = require('os');

const app = express();
const port = 4000;

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Database Connection
mongoose.connect('mongodb+srv://omssn21:om212006@cluster0.vr8ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Storage Configuration for File Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});
const upload = multer({ storage: storage });

// Mongoose Models
const Users = mongoose.model('Users', {
  username: String,
  email: String,
  mobile: String,
  password: String,
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

let schema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  price: String,
  category: String,
  pimg: String,
  pimg2: String,
  addedBy: mongoose.Schema.Types.ObjectId,
  pLoc :{
    type : {
      type: String,
      enum :['Point'],
      default: 'Point'
    },
    coordinates : {
      type : [Number]
    }
  }

})

schema.index({ pLoc : '2dsphere'}); // four side area scan

const Products = mongoose.model('Products',schema);

// API Routes
app.get('/', (req, res) => {
  res.send('Hello Coder.....🌐');
});

//for search
app.get('/search', (req, res) => {
  let search = req.query.search;
  Products.find({
    $or: [
      { pname: { $regex: search } },
      { pdesc: { $regex: search } },
      { price: { $regex: search } },
    ]
  })
    .then((results) => {
      res.send({ message: 'success', product: results })
    })
    .catch((err) => {
      res.send({ message: ' server error in search ' })
    })
});

// Add Product API
app.post('/add-product', upload.fields([{ name: 'pimg' }, { name: 'pimg2' }]), async (req, res) => {
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

  const product = new Products({ pname, pdesc, price , category, pimg , pimg2 , addedBy, pLoc :{
    type: 'Point', coordinates: [plat,plog]
  } })
  product.save()
     .then(() =>{
       res.send({message : "saved success product."})
     })
     .catch(()=>{
      res.send({message: "server error product."})
     })
});



// Get All Products API
app.get('/get-products', async (req, res) => {
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
});

// Get Product by ID
app.get('/get-product/:pId', async (req, res) => {
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
});

// Liked Products API
app.post('/liked-product', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    await Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } });

    res.json({ message: 'Liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get Liked Products API
app.post('/liked-products', async (req, res) => {
  try {
    const user = await Users.findById(req.body.userId).populate('likedProducts');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Liked products fetched", products: user.likedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Signup API
app.post('/signup', async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    const user = new Users({ username, email, mobile, password });

    await user.save();
    res.json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/get-user/:uId', async (req, res) => {
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
})
// Login API
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.json({ message: 'Password not matched' });
    }

    const token = jwt.sign({ data: user }, 'MYKEY', { expiresIn: '1h' });
    res.json({ message: 'User found', token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
