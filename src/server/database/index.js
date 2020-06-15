const Firebase = require('firebase/app');
require('firebase/firestore');
const configFirebase = require('../config/firebase');

class Database {
  constructor () {
    this._db = Firebase.initializeApp(configFirebase).firestore();

    this.getAllProducts = this.getAllProducts.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this._getCollection = this._getCollection.bind(this);
  }

  async getAllProducts () {
    return await this._getCollection('products');
  }

  async getAllCategories () {
    return await this._getCollection('categories');
  }

  async _getCollection (collection) {
    try {
      const response = await this._db.collection(collection).get();
      return response.docs.map(doc => doc.data());
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = Database;
