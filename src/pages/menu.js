import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { SegmentedControl } from "segmented-control";

import Layout from "../components/layout";
import SEO from "../components/seo";
import JumboSection from "../components/Globals/JumboHeader.js";
import Introduction from "../components/Introduction";
import { moneyFormat } from "../utils/utils";

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
        <h1 className="font-styled font-Yellow">Menu</h1>
      </JumboSection>
      <SegmentedControl
        name="categorySelect"
        options={menuCategories.map((category, currentIndex) => {
          return {
            label: category.node.title,
            value: category.node.id,
            default: currentIndex === 0 ? true : false,
            key: category.node.id,
          };
        })}
        setValue={selectedValue => setSelectedCategory(selectedValue)}
        style={{
          color: "#3a5fb8",
          fontFamily: "lato",
          fontWeight: 900,
          fontSize: "1rem",
          width: "auto",
        }}
        className="mx-2"
      />
      {menuCategories.map(categories => {
        if (categories.node.id === selectedCategory) {
          return (
            categories.node.description && (
              <h5
                key={categories.node.title}
                className="d-flex w-75 mx-auto font-styled"
              >
                {categories.node.description.description}
              </h5>
            )
          );
        }
      })}
      {menuSubCategores.map(subCat => {
        return (
          <>
            <ul key={subCat.node.id} className="list-unstyled">
              <h2 className="d-flex w-75 mx-auto font-styled">
                <u>{subCat.node.title}</u>
              </h2>
              {subCat.node.description && (
                <>
                  <aside
                    className="d-flex flex-column w-75 mx-auto h5"
                    dangerouslySetInnerHTML={{
                      __html: subCat.node.description.childMarkdownRemark.html,
                    }}
                  />
                </>
              )}
              {menuItems.map(item => {
                if (item.node.itemSubCategory) {
                  if (item.node.itemSubCategory.id === subCat.node.id) {
                    return (
                      <li
                        key={item.node.id}
                        className="d-flex flex-column w-50 mx-auto"
                      >
                        <section className="d-flex justify-content-between">
                          <h4>{item.node.title}</h4>
                          <h5>{moneyFormat(item.node.price)}</h5>
                        </section>
                        {item.node.description && (
                          <p>{item.node.description.description}</p>
                        )}
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </>
        );
      })}
      <ul className="list-unstyled">
        {menuItems.map(item => {
          if (!item.node.itemSubCategory) {
            return (
              <li
                key={item.node.id}
                className="d-flex flex-column w-50 mx-auto"
              >
                <section className="d-flex justify-content-between">
                  <h4>{item.node.title}</h4>
                  <h5>{moneyFormat(item.node.price)}</h5>
                </section>
                {item.node.description && (
                  <p>{item.node.description.description}</p>
                )}
              </li>
            );
          }
        })}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  {
    jumboImg: file(relativePath: { eq: "coffeePink.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    categories: allContentfulMenuCategories(
      sort: { order: DESC, fields: displayOrder }
    ) {
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
            childMarkdownRemark {
              html
            }
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
            id
            title
          }
        }
      }
    }
  }
`;

export default MenuPage;
