import React from "react";
import { Link, graphql } from "gatsby";
import StackGrid from "react-stack-grid";
import Layout from "../components/layout";
import SEO from "../components/seo";
import JumboSection from "../components/Globals/JumboHeader.js";
import Introduction from "../components/Introduction";
import GridImage from "../components/GridImage";

const IndexPage = ({ data, location }) => {
  return (
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
      <StackGrid
        columnWidth={350}
        monitorImagesLoaded={true}
        gutterHeight={10}
        gutterWidth={10}
      >
        {data.imgMosaic.edges[0].node.imageData.map(mosaicImage => {
          return (
            <GridImage
              imagePath={mosaicImage.fluid}
              key={mosaicImage.contentful_id}
            />
          );
        })}
      </StackGrid>
    </Layout>
  );
};

export const query = graphql`
  {
    jumboImg: file(relativePath: { eq: "heroOreo.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
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
    imgMosaic: allContentfulHomepageImageMosaic {
      edges {
        node {
          imageData {
            fluid(maxWidth: 350, quality: 100) {
              ...GatsbyContentfulFluid_tracedSVG
            }
            contentful_id
          }
        }
      }
    }
  }
`;

export default IndexPage;
