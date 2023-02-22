import { useFormik } from "formik";
import { TextInput } from "../../components/form/InputFields";
import { capitalize, emailValidation } from "../../../helpers/functions";
import Formheader from "../../components/form/Formheader";
import SubmitBtn from "../../components/form/SubmitBtn";
import FormLink from "../../components/form/FormLink";
import { signin } from "../../../helpers/fetches";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Errors {
  firstname?: "Required" | "Must be atleast 3 characters";
  lastname?: "Required" | "Must be atleast 3 characters";
  username?: "Required" | "Must be atleast 3 characters";
  password?: "Required" | "Must be atleast 6 characters";
  email?: "Required" | "Invalid email";
}

const Signing = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
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

      if (!values.firstname) {
        errors.firstname = "Required";
      } else if (values.firstname.length < 3) {
        errors.firstname = "Must be atleast 3 characters";
      }

      if (!values.lastname) {
        errors.lastname = "Required";
      } else if (values.lastname.length < 3) {
        errors.lastname = "Must be atleast 3 characters";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (!emailValidation(values.email)) {
        errors.email = "Invalid email";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const result = await signin(values);

      console.log(values);

      const data = result.data;

      console.log(data);

      if (data.signin) {
        navigate("/");
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
        <Formheader header="Sign In" />
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
          <FormLink text="Already have an acoount? login here" to="/login" />
          <SubmitBtn text="SIGN IN" />
        </form>
      </div>
    </div>
  );
};

export default Signing;
