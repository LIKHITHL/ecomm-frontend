import React from "react";
import Layout from "../../components/layout/Layout";
import UserManue from "../../components/layout/UserManue";
import { useAuth } from "../../context/auth";
const Deshboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <Layout title={"Dashboard -- User"}>
        <div className="container p-3">
          <div className="row">
            <div className="col-md-9 text-center p-3">
              <h1>User Details</h1>
              <hr />
              <div className="p-3">
                <h3>Name :  {auth?.user?.name}</h3>
                <h3>Email : {auth?.user?.email}</h3>
                <h3>Location : {auth?.user?.address}</h3>
              </div>
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

export default Deshboard;
