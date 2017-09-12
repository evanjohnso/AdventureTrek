export class Player {

  constructor(name){
    this.name = name;
    this.foodLevel = 100;
    this.waterLevel = 100;
    this.moneyLevel = 100;
  }

  setHunger(foodDisplay){
    let food;
    const setHungerInterval = setInterval(() => {
      if (this.foodLevel >= 0) {
        food = this.foodLevel -= 5;
        foodDisplay(food);
      }
    }, 5000);
  }

  setThirst(waterDisplay){
    let water;
    const setThirstInterval = setInterval(() => {
      if (this.waterLevel >= 0) {
        water = this.waterLevel -= 5;
        waterDisplay(water);
      }
    }, 5000);
  }

  didYouStarve(){
    if (this.foodLevel > 0){
      return false;
    } else {
      return true;
    }
  }

  didYouDieOfDehydration(){
    if(this.waterLevel > 0){
      return false;
    } else {
      return true;
    }
  }

  feed(foundFood){
    this.foodLevel += foundFood;
  }

  drink(foundWater){
    this.waterLevel += foundWater;
  }

  pay(cost){
    if (cost <= this.moneyLevel){
      this.moneyLevel -= cost;
      return `You have ${this.moneyLevel} coins left.`;
    } else {
      return "You don't have that much money";
    }
  }
}
