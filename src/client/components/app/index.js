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
import Frame from '../frame';
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
    const {
      products,
      frame,
      currency,
      cart,
      setFrame,
      setCurrency,
      addToCart,
      removeFromCart
    } = this.props;

    const cartCount = Object.values(cart)
      .reduce((sum, count) => sum + count, 0);

    if (isFetching) return <Spinner />;

    if (hasFetchingError) return <ErrorMessage />;

    return (
      <Fragment>
        <Frame
          products={products}
          cart={cart}
          currentFrame={frame}
          currency={currency}
          setFrame={setFrame}
          addToCart={addToCart}
          removeFromCart={removeFromCart} />

        <Header
          currency={currency}
          cartCount={cartCount}
          setFrame={setFrame}
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
                      currency={currency}
                      addToCart={addToCart} />
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
    frame: state.frame,
    currency: state.currency,
    cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProducts: bindActionCreators(actions.saveProducts, dispatch),
    setFrame: bindActionCreators(actions.setFrame, dispatch),
    setCurrency: bindActionCreators(actions.setCurrency, dispatch),
    addToCart: bindActionCreators(actions.addToCart, dispatch),
    removeFromCart: bindActionCreators(actions.removeFromCart, dispatch)
  };
};

App.propTypes = {
  products: PropTypes.array.isRequired,
  frame: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  saveProducts: PropTypes.func.isRequired,
  setFrame: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
