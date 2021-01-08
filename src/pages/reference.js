import React, { useState, useMemo } from 'react';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import CategoryNav from '../components/CategoryNav';
import ReferenceList from '../components/ReferenceList';
import Searchbar from '../components/Searchbar';
import Donate from '../components/character/Donate';

import { filterItems, organizeReferenceItems } from '../utils/data';

import grid from '../styles/grid.module.css';

const Reference = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const intl = useIntl();

  const items = data.allFile.nodes;

  const tree = useMemo(
    () => organizeReferenceItems(filterItems(items, searchTerm)),
    [items, searchTerm]
  );

  const categories = tree.map((item) => item.name);

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col8}>
          {intl.formatMessage({ id: 'references' })}
        </h1>
        <Donate />
        <Searchbar
          placeholder={intl.formatMessage({ id: 'referencesSearch' })}
          onChange={(e) => setSearchTerm(e.target.value)}
          searchTerm={searchTerm}
          className={grid.push1}
          large
        />
        <CategoryNav categories={categories} />
        <ReferenceList data={tree} />
      </div>
    </Layout>
  );
};

export default Reference;

export const query = graphql`
  query {
    allFile(
      filter: {
        fields: { lang: { eq: "en" }, lib: { eq: "processing" } }
        childJson: { type: { nin: ["method", "field"] } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          brief
          category
          subcategory
          syntax
          parameters {
            name
            description
          }
          related
          returns
        }
      }
    }
  }
`;