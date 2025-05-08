import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState([]);

  const fetchData = async () => {
    try {
      let res = await axios.get("http://localhost:3001/register");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        if (!isEdit) {
          await axios.post("http://localhost:3001/register", values);
          fetchData();
        } else {
          delete values._id;
          await axios.put(`http://localhost:3001/student/${editUser._id}`, values);
          setIsEdit(false);
          fetchData();
        }
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleEdit = async (id) => {
    try {
      let student = await axios.get(`http://localhost:3001/student/${id}`);
      formik.setValues(student.data);
      setEditUser(student.data);
      setIsEdit(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/student/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">{isEdit ? "Edit User" : "Register"}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  {isEdit ? "Update" : "Submit"}
                </button>
                <Link to="/login" className="btn btn-outline-secondary">Go to Login</Link>
              </div>
            </form>
          </div>
        </div>

        {/* User Table Section */}
        <div className="col-md-6">
          <div className="table-responsive">
            <h4 className="mb-3">Registered Users</h4>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <p className="text-muted">No users found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
