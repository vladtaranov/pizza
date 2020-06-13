import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions';
import Server from '../../services/server';

import ErrorMessage from '../error-boundary';
import Spinner from '../spinner';
import Header from '../header';
import Category from '../category';
import Frame from '../frame';
import Messages from '../messages';

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
    const { saveProducts, saveCategories } = this.props;
    try {
      const [
        products,
        categories
      ] = await Promise.all([
        this.server.getAllProducts(),
        this.server.getAllCategories()
      ]);

      saveProducts(products);
      saveCategories(categories);
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
      categories,
      frame,
      currency,
      cart,
      order,
      setFrame,
      setCurrency,
      addToCart,
      removeFromCart,
      updateOrder
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
          order={order}
          currentFrame={frame}
          currency={currency}
          setFrame={setFrame}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateOrder={updateOrder} />

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
    order: state.order
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProducts: bindActionCreators(actions.saveProducts, dispatch),
    saveCategories: bindActionCreators(actions.saveCategories, dispatch),
    setFrame: bindActionCreators(actions.setFrame, dispatch),
    setCurrency: bindActionCreators(actions.setCurrency, dispatch),
    addToCart: bindActionCreators(actions.addToCart, dispatch),
    removeFromCart: bindActionCreators(actions.removeFromCart, dispatch),
    updateOrder: bindActionCreators(actions.updateOrder, dispatch)
  };
};

App.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  frame: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  saveProducts: PropTypes.func.isRequired,
  saveCategories: PropTypes.func.isRequired,
  setFrame: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
