import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../components/styles/ProductDetailsStyles.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/Cart";
import toast from "react-hot-toast";
import { BiRightArrowCircle } from "react-icons/bi";
import {API_URL} from "../../config";



const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState({});
  const [reletedProducts, setReletedProducts] = useState([]);
  const navigate = useNavigate();
  // initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get product details

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/products/single-product/${params.slug}`
      );
      setProducts(data?.products);
      getSimilarProducts(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios(
        `${API_URL}/api/v1/products/releted-products/${pid}/${cid}`
      );
      setReletedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="det">Product Details</h1>
      <hr />
      <div className="container product-details">

        <div className="pic m-3 mb-5">
          <img
            src={`${API_URL}/api/v1/products/products-photo/${products._id}`}
            className="card-img-top"
            alt={products.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="product-details-info">

          <h6>Name : {products.name}</h6>
          <h6>Description : {products.description}</h6>
          <h6>
            Price :
            {products?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6>Category : {products?.category?.name}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, products]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, products])
              );
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products <BiRightArrowCircle /></h4>
        {reletedProducts.length < 1 && (
          <p className="text-center fw-bold fs-2">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {reletedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${API_URL}/api/v1/products/products-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
