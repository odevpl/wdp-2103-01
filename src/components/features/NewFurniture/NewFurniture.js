/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './NewFurniture.module.scss';
import initialState from '../../../redux/initialState';
import ProductBox from '../../features/ProductBox/ProductBoxContainer';
import Swipeable from '../../common/Swipeable/Swipeable';

class NewFurniture extends React.Component {
  state = {
    activePage: 0,
    activeCategory: 'bed',
    isFading: false,
  };

  handlePageChange(newPage) {
    this.setState({ isFading: true });
    setTimeout(() => {
      this.setState({ activePage: newPage });
    }, 500);
    setTimeout(() => {
      this.setState({ isFading: false });
    }, 500);
  }

  handleCategoryChange(newCategory) {
    this.setState({ isFading: true });
    setTimeout(() => {
      this.setState({ activeCategory: newCategory });
    }, 500);
    setTimeout(() => {
      this.setState({ isFading: false });
    }, 500);
  }

  static propTypes = {
    image: PropTypes.node,
    rowSize: PropTypes.number,
  };

  static defaultProps = {
    source: initialState.products.image,
    rowSize: 8,
  };

  render() {
    const { categories, products, deviceType, rowSize } = this.props;
    const { activeCategory, activePage, isFading } = this.state;

    const categoryProducts = products.filter(item => item.category === activeCategory);

    let itemsPerPage;
    if (deviceType === 'mobile') {
      itemsPerPage = 2;
    } else if (deviceType === 'tablet') {
      itemsPerPage = 3;
    } else if (deviceType === 'desktop') {
      itemsPerPage = 8;
    }
    const pagesCount = Math.ceil(categoryProducts.length / itemsPerPage);

    const rightAction = () => {
      const newPage = activePage - 1;
      if (newPage >= 0) {
        this.setState({ activePage: newPage });
      }
    };

    const leftAction = () => {
      const newPage = activePage + 1;
      if (newPage < pagesCount) {
        this.setState({ activePage: newPage });
      }
    };

    const dots = [];
    for (let i = 0; i < pagesCount; i++) {
      dots.push(
        <li key={i}>
          <a
            onClick={() => this.handlePageChange(i)}
            className={i === activePage ? styles.active : ''}
          >
            page {i}
          </a>
        </li>
      );
    }

    return (
      <Swipeable leftAction={leftAction} rightAction={rightAction}>
        <div className={styles.root}>
          <div className='container'>
            <div className={styles.panelBar}>
              <div className='row no-gutters align-items-end'>
                <div className={'col-auto ' + styles.heading}>
                  <h3>New furniture</h3>
                </div>
                <div className={'col ' + styles.menu}>
                  <ul>
                    {categories.map(item => (
                      <li key={item.id}>
                        <a
                          className={item.id === activeCategory ? styles.active : ''}
                          onClick={() => this.handleCategoryChange(item.id)}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={'col-auto ' + styles.dots}>
                  <ul>{dots}</ul>
                </div>
              </div>
            </div>
            <div
              className={
                'row' + (isFading ? ' ' + styles.fadeout : ' ' + styles.fadein)
              }
            >
              {categoryProducts
                .slice(activePage * rowSize, (activePage + 1) * rowSize)
                .map(item => (
                  <div key={item.id} className='col-6 col-md-4 col-lg-3'>
                    <ProductBox {...item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Swipeable>
    );
  }
}

NewFurniture.propTypes = {
  children: PropTypes.node,
  deviceType: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newFurniture: PropTypes.bool,
    })
  ),
};

NewFurniture.defaultProps = {
  categories: [],
  products: [],
  rowSize: 8,
};

export default NewFurniture;
