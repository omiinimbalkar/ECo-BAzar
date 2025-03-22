
const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const http = require('http'); 
const { Server } = require ("socket.io");
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
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
const httpServer = http.createServer(app);  
const io = new Server(httpServer , {
  cors : {
    origin : '*'
  }
})

// API Routes
app.get('/', (req, res) => {
  res.send('Hello Coder.....🌐');
});

//for search
app.get('/search', productController.search);

// Liked Products API
app.post('/liked-product', userController.likedProduct);

// DisLiked Products API
app.post('/disliked-product', userController.dislikedProduct);

// Add Product API
app.post('/add-product', upload.fields([{ name: 'pimg' }, { name: 'pimg2' }]), productController.addProduct);

// Add scrap API
app.post('/scrapper', upload.fields([{ name: 'pimg' }, { name: 'pimg2' }]), productController.scrapProduct);

// Add Product API
app.post('/edit-product', upload.fields([{ name: 'pimg' }, { name: 'pimg2' }]), productController.editProduct);

// Get All Products API
app.get('/get-products', productController.getProducts);

// Delete Product API
app.post('/delete-product', productController.deleteProducts);


// Get Product by ID
app.get('/get-product/:pId', productController.getProductsById);

// Get Liked Products API
app.post('/liked-products', userController.likedProducts);

//my ads
app.post('/my-products', productController.myProducts);

// Signup API
app.post('/signup', userController.signup);

//getprofile by id api
app.get('/my-profile/:userId', userController.myProfileById)


//get user api
app.get('/get-user/:uId', userController.getUserById)

// Login API
app.post('/login', userController.login);

//msg socket
let messages = [];

io.on('connection', (socket) => {
  console.log('Socket Connected ',socket.id)

  socket.on('sendMsg' , (data) => {
    messages.push(data);
    io.emit('getMsg',messages)  
  })
  io.emit('getMsg',messages)

})

// Start Server
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});























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