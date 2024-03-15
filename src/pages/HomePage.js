import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import Banner from "../images/Banner.png"
import {  Radio } from "antd";
import { price } from "../components/Price";
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart.js";
import "../components/styles/Homepage.css";
import {API_URL} from "../config";


const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categoris, setCategoris] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/category/get-categoris`);
      if (data?.success) {
        setCategoris(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get all products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/v1/products/products-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/products/products-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);
  // loadmore

  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/v1/products/products-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  // get filter products

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/v1/products/products-filter`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
      {/* banner image */}

      <div>
        <img
          src={Banner}
          alt="banner"
          className="banner-img"
          style={{ width: "100%", top: "0%" }}
        />
      </div>

      {/* banner image */}
      <div className="container row mt-3 home-page m-auto">
        <h1 className="text-center">----------All Products ----------</h1>
        {/* <hr /> */}
        <div className="col-md-10">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 m-auto mt-3" key={p._id}>
                <img
                  src={`${API_URL}/api/v1/products/products-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
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
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        <div className="col-md-2 filters">
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
