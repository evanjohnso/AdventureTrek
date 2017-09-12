export class Player {

  constructor(name){
    this.name = name;
    this.foodLevel = 50;
    this.waterLevel = 50;
    this.moneyLevel = 100;
  }

  //Interval to reduce food supply over time and end interval when food runs out
  setHunger(foodDisplay) {
    let intNum = setInterval( () => {
      this.foodLevel -= 5;
      if (!this.didYouStarve()){
        foodDisplay(this.foodLevel);
      } else {
        foodDisplay(0);
        clearInterval(intNum);
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
  //Interval to reduce water supply over time and end interval when water runs out
  setThirst(waterDisplay){
    let intNum = setInterval( () => {
      this.waterLevel -= 5;
      this.didYouDieOfDehydration(waterDisplay, intNum);
    }, 5000);
  }
  didYouDieOfDehydration(waterDisplay, intNum){
    if(this.waterLevel > 0){
      waterDisplay(this.waterLevel);
    } else {
      waterDisplay(0);
      clearInterval(intNum);
    }
  }

  //Add food to supplies
  feed(foundFood){
    this.foodLevel += foundFood;
  }
  //Add water to supplies
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
