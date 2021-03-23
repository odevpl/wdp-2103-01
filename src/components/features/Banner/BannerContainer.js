import { connect } from 'react-redux';
import Banner from './Banner.js';

const mapStateToProps = state => ({
  bannerData: state.bannerData,
});

export default connect(mapStateToProps)(Banner);
