import { Player } from './../js/player.js';

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
  let playerName = $("input#get-name").val();
  let thisPlayer = new Player(playerName);
  let welcome = `Welcome to the adventure ${playerName}!`;
  $("span#player-greeting").text(welcome);
  let randomNumber = Math.floor(Math.random() * 25) + 1;

  let imageLocation = document.getElementById("giphy");
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=adventure&api_key=a0fe2caa7f9a4932853584166cc20ee2",
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


  $(this).parent().fadeOut(1000);
  setTimeout( () => {
    $(this).parent().next().fadeIn(1000);
  }, 1000);
  });



});
