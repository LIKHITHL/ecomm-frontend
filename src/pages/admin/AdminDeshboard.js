import React from "react";
import Layout from "../../components/layout/Layout";
import AdminManue from "../../components/layout/AdminManue";
import { useAuth } from "../../context/auth";

const AdminDeshboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard -- Admin"}>
      <div className="container p-3">
        <div className="row">
          <div className="col-md-9 p-3 text-center">
            <h1>Admin Details</h1>
            <hr />
            <div className="">
              <h3>Name : {auth?.user?.name}</h3>
              <h3>Email : {auth?.user?.email}</h3>
              <h3>Phone No. : {auth?.user?.phone}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <AdminManue />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDeshboard;
