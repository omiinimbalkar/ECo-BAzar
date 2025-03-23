
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./components/Home";  // Import the Home component
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/Myprofile';
import EditProduct from './components/EditProduct';
import About from './components/About';
import Scrapd from './components/Scrapd';
import Contact from './components/Contact';
import Terms from './components/Terms';
import PrivacyPolicy from './components/Privacy';
import Feedback from 'react-bootstrap/esm/Feedback';
import ChatBot from './components/ChatBot';

const router = createBrowserRouter([

  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage />),
  },
  {
    path: "/about",
    element: (<About />),
  },
  {
    path: "/contact",
    element: (<Contact />),
  },
  {
    path: "/terms",
    element: (<Terms />),
  },
  {
    path: "/privacy",
    element: (<PrivacyPolicy />),
  },
  {
    path: "/feedback",
    element: (<Feedback/>),
  },
  {
    path: "/chatbot",
    element: (<ChatBot/>),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/scrapper",
    element: (<Scrapd />),
  },
  {
    path: "/edit-product/:productId",
    element: (<EditProduct />),
  },
  {

    path: "/liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile />),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
reportWebVitals();

