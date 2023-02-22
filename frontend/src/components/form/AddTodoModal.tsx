import Modal from "@mui/material/Modal";
import type { ModalProps } from "@mui/material/Modal";
import { useTodoPost } from "../../hooks/queryHooks";
import { useFormik } from "formik";
import Formheader from "./Formheader";
import { TextArea } from "./InputFields";
import SubmitBtn from "./SubmitBtn";

interface Errors {
  todo?: "Required";
}

interface ExtendedModalProps extends ModalProps {
  handleClose?: any;
}

function AddTodoModal(modalProps: ExtendedModalProps) {
  const { mutate } = useTodoPost();
  const formik = useFormik({
    initialValues: { todo: "" },
    validate: (values) => {
      const errors: Errors = {};

      if (!values.todo) {
        errors.todo = "Required";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      mutate({ todo: { todo: values.todo } });
      resetForm();
    },
  });
  return (
    <Modal
      {...modalProps}
      onClose={() => {
        formik.setErrors({});
        modalProps.handleClose();
      }}
    >
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
          formik.setErrors({});
          modalProps.handleClose();
        }}
        className="rounded-md flex flex-col w-3/4 xl:w-1/3 bg-gray-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-7 px-6"
      >
        <Formheader header="Add Todo" />
        <TextArea
          label="Todo"
          name="todo"
          onChange={formik.handleChange}
          value={formik.values.todo}
          onBlur={formik.handleBlur}
          error={formik.errors.todo}
          touched={formik.touched.todo}
          placeholder="Enter todo's text"
        />
        <SubmitBtn text="Add" />
      </form>
    </Modal>
  );
}

export default AddTodoModal;
