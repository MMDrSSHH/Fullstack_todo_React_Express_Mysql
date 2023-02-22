import React from "react";

interface Props {
  text: string;
}

const SubmitBtn = ({ text }: Props) => {
  return (
    <div className="text-center mt-8">
      <button
        className="bg-orange-400 rounded-md py-2 w-2/4 text-2xl text-slate-900 transition-all ease-in-out hover:w-2/3"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitBtn;
