const Path = require('path');
const Express = require('express');
const Database = require('../database');

class App {
  constructor () {
    this.express = new Express();
    this.db = new Database();
    this.port = process.env.PORT || 8080;

    this.start = this.start.bind(this);
    this._initStaticResources = this._initStaticResources.bind(this);
    this._initListening = this._initListening.bind(this);
    this._onProductsRequest = this._onProductsRequest.bind(this);
    this._onCategoriesRequest = this._onCategoriesRequest.bind(this);
    this._onListeningCallback = this._onListeningCallback.bind(this);
  }

  start () {
    this._initStaticResources();
    this._initListening();
  }

  _initStaticResources () {
    this.express.use(
      Express.static(Path.join(process.cwd(), 'dist', 'client')));
  }

  _initListening () {
    this.express.get('/api/products', this._onProductsRequest);
    this.express.get('/api/categories', this._onCategoriesRequest);
    this.express.listen(this.port, this._onListeningCallback);
  }

  async _onProductsRequest (request, response) {
    const products = await this.db.getAllProducts();
    await response.json(products);
  }

  async _onCategoriesRequest (request, response) {
    const categories = await this.db.getAllCategories();
    await response.json(categories);
  }

  _onListeningCallback () {
    console.log(`Server started at port ${this.port}`);
  }
}

module.exports = App;
