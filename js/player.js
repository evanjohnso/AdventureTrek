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
}
