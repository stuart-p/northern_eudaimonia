import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import JumboSection from "../components/Globals/JumboHeader.js";
import Introduction from "../components/Introduction";

const AboutPage = ({ data, location }) => (
  <Layout location={location}>
    <SEO title="About" />
    <JumboSection
      img={data.jumboImg.childImageSharp.fluid}
      styleClass="about-background"
    >
      <h1>About Us</h1>
    </JumboSection>
    <Introduction />
  </Layout>
);

export const query = graphql`
  {
    jumboImg: file(relativePath: { eq: "about-background.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

export default AboutPage;
