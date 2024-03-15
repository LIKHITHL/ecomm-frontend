import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.js";
import UserManue from "../../components/layout/UserManue";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
import moment from "moment";
import {API_URL} from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <>
      <Layout title={"Your Orders"}>
        <div className="container p-3">
          <div className="row">
            <div className="col-md-9">
              <h3 className="text-center">My Orders</h3>
              {orders?.map((o, i) => {
                return (
                  <div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>
                            {o?.payment.success ? "Success" : "Not Complete"}
                          </td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3  flex-row">
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
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-3">
              <UserManue />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Orders;
