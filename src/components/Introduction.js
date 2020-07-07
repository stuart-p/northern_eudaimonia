import React from "react";
import { Link } from "gatsby";

const Introduction = ({ children }) => {
  return (
    <section className="d-flex flex-column justify-content-center flex-shrink-0 w-75 mx-auto my-5">
      {children}
    </section>
  );
};

export default Introduction;
