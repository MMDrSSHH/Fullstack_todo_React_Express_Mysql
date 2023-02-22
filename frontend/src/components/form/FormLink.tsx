import React from "react";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  to: string;
}

const FormLink = ({ text, to }: Props) => {
  return (
    <div className="mt-4 hover:underline text-slate-900">
      <Link to={to}>{text}</Link>
    </div>
  );
};

export default FormLink;
