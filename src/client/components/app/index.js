import React, { Fragment } from 'react';

import Server from '../../services/server';
import Header from '../header';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.server = new Server();

    this.state = {
      products: []
    };
  }

  async componentDidMount () {
    try {
      const products = await this.server.getAllProducts();
      console.log(products);
      this.setState({ products });
    } catch (error) {
      console.log(error);
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

export default App;
