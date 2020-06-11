class Server {
  constructor () {
    this._apiBase = '/api/';
  }

  async _getResource (url) {
    const response = await fetch(`${this._apiBase}${url}`);

    if (response.status !== 200) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }

    return await response.json();
  }

  async getAllProducts () {
    return await this._getResource('products');
  }
}

export default Server;
