
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

const router = createBrowserRouter([

  {
    path: "/home",
    element: (<Home />),
  },
  {
    path: "/about",
    element: <div>About</div>,
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
    element: (<AddProduct/>),  
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
reportWebVitals();

