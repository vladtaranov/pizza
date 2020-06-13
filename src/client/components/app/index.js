import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import ErrorMessage from '../error-boundary';
import Spinner from '../spinner';
import Header from '../header';
import Category from '../category';
import Frame from '../frame';
import Messages from '../messages';
import {boundMethod} from 'autobind-decorator';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isFetching: true,
      hasFetchingError: false
    };
  }

  async componentDidMount () {
    await this.fetchProducts();
    this.fetchPurchases();
  }

  @boundMethod
  async fetchProducts () {
    const { fetchProducts } = this.props;
    try {
      fetchProducts();
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

  @boundMethod
  fetchPurchases () {
    const { fetchPurchases } = this.props;
    try {
      fetchPurchases();
    } catch (error) {
      console.log(error);
    }
  }

  render () {
    const { isFetching, hasFetchingError } = this.state;
    const {
      products,
      categories,
      frame,
      currency,
      cart,
      order,
      purchaseHistory,
      setFrame,
      setCurrency,
      addToCart,
      removeFromCart,
      clearCart,
      updateOrder,
      savePurchase
    } = this.props;

    const cartCount = Object.values(cart.items)
      .reduce((sum, count) => sum + count, 0);

    if (isFetching) return <Spinner />;

    if (hasFetchingError) return <ErrorMessage />;

    return (
      <Fragment>
        <Frame
          products={products}
          cart={cart}
          order={order}
          currentFrame={frame}
          currency={currency}
          purchaseHistory={purchaseHistory}
          setFrame={setFrame}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          updateOrder={updateOrder}
          savePurchase={savePurchase} />

        <Messages />

        <Header
          currency={currency}
          cartCount={cartCount}
          currentFrame={frame}
          setFrame={setFrame}
          setCurrency={setCurrency} />

        <main className="wrapper">
          {
            categories.map((category) => {
              const productsInCategory =
                products.filter((product) => product.categories.includes(category.id));

              return <Category
                key={category.id}
                products={productsInCategory}
                category={category}
                currency={currency}
                addToCart={addToCart} />
            })
          }
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    frame: state.frame,
    currency: state.currency,
    cart: state.cart,
    order: state.order,
    purchaseHistory: state.purchaseHistory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: bindActionCreators(actions.fetchProducts, dispatch),
    setFrame: bindActionCreators(actions.setFrame, dispatch),
    setCurrency: bindActionCreators(actions.setCurrency, dispatch),
    addToCart: bindActionCreators(actions.addToCart, dispatch),
    removeFromCart: bindActionCreators(actions.removeFromCart, dispatch),
    clearCart: bindActionCreators(actions.clearCart, dispatch),
    updateOrder: bindActionCreators(actions.updateOrder, dispatch),
    savePurchase: bindActionCreators(actions.savePurchase, dispatch),
    fetchPurchases: bindActionCreators(actions.fetchPurchases, dispatch)
  };
};

App.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  frame: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  purchaseHistory: PropTypes.array.isRequired,

  fetchProducts: PropTypes.func.isRequired,
  setFrame: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  savePurchase: PropTypes.func.isRequired,
  fetchPurchases: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
