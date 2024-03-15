import React,{useState,useEffect} from "react";
import Layout from "../../components/layout/Layout";
import AdminManue from "../../components/layout/AdminManue";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import {API_URL} from "../../config";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUser, setTotalUser] = useState("");

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/users/alluser`);
      setUsers(data.user);
      setTotalUser(data.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  // for user delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/v1/users/delete/${id}`
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <Layout title="All Users -- Admin">
        <div className="container p-3">
          <div className="row">
            <div className="col-md-9">
              <h1 className="text-center">All User</h1>
              <hr />
              <h3 className="text-center">Users Found:- {totalUser}</h3>
              <hr />
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" className="notExisting">Email</th>
                    <th scope="col">Fav Number</th>
                    <th scope="col" className="notExisting">address</th>
                    <th scope="col">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {users?.map((user, i) => (
                      <tr key={user._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{user.name}</td>
                        <td className="notExisting">{user.email}</td>
                        <td>{user.answer}</td>
                        <td className="notExisting">{user.address}</td>
                        <AiFillDelete 
                          onClick={() => handleDelete(user._id)}
                          className="button"
                        />
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            </div>
            <div className="col-md-3">
              <AdminManue />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Users;
