module.exports = [
  new Product(
    1,
    'Margherita',
    'Tomatensauce, Mozzarella, Basilikum',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    2,
    'Funghi Freschi',
    'Frische Egerlinge, Käse',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    3,
    'Proschiutto E Funghi',
    'Hinterschinken, frische Egerlinge, Käse',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    4,
    'Proschiutto',
    'Hinterschinken, Käse',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    5,
    'Salami',
    'Salami, Käse',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    6,
    'Braccio Di Ferro',
    'Spinat, Ei, Käse, Knoblauch',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    7,
    'Hawaii',
    'Hinterschinken, Ananas, Käse',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    8,
    'Canarino',
    'Hinterschinken, frische Egerlinge, Salami, Sardellen, Käse',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    9,
    'Marinara',
    'Meeresfrüchte, Käse, Knoblauch',
    ['pizza'],
    32,
    [17.9, 19]),
  new Product(
    10,
    'Rustica',
    'Mozzarella, frische Tomaten, Oliven mit Stein, Zwiebeln, Oregano, piccante',
    ['pizza'],
    32,
    [17.9, 19])
];

function Product (id, title, description, categories, size, price) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.categories = categories;
  this.size = size;
  this.price = new Price(...price);
  return this
}

function Price (eur, usd) {
  this.EUR = eur;
  this.USD = usd;
  return this;
}
