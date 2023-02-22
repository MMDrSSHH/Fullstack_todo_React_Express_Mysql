import Modal from "@mui/material/Modal";
import type { ModalProps } from "@mui/material/Modal";
import { useTodoUpdate } from "../../hooks/queryHooks";
import { useFormik } from "formik";
import Formheader from "./Formheader";
import { TextArea } from "./InputFields";
import SubmitBtn from "./SubmitBtn";
import { useEffect } from "react";

interface Errors {
  todo?: "Required";
}

interface ExtendedModalProps extends ModalProps {
  handleClose?: any;
  todoId: number;
  todoText: string;
}

function EditTodoModal(modalProps: ExtendedModalProps) {
  const { mutate } = useTodoUpdate();
  const formik = useFormik({
    initialValues: { todo: modalProps.todoText },
    validate: (values) => {
      const errors: Errors = {};

      if (!values.todo) {
        errors.todo = "Required";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      mutate({ todo: { todo: values.todo }, todoId: modalProps.todoId });
    },
  });
  useEffect(() => {
    console.log("EditTodo " + modalProps.todoId + " " + modalProps.todoText);
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
        <Formheader header="Edit Todo" />
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
        <SubmitBtn text="Edit" />
      </form>
    </Modal>
  );
}

export default EditTodoModal;
