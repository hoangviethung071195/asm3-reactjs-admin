import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { deleteProduct, getAdminProducts } from "../../service/products.service";

function Products(props) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const keywordEl = useRef();

  function loadData(keyword) {
    getAdminProducts({ keyword }).then((r) => {
      console.log("r ", r);
      const { products } = r;
      console.log("setProducts ", products);
      setProducts(products);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  function deteleHandler(id) {
    deleteProduct(id).then(() => {
      toast.success("Deleted product successfully!");
      loadData();
    });
  }

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="/" className="text-muted">
                      Home
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Products
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <input
                  ref={keywordEl}
                  className="form-control w-25"
                  onKeyDown={(e) => {
                    console.log("e ", e);
                    if (e.key == "Enter") {
                      loadData(e.target.value);
                    }
                  }}
                  type="text"
                  placeholder="Enter Search!"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((value) => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.title}</td>
                            <td>
                              {new Intl.NumberFormat("vi-VI", {
                                style: "currency",
                                currency: "VND",
                              }).format(value.price)}
                            </td>
                            <td>
                              <img
                                src={
                                  value.imageUrl1.includes("://")
                                    ? value.imageUrl1
                                    : value.imageUrl1
                                }
                                style={{
                                  height: "60px",
                                  width: "60px",
                                }}
                                alt={value.imageUrl1}
                              />
                            </td>
                            <td>{value.category}</td>
                            <td>
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                                onClick={() => navigate("/edit/" + value._id)}
                              >
                                Update
                              </a>
                              &nbsp;
                              <a
                                onClick={() => deteleHandler(value._id)}
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Products;
