import { useEffect, useState } from 'react';
import Header from './Header';
import Categories from './Categories';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Home() {

  const navigate = useNavigate()

  //creating stae for products
  const [products, setproducts] = useState([]);
  const [search, setsearch] = useState("");

  // for not acces home page without login thi useeffrct is used..
  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     navigate('/login')
  //   }
  // }, [])
  useEffect(() => {
    const url = "http://localhost:4000/get-products";
    axios
       .get(url)
       .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("server error")
      });
  }, []);

  const handlesearch = (value) => {
    setsearch(value);
  }
  const handleClick = () => {
    let filteredProducts = products.filter((item) => {
      console.log(item)
      if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    })
    setproducts(filteredProducts)
  }
  
  const handleCategory = (value) => {
    console.log(value, "v")
    let filteredProducts = products.filter((item) => {
      if (item.category.toLowerCase() == (search.toLowerCase())) {
        return item;
      }
    })
    setproducts(filteredProducts)
  } 


  return (
    <div>
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />
      {localStorage.getItem('token') && <Link to="/add-product"> ADD PRODUCT </Link>}

      <div className='d-flex justify-content-center flex-wrap'>
        {products && products.length > 0 &&
          products.map((item, index) => {
            return (
              <div key={item._id} className="card m-3" >
                <img width="500px" height="200px" src={'http://localhost:4000/' + item.pimg} />
                <p className='m-2 '>{item.pname} | {item.category} </p>
                <p className="m-2 text-danger">{item.price}</p>
                <p className="m-2 text-success">{item.pdesc}</p>
              </div>
            )
          })}
      </div>
    </div>
  );
}
export default Home;    
