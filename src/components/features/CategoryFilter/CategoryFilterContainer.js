import { connect } from 'react-redux';
import CategoryFilter from './CategoryFilter.js';
import { getAll } from '../../../redux/categoriesRedux';

const mapStateToProps = state => ({
  categories: getAll(state),
});

export default connect(mapStateToProps)(CategoryFilter);
