const express = require('express')
const path = require('path');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop(); // Get file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
})

const upload = multer({ storage: storage })

const bodyParser = require('body-parser')

const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const port = 4000
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://omssn21:om212006@cluster0.vr8ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


const Users = mongoose.model('Users', 
  { username: String, 
    password: String,
    likedProducts : [{type : mongoose.Schema.Types.ObjectId,ref:'Products'}]
  });  // we are creating a model
const Products = mongoose.model('Products', { pname: String, pdesc:String, price:String, category:String, pimg:String});  // we are creating a model for product 

// app.get('/ap', (req, res) => {
app.get('/', (req, res) => {
  res.send('Hello Coder.....🌐 ')
})

app.post('/liked-product', (req ,res) =>{
    let productId = req.body.productId;
    let userId = req.body.userId;
    

    //update user model
    Users.updateOne({_id: ( userId )} ,{$addToSet : { likedProducts : productId }})
    .then(() => {
      res.send({message : 'Liked successfully'})
    })
    .catch(() => {
    res.send({message: 'Server Error'});  
    });
})
//we get data frm frotend fro add product
app.post('/add-product',upload.single('pimg'),(req,res)=>{
    const pname  = req.body.pname;
    const pdesc  = req.body.pdesc;
    const price  = req.body.price;
    const category  = req.body.category;
    const pimg  = req.file.path;

    const product = new Products({ pname, pdesc, price, category, pimg});
    product.save()
    .then(() => {
      res.send({message : 'Product is Saved'})
    })
    .catch(() => {
    res.send({message: 'Server Error'});  
    });
})

app.get('/get-products',(req,res)=>{
  Products.find()//findall
  .then((result)=>{
    res.send({message:"succesfully saved.." , products : result})
  })
  .catch((err)=>{
    res.send({message:"server err"})
  })
})
//for product detail
app.get('/get-product',(req,res)=>{
  console.log(req.params)
  
  Products.find()//findall
  .then((result)=>{
    res.send({message:"succesfully saved.." , products : result})
  })
  .catch((err)=>{
    res.send({message:"server err"})
  })
})

//liked product
app.post('/liked-products', (req, res) => {
  Users.findOne({_id: req.body.userId}).populate('likedProducts')
    .then((result) => {
      res.send({ message: "succesfully saved..", products: result.likedProducts})
    })
    .catch((err) => {
      res.send({ message: "server err" })
    })
})

// we get data frm frontend so we give name as signup

app.post ('/signup', (req, res) => {
  const username  = req.body.username;
  const password = req.body.password; 
  const user = new Users({ username: username, password: password });

  user.save()
  .then(() => {
    res.send({message : 'User created'})
  })
  .catch(() => {
  res.send({message: 'Server Error'});  
  });
})  

// we get data frm frontend so we give name as login

app.post ('/login', (req, res) => {
  const username  = req.body.username;
  const password = req.body.password; 

  Users.findOne({username: username})  

  .then((result) => {
    if(!result){
      res.send({message : 'User not found'}) //user dta not found
    }
    else{
      if(result.password === password){ 
        const token = jwt.sign({
          data:  result 
        }, 'MYKEY', { expiresIn: '1h'});
        res.send({message : 'User found',token:token , userId : result._id}) //user data found
      }
      if(result.password !== password){
        res.send({message : 'Password not matched'}) //password not matched
      }
    }
  })

  // if api not runs the it return thissss
  .catch(() => {
  res.send({message: 'Server Error'});  
  });
})  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

