import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/form/InputFields";
import { capitalize } from "../../../helpers/functions";
import Formheader from "../../components/form/Formheader";
import SubmitBtn from "../../components/form/SubmitBtn";
import FormLink from "../../components/form/FormLink";

import { toast } from "react-toastify";
import { login } from "../../../helpers/fetches";

interface Errors {
  username?: "Required" | "Must be atleast 3 characters";
  password?: "Required" | "Must be atleast 6 characters";
}

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors: Errors = {};

      if (!values.username) {
        errors.username = "Required";
      } else if (values.username.length < 3) {
        errors.username = "Must be atleast 3 characters";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 6) {
        errors.password = "Must be atleast 6 characters";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const result = await login(values);

      const data = result.data;
      console.log(data);
      if (data.login) {
        console.log("navigated");
        navigate("/", { replace: true });
      } else {
        toast.error(data.error.message, {
          position: "top-right",
          theme: "colored",
        });
      }
    },
  });
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="p-5 bg-gray-50 rounded-lg w-[400px]">
        <Formheader header="Log In" />
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-y-3">
            {Object.keys(formik.values).map((value) => {
              return (
                <TextInput
                  label={capitalize(value)}
                  name={value}
                  value={formik.values[value as keyof typeof formik.values]}
                  onChange={formik.handleChange}
                  key={value}
                  type={value === "password" ? "password" : "text"}
                  onBlur={formik.handleBlur}
                  error={formik.errors[value as keyof typeof formik.values]}
                  touched={formik.touched[value as keyof typeof formik.values]}
                />
              );
            })}
          </div>
          <FormLink text="Don't have any account? signin here" to="/signin" />
          <SubmitBtn text="LOG IN" />
        </form>
      </div>
    </div>
  );
};

export default Login;
