import React from 'react';
import styles from './Banner.module.scss';
//import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';

class Banner extends React.Component {
  render() {
    const { bannerData } = this.props;

    return (
      <div className={styles.root}>
        <div className='container'>
          <div className={styles.bannerMain}>
            <div className={styles.bannerTitle}>
              {bannerData.descriptionBedroom}
              <span className={styles.furniture}>
                {bannerData.descriptionFurniture}
              </span>
            </div>
            <div className={styles.bannerSubtitle}>
              {bannerData.bargain1}
              <span>{bannerData.percent}</span>
              {bannerData.bargain2}
            </div>
          </div>
          <div>
            <ul className={styles.subBanner}>
              <li className={styles.item}>
                <a href='#' className={styles.link}>
                  {bannerData.home}
                </a>
              </li>
              <li className={styles.item}>
                <a href='#' className={styles.link_active}>
                  {bannerData.furniture}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  bannerData: PropTypes.node,
};

export default Banner;
