const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const port = 4000
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://omssn21:om212006@cluster0.vr8ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const Users = mongoose.model('Users', { username: String, password: String });  // we are creating a model

// app.get('/ap', (req, res) => {
app.get('/', (req, res) => {
  res.send('Hello Coder.....🌐 ')
})

// we get data frm frontend so we give name as signup

app.post ('/signup', (req, res) => {
  console.log(req.body);
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
  console.log(req.body);
  const username  = req.body.username;
  const password = req.body.password; 

  Users.findOne({username: username})  

  .then((result) => {
    console.log(result  ,"userData");
    if(!result){
      res.send({message : 'User not found'}) //user dta not found
    }
    else{
      if(result.password === password){ 
        const token = jwt.sign({
          data:  result 
        }, 'MYKEY', { expiresIn: '1h'});
        res.send({message : 'User found',token:token}) //user data found
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

