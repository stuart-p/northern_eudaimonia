import React from "react";
import BackgroundImage from "gatsby-background-image";

const JumboHeader = ({ img, styleClass, title, children }) => {
  return (
    <BackgroundImage className={styleClass} fluid={img}>
      <h1 className="title text-uppercase text-center display-4 font-weight-bold">
        {title}
      </h1>
      {children}
    </BackgroundImage>
  );
};

JumboHeader.defaultProps = {
  title: "",
  styleClass: "default-background",
};

export default JumboHeader;
