import queryString from "query-string";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAdminProducts, updateProduct } from "../../service/products.service";

function Quantity(props) {
  const [products, setProducts] = useState([]);
  const quantityEl = useRef();

  const [pagination, setPagination] = useState({
    page: "1",
    count: "9",
    search: "",
    category: "all",
  });

  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  function loadData() {
    getAdminProducts(1).then((r) => {
      console.log("r ", r);
      const { products, pagination } = r;
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);

      const newQuery = "?" + query;

      setProducts(products);
      setTotalPage(pagination.lastPage);
    });
  }

  useEffect(() => {
    loadData();
  }, [pagination]);
  let quantity = 0;
  function changeQuantity(event) {
    console.log(event.target.value);
    quantity = event.target.value;
  }

  function updateQuantity(id) {
    const product = products.find((p) => p._id === id);
    console.log("quantityEl.current.value ", quantity);
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("productId", product._id);
    formData.append("price", product.price);
    formData.append("quantity", quantity);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("longDescription", product.longDescription);
    updateProduct(formData).then((r) => {
      if (r) {
        toast.success("Updated successfully!");
      }
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
                    Quantity
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
                {/* <input
                  className="form-control w-25"
                  onChange={onChangeText}
                  type="text"
                  placeholder="Enter Search!"
                /> */}
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
                        <th>Quantity</th>
                        <th>#</th>
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
                                alt=""
                              />
                            </td>
                            <td>{value.category}</td>
                            <td>
                              <input
                                style={{
                                  maxWidth: "100px",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  display: "inline-block",
                                }}
                                ref={quantityEl}
                                type="number"
                                className="form-control"
                                placeholder="Enter quantity"
                                name="quantity"
                                defaultValue={value.quantity}
                                onChange={changeQuantity}
                              />
                              {/* <a
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                                onClick={
                                  (window.location.href = "/edit/" + value._id)
                                }
                              >
                                Update
                              </a>
                              &nbsp;
                              <a
                                onClick={deteleHandler(value._id)}
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                              >
                                Delete
                              </a> */}
                            </td>
                            <td>
                              <a
                                onClick={() => updateQuantity(value._id)}
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                              >
                                Update
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

export default Quantity;
