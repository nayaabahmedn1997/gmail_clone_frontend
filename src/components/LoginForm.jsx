import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import '../styles/forms.css'
import axiosInstance from "../utils/axiosInstance";
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from "../utils/generateToast";
// Validation schema using Yup
const loginSchema = Yup.object().shape({

  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center align-items-center card-container"
      
    >
      <div className="card main-card shadow-lg" >
        <div className="card-body p-4">
          <h2 className="text-center mb-4 card-title" >
            <i className="bi bi-person-circle"></i> Login
          </h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async(values, { resetForm }) => {
              try {
                const response  = await axiosInstance.post("api/users/login",values);
                const data = response.data;
                localStorage.setItem('token-url', data.token);
                generateToast(data.message, TOAST_SUCCESS);
                navigate('/inbox');
              } catch (error) {
                generateToast(error.message, TOAST_ERROR);
              }
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    <i className="bi bi-envelope"></i> Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <i className="bi bi-lock"></i> Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter a strong password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold submit-button"
                  disabled={isSubmitting}
                  
                >
                  {isSubmitting ? "Logging in the account..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Register Link */}
          <div className="text-center mt-3">
            <p className="mb-0">
              Don't have an account?{" "}
              <Link to="/register" className="card-link">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
