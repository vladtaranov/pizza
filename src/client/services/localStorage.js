export const loadStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (!serializedData) return null;
    return JSON.parse(serializedData);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};
