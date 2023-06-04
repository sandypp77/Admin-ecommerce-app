import React from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordToken } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
});

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(forgotPasswordToken(values));
    },
  });
  return (
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-4">
            <div className="card mb-0 p-3">
              <div className="card-body">
                <h3 className="text-center title">Forgot Password</h3>
                <p className="text-center">
                  Please Enter your register email to get reset password mail.
                </p>
                <form action="" onSubmit={formik.handleSubmit}>
                  <CustomInput
                    type="email"
                    name="email"
                    label="Email"
                    val={formik.values.email}
                    onChng={formik.handleChange("email")}
                    onBlr={formik.handleBlur("email")}
                  />
                  <div className="error mt-2">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <button
                    className="btn btn-primary w-100 py-8 fs-5 mb-4 rounded-2"
                    type="submit"
                  >
                    Send Link
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

export default Forgotpassword;
