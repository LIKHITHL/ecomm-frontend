import React from "react";
import Layout from "../../components/layout/Layout";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const category = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "10px" }}>
        <div className="row">
          {category?.map((c) => (
            <div className="d-grid g-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-outline-secondary" type="button">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
