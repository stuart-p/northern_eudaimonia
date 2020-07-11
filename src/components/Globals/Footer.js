import React from "react";

const Footer = () => {
  return (
    <footer className="footer py-3 d-flex flex-column justify-content-center align-items-center">
      <h4> Northern Eudaimonia &copy;{new Date().getFullYear()} </h4>
      <h6 className="text-muted small">
        Website design by <a href="https://stuart-p.github.io">Stuart Palmer</a>
      </h6>
    </footer>
  );
};

export default Footer;
