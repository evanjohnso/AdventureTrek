import { Player } from './../js/player.js';
var apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  //Create rotating background to give the game day and night
  // var header = $('body');
  var backgrounds = new Array(
      'url(../img/trail-background.jpg)',
      'url(../img/night-background.jpg)'
  );
  var current = 0;
  function nextBackground() {
      current++;
      current = current % backgrounds.length;
      $('body').css('background-image', backgrounds[current]);
  }
  setInterval(nextBackground, 500000);
  // header.css('background-image', backgrounds[0]);

  //Get player's name
  $("#nameForm").submit(function(e) {
    e.preventDefault();

    //What to do when the game ends
    function gameover(){
      $('.game-over').show();
      $('.game-play-header').hide();
      $('#search-water').hide();
      $('#search-food').hide();
    }

    //Track supply levels
    function waterDisplay(watermsg){
      if (watermsg === 0) {
        $('#water-level').text(watermsg);
        gameover();
      } else {
      $('#water-level').text(watermsg);
      }
    }
    function foodDisplay(foodmsg){
      if (foodmsg === 0) {
        $('#food-level').text(foodmsg);
        gameover();
      } else {
        $('#food-level').text(foodmsg);
      }
    }
    let playerName = $("input#get-name").val();
    let thisPlayer = new Player(playerName);
    let foodInterval = thisPlayer.setHunger(foodDisplay);
    let waterInterval = thisPlayer.setThirst(waterDisplay);
    $('#food-level').text(thisPlayer.foodLevel);
    $('#water-level').text(thisPlayer.waterLevel);

    //Create gameboard
    let welcome = `Welcome to the adventure ${playerName}!`;
    $("span#player-greeting").text(welcome);
    $("span#food-level").text(foodInterval);
    $("span#water-level").text(waterInterval);
    let randomNumber = Math.floor(Math.random() * 25);

    //GIPHY - exercise to utilize results of API call
    let imageLocation = document.getElementById("giphy");
    $.ajax({
      url: `http://api.giphy.com/v1/gifs/search?q=adventure&rating=g&api_key=${apiKey}`,
      type: "GET",
      data: {
        format: 'json'
      },
      success: function(response) {
        let url = response.data[randomNumber].images.fixed_width.url;
        imageLocation.setAttribute("src", url);
      },
      error: function() {
        alert('there was an error, oh no!');
      }
    });

    //Switch from player name input to game play board
    $(this).parent().fadeOut(1000);
    setTimeout( () => {
      $(this).parent().next().fadeIn(1000);
    }, 1000);

    //Get more food
    $("#search-food").click(function(e){
      e.preventDefault();
      let findFood = Math.floor(Math.random() * 15);
      thisPlayer.feed(findFood);
      $('#food-level').text(thisPlayer.foodLevel);
      $('#found-food').text(findFood);
      $('.report-food').show();
      $('.report-water').hide();
    });

    //Get more water
    $("#search-water").click(function(e){
      e.preventDefault();
      let findWater = Math.floor(Math.random() * 15);
      thisPlayer.drink(findWater);
      $('#water-level').text(thisPlayer.waterLevel);
      $('#found-water').text(findWater);
      $('.report-water').show();
      $('.report-food').hide();
    });
  });
});
