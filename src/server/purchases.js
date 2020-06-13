module.exports = [
  new Purchase(
    1,
    { 1: 2, 3: 1 },
    124.5,
    new Date('2020-4-3')),
  new Purchase(
    1,
    { 1: 2, 3: 1 },
    124.5,
    new Date('2020-4-3')),
  new Purchase(
    1,
    { 1: 2, 3: 1 },
    124.5,
    new Date('2020-4-3'))
];

function Purchase (id, orders, price, date) {
  this.id = id;
  this.orders = orders;
  this.price = price;
  this.date = date;
  return this;
}
