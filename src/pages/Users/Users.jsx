import cloneDeep from "lodash.clonedeep";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getUsers, updateRoleUser } from "../../service/products.service";

function Users(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  const inputEl = useRef();
  function updateRole(id, role) {
    console.log("inputEl ", inputEl.current.value);
    updateRoleUser({ userId: id, role: +role }).then((r) => {
      if (r) {
        toast.success("Updated user successfully.");
      }
    });
  }

  function changeRole(el, u) {
    console.log("el ", el);
    console.log("u ", u);
    const user = users.find((item) => item._id === u._id);
    user.role = +el.target.value;
    setUsers(cloneDeep(users));
  }

  console.log("users ", users);
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
                    Users
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
                  type="text"
                  placeholder="Enter Search!"
                /> */}
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th
                          style={{
                            width: "200px",
                          }}
                        >
                          Role
                        </th>
                        {/* <th>#</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((u) => (
                          <tr key={u._id}>
                            <td>{u._id}</td>
                            <td>{u.fullName}</td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>
                              <select
                                style={{
                                  maxWidth: "100px",
                                  marginTop: "0",
                                  marginBottom: "0",
                                  display: "inline-block",
                                }}
                                ref={inputEl}
                                type="number"
                                className="form-control"
                                placeholder="Enter quantity"
                                name="quantity"
                                defaultValue={u.role}
                                onChange={(e) => changeRole(e, u)}
                                disabled
                              >
                                <option value="1">Admin</option>
                                <option value="2">Employee</option>
                                <option value="3">Customer</option>
                              </select>
                            </td>
                            {/* <td>
                              <a
                                onClick={() => updateRole(u._id, u.role)}
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-danger"
                              >
                                Update
                              </a>
                            </td> */}
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

export default Users;
