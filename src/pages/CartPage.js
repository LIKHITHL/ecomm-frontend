import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { BiEdit, BiRupee } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {API_URL} from "../config";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // total price

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete cart item

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/products/barintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) { }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${API_URL}/api/v1/products/barintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/deshboard/user/orders");
      toast.success("Payment successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title={"Cart Items"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-3">
            <h1 className="text-center p-2 mb-1 fs-3">
              {`Hey  ${auth?.token && auth?.user.name}`} - {cart?.length
                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : " , please login to checkout !"
                }`
                : " Your Cart Is Empty"}
            </h1>

          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${API_URL}/api/v1/products/products-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"150px"}
                  />
                </div>
                <div className="col-md-8">
                  <h5 className="fw-bolder mb-4">{p.name}</h5>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p className="fw-bold ">{p.description.substring(0, 30)}</p>
                    <p className="fw-bold">Price : <BiRupee /> {p.price}</p>
                  </div>
                  <div className="d-grid g-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p> Checkout & Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            <hr />
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h6>Current Address or  Update Here : <button
                    className="btn"
                    onClick={() => navigate("/deshboard/user/profile")}
                  >
                    <BiEdit />
                  </button></h6>
                  <hr />
                  <h5>{auth?.user?.address}</h5>
                  <hr />
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/deshboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Chekout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
