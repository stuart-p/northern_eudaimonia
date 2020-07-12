import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import JumboSection from "../components/Globals/JumboHeader.js";
import Introduction from "../components/Introduction";
import StackGrid from "react-stack-grid/lib/components/StackGrid";
import GridImage from "../components/GridImage";
import MapContainer from "../components/MapContainer";

const AboutPage = ({ data, location }) => (
  <Layout location={location}>
    <SEO title="About" />
    <JumboSection
      img={data.jumboImg.childImageSharp.fluid}
      styleClass="about-background"
    >
      <h1>About Us</h1>
    </JumboSection>
    <Introduction>
      <Img
        fluid={data.aboutData.edges[0].node.mainImage.fluid}
        style={{ width: "300px", height: "auto", padding: 0, margin: "0 auto" }}
      />
      <section
        className="m-auto py-2"
        dangerouslySetInnerHTML={{
          __html:
            data.aboutData.edges[0].node.primaryText.childMarkdownRemark.html,
        }}
      />
      <StackGrid
        columnWidth={300}
        monitorImagesLoaded={true}
        gutterHeight={10}
        gutterWidth={10}
      >
        {data.aboutData.edges[0].node.imageMosaic.map(image => {
          return (
            <GridImage imagePath={image.fluid} key={image.contentful_id} />
          );
        })}
      </StackGrid>
      <section
        className="m-auto py-2"
        dangerouslySetInnerHTML={{
          __html:
            data.aboutData.edges[0].node.secondaryText.childMarkdownRemark.html,
        }}
      />
      <section
        className="w-100"
        style={{ position: "relative", height: "400px" }}
      >
        <MapContainer />
      </section>
    </Introduction>
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
    aboutData: allContentfulAboutPageData(limit: 1) {
      edges {
        node {
          mainImage {
            fluid(maxWidth: 300, quality: 100) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          primaryText {
            childMarkdownRemark {
              html
            }
          }
          secondaryText {
            childMarkdownRemark {
              html
            }
          }
          imageMosaic {
            fluid(maxWidth: 300, quality: 80) {
              ...GatsbyContentfulFluid_tracedSVG
            }
            contentful_id
          }
        }
      }
    }
  }
`;

export default AboutPage;
