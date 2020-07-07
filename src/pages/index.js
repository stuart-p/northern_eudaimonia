import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import JumboSection from "../components/Globals/JumboHeader.js";
import Introduction from "../components/Introduction";

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <SEO title="Home" />
    <JumboSection
      img={data.jumboImg.childImageSharp.fluid}
      styleClass="default-background"
    >
      <h1>Northern</h1>
      <h1 className="font-styled">Eudaimonia</h1>
    </JumboSection>
    <Introduction>
      <aside
        dangerouslySetInnerHTML={{
          __html:
            data.textBlock.edges[0].node.textData.childMarkdownRemark.html,
        }}
      ></aside>
      <Link to="/menu">
        <p className="font-intense lead font-styled">
          {data.textBlock.edges[0].node.menuLinkText}
        </p>
      </Link>
    </Introduction>
  </Layout>
);

export const query = graphql`
  {
    jumboImg: file(relativePath: { eq: "heroOreo.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    textBlock: allContentfulHomePageText(limit: 1) {
      edges {
        node {
          menuLinkText
          textData {
            textData
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
