import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import '../styles/forms.css'
import axiosInstance from "../utils/axiosInstance";
import { generateToast, TOAST_ERROR, TOAST_SUCCESS } from "../utils/generateToast";
// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center align-items-center card-container"
      
    >
      <div className="card main-card shadow-lg" >
        <div className="card-body p-4">
          <h2 className="text-center mb-4 card-title" >
            <i className="bi bi-person-circle"></i> Sign up
          </h2>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={ async (values, { resetForm }) => {
              try {
                const response  = await axiosInstance.post("api/users/register",values);
                const data = response.data;
                generateToast(data.message, TOAST_SUCCESS);
                navigate('/login');
              } catch (error) {
                generateToast(error.message, TOAST_ERROR);
              }
             

              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    <i className="bi bi-person"></i> Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger small"
                  />
                </div>

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
                  {isSubmitting ? "Creating account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <div className="text-center mt-3">
            <p className="mb-0">
              Already have an account?{" "}
              <Link to="/login" className="card-link">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
