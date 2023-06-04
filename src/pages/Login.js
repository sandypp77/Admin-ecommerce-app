import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import lgLogo from "../images/Screenshot_7.png";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully, Welcome");
      navigate("admin");
    } else {
      navigate("");
    }
    if (isError) {
      toast.error(
        "You are not an Admin or User is not exist or Password is false"
      );
    }
  }, [user, isError, isSuccess, isLoading]);
  return (
    <div style={{ background: "#f0f4fc" }}>
      <ToastContainer />
      <div className="main-login position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-4">
              <div className="card mb-0 p-3">
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <img src={lgLogo} width="100" />
                  </div>
                  <h3 className="text-center title">Login</h3>
                  <p className="text-center mb-4">
                    Login to your admin account to continue.
                  </p>
                  <div className="error text-center">
                    {message.message == "Rejected"
                      ? "You are not an Admin or User is not exist or Password is false"
                      : ""}
                  </div>
                  <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                      type="text"
                      label="Email Address"
                      id="email"
                      name="email"
                      onChng={formik.handleChange("email")}
                      onBlr={formik.handleBlur("email")}
                      val={formik.values.email}
                    />
                    <div className="error mt-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <CustomInput
                      type="password"
                      label="Password"
                      id="pass"
                      name="password"
                      onChng={formik.handleChange("password")}
                      onBlr={formik.handleBlur("password")}
                      val={formik.values.password}
                    />
                    <div className="error mt-2">
                      {formik.touched.password && formik.errors.password}
                    </div>
                    <div className="mb-3 text-end">
                      <Link to="forgot-password" className="">
                        Forgot Password?
                      </Link>
                    </div>
                    <button
                      className="btn btn-primary w-100 py-8 fs-5 mb-4 rounded-2"
                      type="submit"
                    >
                      Login
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/register`}
                        className="text-primary fw-bold ms-2"
                      >
                        Create an account
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
