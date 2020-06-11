import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions';
import Server from '../../services/server';
import Header from '../header';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.server = new Server();

    this.state = {
      isFetching: true,
      hasFetchingError: false
    };
  }

  async componentDidMount () {
    const { saveProducts } = this.props;
    try {
      const products = await this.server.getAllProducts();
      saveProducts(products);
      this.setState({
        isFetching: false
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isFetching: false,
        hasFetchingError: true
      });
    }
  }

  render () {
    return (
      <Fragment>
        <Header />
        <h1>hallo2l</h1>
        <h2>auf wiedersehen</h2>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProducts: bindActionCreators(actions.saveProducts, dispatch)
  };
};

App.propTypes = {
  saveProducts: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
