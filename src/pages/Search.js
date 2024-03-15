import Layout from "../components/layout/Layout.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/Search";
import { API_URL} from "../config.js";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="containter m-3">
        <div className="text-center">
          <h1 className="mb-5">Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found "
              : `From your search , we found ${values?.results.length} products...!`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
                className="card m-2 m-auto mt-3"
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  src={`${API_URL}/api/v1/products/products-photo/${p._id}`}
                  className="card-img-top"
                  height={"200px"}
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">${p.price}</p>

                  <button  className="btn btn-secondary ms-1" onClick={() => navigate(`/product/${p.slug}`)} >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
