import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions';
import Server from '../../services/server';
import ErrorMessage from '../error-boundary';
import Spinner from '../spinner';
import Header from '../header';
import Product from '../product';
import './app.scss';

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
    const { isFetching, hasFetchingError } = this.state;
    const { products, currency, setCurrency } = this.props;

    if (isFetching) return <Spinner />;

    if (hasFetchingError) return <ErrorMessage />;

    return (
      <Fragment>
        <Header
          currency={currency}
          setCurrency={setCurrency} />

        <main className="wrapper app__wrapper">
          <h2 className="app__title">Pizza, die Sie lieben werden!</h2>
          <div className="app__catalog">
            {
              products.map((product) => {
                return (
                  <div key={product.id} className="app__product">
                    <Product
                      product={product}
                      currency={currency} />
                  </div>
                );
              })
            }
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currency: state.currency
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProducts: bindActionCreators(actions.saveProducts, dispatch),
    setCurrency: bindActionCreators(actions.setCurrency, dispatch)
  };
};

App.propTypes = {
  products: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  saveProducts: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
