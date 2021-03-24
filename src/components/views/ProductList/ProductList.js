import React from 'react';
// import PropTypes from 'prop-types';
import styles from './ProductList.module.scss';
import Banner from '../../features/Banner/BannerContainer';
import CategoryFilter from '../../features/CategoryFilter/CategoryFilterContainer';

const ProductList = () => (
  <div>
    <Banner />
    <CategoryFilter />
    <div className={styles.root}>This is ProductList</div>
  </div>
);

// ProductList.propTypes = {};

export default ProductList;
