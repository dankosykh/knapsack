
// thief
class Thief {

  constructor(lbs){
  this.maxWeight = lbs;
  // this.currentGoods = [];
  // this.totalPrice = 0;
  }
}

// Thief.prototype.steal = (item) => {
//   this.currentGoods.push(item);
//   this.totalPrice += item.price;
//   this.currentWt += item.lbs;
// };

class Good {
  constructor(price, lbs){
    this.price = price;
    this.lbs = lbs;
  }
}

const optimizedGoods = (thief, arrayOfGoods) => {

  let max = thief.maxWeight;
  let price = 0;

  let totalWeight = 0;
  let totalPrice = 0;
  // check for total weight
  arrayOfGoods.forEach(item => {
    totalWeight += item.lbs;
    totalPrice += item.price;
  });

  if (totalWeight < max) {
    return totalPrice;
  };

  // let currentMaxWt = 0;
  let currentMaxPrice = 0;

  const permutations = (totalGoods, leftoverGoods) => {
    if (totalGoods.weight > max) {
      return
    };

    if (totalGoods.weight <= max && totalGoods.price > currentMaxPrice) {
      currentMaxPrice = totalGoods.price;
    };

    leftoverGoods.forEach((item,index) => {
      totalGoods.weight += item.lbs;
      totalGoods.price += item.price;
      let newLeftover = leftoverGoods.slice(0, index).concat(leftoverGoods.slice(index + 1))
      permutations(totalGoods, newLeftover)
    });
  }

  let totalGoods = { weight: 0, price: 0 };
  permutations(totalGoods, arrayOfGoods)
  return currentMaxPrice;
};

let apple = new Good(5, 1);
let banana = new Good(10, 5);
let blueberry = new Good(3, 3);
let grape = new Good(3, 1);

let robber = new Thief();
robber.maxWeight = 9;

let x = optimizedGoods(robber, [apple, banana, blueberry, grape])
console.log(x)