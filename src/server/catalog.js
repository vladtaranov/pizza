module.exports = [
  new Product(
    1,
    'Margherita',
    'Tomatensauce, Mozzarella, Basilikum',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    1,
    'Margherita',
    'Tomatensauce, Mozzarella, Basilikum',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    1,
    'Margherita',
    'Tomatensauce, Mozzarella, Basilikum',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    1,
    'Margherita',
    'Tomatensauce, Mozzarella, Basilikum',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    1,
    'Margherita',
    'Tomatensauce, Mozzarella, Basilikum',
    ['pizza'],
    32,
    [17.9, 19])
];

function Product (id, title, description, categories, size, price) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.categories = categories;
  this.price = new Price(...price);
  return this
}

function Price (eur, usd) {
  this.EUR = eur;
  this.USD = usd;
  return this;
}
