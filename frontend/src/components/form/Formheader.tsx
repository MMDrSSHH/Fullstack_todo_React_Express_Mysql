import React from "react";

interface Props {
  header: string;
}

const Formheader = ({ header }: Props) => {
  return <h2 className="text-center text-4xl mb-10">{header}</h2>;
};

export default Formheader;
