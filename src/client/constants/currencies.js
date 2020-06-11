function Currency (value, title) {
  this.value = value;
  this.title = title;
}

export default {
  EUR: new Currency('EUR', '€'),
  USD: new Currency('USD', '$')
};
