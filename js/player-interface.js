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
  $(this).parent().fadeOut(1000);
  setTimeout( () => {
    $(this).parent().next().fadeIn(1000);
  }, 1000);
  });
});
