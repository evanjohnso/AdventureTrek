import {Player} from './../js/player.js';

describe ('Player', function() {
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
});
