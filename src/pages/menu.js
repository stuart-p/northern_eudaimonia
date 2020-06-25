import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { SegmentedControl } from "segmented-control";

import Layout from "../components/layout";
import SEO from "../components/seo";
import JumboSection from "../components/Globals/JumboHeader.js";
import Introduction from "../components/Introduction";

const MenuPage = ({ data, location }) => {
  const [menuCategories, setMenuCategories] = useState(data.categories.edges);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuSubCategores, setMenuSubCategores] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setSelectedCategory(menuCategories[0].node.id || "");
  }, [menuCategories]);

  useEffect(() => {
    setMenuSubCategores(
      data.subCategories.edges.filter(subCategories => {
        return subCategories.node.parentCategory.id === selectedCategory;
      })
    );
    setMenuItems(
      data.menuItems.edges.filter(menuItems => {
        return menuItems.node.itemCategory.id === selectedCategory;
      })
    );
  }, [selectedCategory]);

  return (
    <Layout location={location}>
      <SEO title="Menu" />
      <JumboSection
        img={data.jumboImg.childImageSharp.fluid}
        styleClass="default-background"
      >
        <h1>Menu</h1>
      </JumboSection>
      <SegmentedControl
        name="categorySelect"
        options={menuCategories.map((category, currentIndex) => {
          return {
            label: category.node.title,
            value: category.node.id,
            default: currentIndex === 0 ? true : false,
          };
        })}
        setValue={selectedValue => setSelectedCategory(selectedValue)}
      />
      <ul>
        {menuItems.map(item => {
          return (
            <li key={item.node.id}>
              <p>{item.node.title}</p>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  {
    jumboImg: file(relativePath: { eq: "about-background.jpeg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    categories: allContentfulMenuCategories {
      edges {
        node {
          id
          title
          description {
            description
          }
        }
      }
    }
    subCategories: allContentfulMenuSubCategory {
      edges {
        node {
          id
          title
          description {
            description
          }
          parentCategory {
            id
            title
          }
        }
      }
    }
    menuItems: allContentfulMenuItems(sort: { order: ASC, fields: price }) {
      edges {
        node {
          id
          title
          price
          description {
            description
          }
          itemCategory {
            id
            title
          }
          itemSubCategory {
            title
          }
        }
      }
    }
  }
`;

export default MenuPage;
