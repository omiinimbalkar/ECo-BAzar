import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
function Home() {

  const navigate = useNavigate()

  //creating stae for products
  const[products,setproducts] =useState([]);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  })
  useEffect(() => {
    const url = "http://localhost:4000/get-products";
    axios.get(url)
    .then((res)=>{
      console.log(res)
      if(res.data.products)
      {
        setproducts(res.data.products);
      }
    })
    .catch((err)=>{
      console.log(err)
      alert("server error")
    })
  })

  return (
    <div>
      <Header />
      <Link to="/add-product"> ADD PRODUCT </Link>

      <h2> MY PRODUCTS </h2>

      {products && products.length > 0 && 
      products.map((item,index) => (
        <div className="card m-3">
          <img src = { 'http://localhost:4000/' + item.pimg} />
          <p className='p-2'>{ item.pname } | { item.category } </p>
          <p className='p-2' text-text-sucess>{ item.pdesc }</p>
          <p className='p-2' text-text-sucess>{ item.price }</p>
        </div>
      ))}

    </div>
  );
}
export default Home;    