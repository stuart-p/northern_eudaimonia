import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import JumboSection from "../components/Globals/JumboHeader.js";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <JumboSection
      img={data.jumboImg.childImageSharp.fluid}
      title="Northern Eudaimonia"
      styleClass="default-background"
    />
  </Layout>
);

export const query = graphql`
  {
    jumboImg: file(relativePath: { eq: "heroOreo.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

export default IndexPage;
