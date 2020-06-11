import React, { Fragment } from 'react';

import Header from '../header';

class App extends React.Component {
  async componentDidMount () {
    const res = await fetch('/api');
    const r = await res.json();
    console.log(r);
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
