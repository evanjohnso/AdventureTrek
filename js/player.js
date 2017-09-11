export class Player {

  constructor(name){
    this.name = name;
    this.foodLevel = 100;
    this.waterLevel = 100;
    this.moneyLevel = 100;
  }

  setHunger(){
    setInterval(() => {
      this.foodLevel -= 5;
    }, 5000);
  }

  setThirst(){
    setInterval(() => {
      this.waterLevel -= 5;
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

}
