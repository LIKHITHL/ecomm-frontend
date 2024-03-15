import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminManue from "../../components/layout/AdminManue";
import { useAuth } from "../../context/auth.js";
import moment from "moment";
import axios from "axios";
import { Select } from "antd";
import {API_URL} from "../../config";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/v1/auth/orders-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Layout title={"All Orders -- Admin"}>
      <div className="container p-3">
        <div className="row">
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <hr />
            {orders?.map((o, i) => {
              return (
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Payment</th>
                        <th scope="col" className="notExisting">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{o?.payment.success ? "Success" : "Not Complete"}</td>
                        <td className="notExisting">{o?.products?.length}</td>

                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3  flex-row">
                        <div className="col-md-3">
                          <img
                            src={`${API_URL}/api/v1/products/products-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"150px"}
                          />
                        </div>
                        <div className="col-md-9">
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
            <AdminManue />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
