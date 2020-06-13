module.exports = [
  new Product(
    1,
    'Margherita',
    'Tomatensauce, Mozzarella, Basilikum',
    [1],
    '32 cm',
    [12.9, 14.9]),
  new Product(
    2,
    'Funghi Freschi',
    'Frische Egerlinge, Käse',
    [1],
    '32 cm',
    [14.9, 15.9]),
  new Product(
    3,
    'Proschiutto E Funghi',
    'Hinterschinken, frische Egerlinge, Käse',
    [1],
    '32 cm',
    [16.9, 18.9]),
  new Product(
    4,
    'Proschiutto',
    'Hinterschinken, Käse',
    [1],
    '32 cm',
    [14.9, 15.9]),
  new Product(
    5,
    'Salami',
    'Salami, Käse',
    [1],
    '32 cm',
    [17.9, 19.9]),
  new Product(
    6,
    'Braccio Di Ferro',
    'Spinat, Ei, Käse, Knoblauch',
    [1],
    '32 cm',
    [17.9, 19.9]),
  new Product(
    7,
    'Hawaii',
    'Hinterschinken, Ananas, Käse',
    [1],
    '32 cm',
    [20.9, 23.9]),
  new Product(
    8,
    'Canarino',
    'Hinterschinken, frische Egerlinge, Salami, Sardellen, Käse',
    [1],
    '32 cm',
    [19.9, 22.9]),
  new Product(
    9,
    'Marinara',
    'Meeresfrüchte, Käse, Knoblauch',
    [1],
    '32 cm',
    [22.9, 25.9]),
  new Product(
    10,
    'Rustica',
    'Mozzarella, frische Tomaten, Oliven mit Stein, Zwiebeln, Oregano, piccante',
    [1],
    '32 cm',
    [17.9, 19.9])
];

function Product (id, title, description, categories, size, price) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.categories = categories;
  this.size = size;
  this.price = new Price(...price);
  return this;
}

function Price (eur, usd) {
  this.EUR = eur;
  this.USD = usd;
  return this;
}
