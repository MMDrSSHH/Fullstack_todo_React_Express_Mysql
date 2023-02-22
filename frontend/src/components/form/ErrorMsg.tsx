import React from "react";

interface Props {
  message: string;
}

const ErrorMsg = ({ message }: Props) => {
  return (
    <div className="ml-3 text-sm font-thin text-red-400">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMsg;
