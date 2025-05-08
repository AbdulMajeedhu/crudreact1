import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:3001/login", values);
        //alert(res.data.message);
        if (res.data.redirectTo) {
            console.log(res.data.user._id);
            localStorage.setItem("students_userId", res.data.user._id);
          //navigate(res.data.redirectTo);
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
          if (error.response.data.redirectTo) {
            navigate(error.response.data.redirectTo);
          }
        } else {
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      }
    }
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 shadow rounded bg-white" style={{ minWidth: "300px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger small">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger small">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
