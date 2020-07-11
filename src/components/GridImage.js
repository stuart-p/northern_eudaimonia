import React from "react";
import Img from "gatsby-image";

const GridImage = ({ imagePath }) => {
  return (
    <div style={{ padding: 0, margin: 0 }}>
      <Img
        fluid={imagePath}
        style={{ width: "100%", height: "auto", padding: 0, margin: 0 }}
      />
    </div>
  );
};

export default GridImage;
