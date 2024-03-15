import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminManue from "../../components/layout/AdminManue";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {API_URL} from "../../config";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //const [visible, setVisible] = useState(null);

  // handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/v1/category/create-category`, {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is Created successfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // all cat.

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/category/get-categoris`);

      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update category

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Updated successfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
        setSelected(null);
        setUpdatedName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // for delete

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/v1/category/delete-category/${id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${name} is Deleted successfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title="Create Category -- Admin">
        <div className="container p-3">
          <div className="row">
            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="p-3">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-success ms-2"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => {
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              <BiEdit />
                            </button>
                            {/* Modal */}
                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    >
                                      Enter Your Category Name
                                    </h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body">
                                    <CategoryForm
                                      value={updatedName}
                                      setValue={setUpdatedName}
                                      handleSubmit={handleUpdate}
                                      setVisible
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              <AiFillDelete />
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default CreateCategory;
