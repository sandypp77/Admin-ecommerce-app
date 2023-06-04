import React from "react";
import CustomInput from "../components/CustomInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetUserPassword } from "../features/auth/authSlice";

const Schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Resetpassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getToken = location.pathname.split("/")[2];
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      dispatch(
        resetUserPassword({
          token: getToken,
          password: values.password,
        })
      );
      navigate("/");
    },
  });
  return (
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-4">
            <div className="card mb-0 p-3">
              <div className="card-body">
                <h3 className="text-center title"> Reset Password</h3>
                <p className="text-center">Please Enter your new password.</p>
                <form action="" onSubmit={formik.handleSubmit}>
                  <CustomInput
                    type="password"
                    name="password"
                    label="Password"
                    val={formik.values.password}
                    onChng={formik.handleChange("password")}
                    onBlr={formik.handleBlur("password")}
                  />
                  <div className="error mt-2">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <CustomInput
                    type="password"
                    name="confpassword"
                    label="Confirm Password"
                    val={formik.values.confirmPassword}
                    onChng={formik.handleChange("confirmPassword")}
                    onBlr={formik.handleBlur("confirmPassword")}
                  />
                  <div className="error mt-2">
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword}
                  </div>
                  <button
                    className="btn btn-primary w-100 py-8 fs-5 mb-4 rounded-2"
                    type="submit"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
