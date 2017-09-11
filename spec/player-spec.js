import {Player} from './../js/player.js';

describe ('AGame', function() {
  let janedoe;

  beforeEach(function() {
    jasmine.clock().install();
    janedoe = new Player("Jane Doe");
    janedoe.setHunger();
    janedoe.setThirst();
  });

  afterEach(function(){
    jasmine.clock().uninstall();
  });

  it('should have a name and a food level of 1500 when created', function(){
    expect(janedoe.name).toEqual("Jane Doe");
    expect(janedoe.foodLevel).toEqual(100);
  });

  it('should have a food level of 95 after 5 seconds', function(){
    jasmine.clock().tick(5001);
    expect(janedoe.foodLevel).toEqual(95);
  });

  it('should have a water level of 95 after 5 seconds', function(){
    jasmine.clock().tick(5001);
    expect(janedoe.waterLevel).toEqual(95);
  });

  it('should die if food level drops below zero', function() {
    janedoe.foodLevel = 0;
    expect(janedoe.didYouStarve()).toEqual(true);
  });

  it('should die if water level drops below zero', function() {
    janedoe.waterLevel = 0;
    expect(janedoe.didYouDieOfDehydration()).toEqual(true);
  });

  it('should get very hungry if 100 seconds pass without finding food', function(){
    jasmine.clock().tick(100000);
    expect(janedoe.didYouStarve()).toEqual(true);
  });

  it('should get very thirsty if 100 seconds pass without finding water', function(){
    jasmine.clock().tick(100000);
    expect(janedoe.didYouDieOfDehydration()).toEqual(true);
  });

  it('should have a positive food level if food found', function(){
    jasmine.clock().tick(90001);
    janedoe.feed(10);
    expect(janedoe.foodLevel > 0).toEqual(true);
  });

  it('should have a positive water level if water found', function(){
    jasmine.clock().tick(90001);
    janedoe.drink(10);
    expect(janedoe.waterLevel > 0).toEqual(true);
  });

  it('should decrease money level when need to pay for something but not go below zero', function(){
    janedoe.pay(10);
    expect(janedoe.moneyLevel > 0).toEqual(true);
    expect(janedoe.moneyLevel).not.toEqual(100);
  });

  it('should notify player if they try to buy something that costs more than they have', function(){
    janedoe.pay(200);
    let message = "You don't have that much money";
    expect(janedoe.moneyLevel).toEqual(100);
    expect(message).toEqual("You don't have that much money");
  });
});
