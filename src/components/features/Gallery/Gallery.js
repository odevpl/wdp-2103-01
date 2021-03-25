/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import SectionHeader from '../../common/SectionHeader/SectionHeader';
import GalleryProduct from '../../common/GalleryProduct/GalleryProduct';
import Button from '../../common/Button/Button';

import styles from './Gallery.module.scss';

/* Custom hook for getting container width */
const useContainerWidth = myRef => {
  const getWidth = () => myRef.current.offsetWidth;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWidth());
    };

    if (myRef.current) {
      setWidth(getWidth());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getWidth, myRef]);

  return width;
};

const Gallery = ({ featured, topSeller, sale, topRated, deviceType }) => {
  const tabs = [
    {
      name: 'Featured',
      products: featured,
    },
    {
      name: 'TopSeller',
      products: topSeller,
    },
    {
      name: 'Sale off',
      products: sale,
    },
    {
      name: 'Top rated',
      products: topRated,
    },
  ];

  /* Device dependent parameters */
  const sliderRef = useRef();
  const sliderWidth = useContainerWidth(sliderRef);
  let sliderStep = 6;
  if (deviceType === 'tablet') sliderStep = 3;
  let slideWidth = (sliderWidth - 5 * sliderStep) / sliderStep;

  /* State */
  const [isFading, setFading] = useState(false);
  const [isProductFading, setProductFading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeProduct, setActiveProduct] = useState(activeTab.products[0]);
  const [sliderOffset, setSliderOffset] = useState(0);

  /* Tabs functionality */
  const handleTabChange = newIndex => {
    setFading(true);
    setTimeout(() => {
      setActiveTab(tabs[newIndex]);
      setSliderOffset(0);
      setActiveProduct(tabs[newIndex].products[0]);
    }, 300);
    setTimeout(() => {
      setFading(false);
    }, 500);
  };

  /* Slider control */
  const handleSlideClick = product => {
    setProductFading(true);
    setTimeout(() => {
      setActiveProduct(product);
    }, 300);
    setTimeout(() => {
      setProductFading(false);
    }, 500);
  };

  const handleSliderForward = event => {
    event.preventDefault();
    const minMargin = -(activeTab.products.length - sliderStep) * (slideWidth + 5);
    const newMargin = -(slideWidth + 5) * sliderStep + sliderOffset;
    if (minMargin < newMargin) {
      setSliderOffset(newMargin);
    } else setSliderOffset(minMargin);
  };

  const handleSliderBackward = event => {
    event.preventDefault();
    const newMargin = (slideWidth + 5) * sliderStep + sliderOffset;
    if (newMargin < 0) {
      setSliderOffset(newMargin);
    } else setSliderOffset(0);
  };

  return (
    <section className={styles.root}>
      <div className='container'>
        <div className='row'>
          <div className='col-6 d-flex flex-column'>
            <SectionHeader title='Furniture Gallery' />
            <nav className={styles.tabs}>
              <ul>
                {tabs.map(tab => (
                  <li key={tabs.indexOf(tab)}>
                    <a tabIndex={0} onClick={() => handleTabChange(tabs.indexOf(tab))}>
                      {tab.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.productAndSlider}>
              <div className={isFading ? ` ${styles.fadeout}` : styles.fadein}>
                <GalleryProduct
                  className={isProductFading ? ` ${styles.fadeout}` : styles.fadein}
                  {...activeProduct}
                />
                <div className={styles.slider}>
                  <Button
                    className={styles.button}
                    onClick={event => handleSliderBackward(event)}
                  >
                    <span>&lt;</span>
                  </Button>
                  <div ref={sliderRef} className={styles.slideList}>
                    <div
                      className={styles.slideListInner}
                      style={{ marginLeft: sliderOffset }}
                    >
                      {activeTab.products.map(product => (
                        <div
                          className={
                            styles.slide +
                            (product === activeProduct ? ` ${styles.active}` : '')
                          }
                          style={{ width: slideWidth }}
                          key={product.id}
                          onClick={() => handleSlideClick(product)}
                        >
                          <img src={product.image} alt={product.name} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    className={styles.button}
                    onClick={event => handleSliderForward(event)}
                  >
                    <span>&gt;</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className={styles.promo}>
              <img
                src={process.env.PUBLIC_URL + '/images/gallery_right.png'}
                alt='bed promo'
              />
              <div className={styles.promo__inner}>
                <h3>
                  from <span>$50.80</span>
                </h3>
                <h2>Bedroom Bed</h2>
                <Button className={styles.promo__button} variant='main'>
                  Shop now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Gallery.propTypes = {
  featured: PropTypes.arrayOf(PropTypes.object),
  topSeller: PropTypes.arrayOf(PropTypes.object),
  topRated: PropTypes.arrayOf(PropTypes.object),
  sale: PropTypes.arrayOf(PropTypes.object),
  deviceType: PropTypes.string,
};

export default Gallery;
