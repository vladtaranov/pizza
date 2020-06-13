class LocalStorage {
  static load (key) {
    try {
      const serializedData = localStorage.getItem(key);
      if (!serializedData) return null;
      return JSON.parse(serializedData);
    } catch (error) {
      throw new Error(error);
    }
  }

  static save (key, data) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default LocalStorage;
