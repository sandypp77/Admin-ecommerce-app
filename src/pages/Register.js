import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import lgLogo from "../images/Screenshot_7.png";
import { registerUser, resetState } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";

let schema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Email Should be valid")
    .required("Email is Required"),
  mobile: yup.string().required(" Mobile No is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      role: "admin",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(registerUser(values));
      // navigate("/")
    },
  });

  const registerState = useSelector((state) => state.auth);

  const { user, isError, isSuccess, isLoading, message } = registerState;

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Created Succesfully");
      dispatch(resetState());
    }
    if (isError) {
      toast.error(
        "Email or Mobile Number is Exist, Please choose another email and mobile number"
      );
      dispatch(resetState());
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <div style={{ background: "#f0f4fc" }}>
      <ToastContainer />
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-4">
              <div className="card mb-0 p-3">
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <img src={lgLogo} width="100" />
                  </div>
                  <h3 className="text-center title mb-4">Register</h3>
                  <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <CustomInput
                        type="text"
                        name="firstname"
                        label="First Name"
                        val={formik.values.firstname}
                        onChng={formik.handleChange("firstname")}
                        onBlr={formik.handleBlur("firstname")}
                      />
                      <div className="error mt-2">
                        {formik.touched.firstname && formik.errors.firstname}
                      </div>
                    </div>
                    <div className="mb-3">
                      <CustomInput
                        type="text"
                        name="lastname"
                        label="Last Name"
                        val={formik.values.lastname}
                        onChng={formik.handleChange("lastname")}
                        onBlr={formik.handleBlur("lastname")}
                      />
                      <div className="error mt-2">
                        {formik.touched.lastname && formik.errors.lastname}
                      </div>
                    </div>
                    <div className="mb-3">
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
                    </div>
                    <div className="mb-3">
                      <CustomInput
                        type="tel"
                        name="mobile"
                        label="Mobile Number"
                        val={formik.values.mobile}
                        onChng={formik.handleChange("mobile")}
                        onBlr={formik.handleBlur("mobile")}
                      />
                      <div className="error mt-2">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div className="mb-3">
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
                    </div>
                    <button
                      className="btn btn-primary w-100 py-8 fs-5 mb-4 rounded-2"
                      type="submit"
                    >
                      Sign Up
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-8 mb-0 fw-bold">
                        Already have an Account?
                      </p>
                      <Link to={`/`} className="text-primary fw-bold ms-2">
                        Sign In
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

export default Register;
