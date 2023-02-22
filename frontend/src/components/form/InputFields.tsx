import { ChangeEventHandler, FocusEventHandler } from "react";
import ErrorMsg from "./ErrorMsg";

interface InputProps {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: string;
  placeholder?: string;
  type?: "text" | "password";
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  touched?: boolean;
}

interface TextAreaProps {
  label: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  name: string;
  value: string;
  placeholder?: string;
  type?: "text" | "password";
  onBlur?: ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  touched?: boolean;
}

const TextInput = ({
  label,
  onChange,
  name,
  value,
  placeholder,
  type,
  onBlur,
  error,
  touched,
}: InputProps) => {
  return (
    <>
      <div className="flex flex-col gap-y-1">
        <label
          htmlFor={name}
          className={`ml-1 text-md text-gray-500  ${
            touched && error && "text-red-700"
          }`}
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type || "text"}
          onChange={onChange}
          value={value}
          className={`px-2 py-1 text-xl outline-none border-black border-[1px] rounded-md font-normal ${
            touched && error && "border-red-700 text-red-500"
          }`}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        {touched && error && <ErrorMsg message={error} />}
      </div>
    </>
  );
};

const TextArea = ({
  label,
  onChange,
  name,
  value,
  placeholder,
  type,
  onBlur,
  error,
  touched,
}: TextAreaProps) => {
  return (
    <>
      <div className="flex flex-col gap-y-1">
        <label
          htmlFor={name}
          className={`ml-1 text-md text-gray-500  ${
            touched && error && "text-red-700"
          }`}
        >
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          className={`px-2 py-1 text-xl outline-none border-black border-[1px] rounded-md font-normal resize-none ${
            touched && error && "border-red-700 text-red-500"
          }`}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        {touched && error && <ErrorMsg message={error} />}
      </div>
    </>
  );
};

export { TextInput, TextArea };
