let SimonOrder = [];
let playerOrder = [];
let lights;
let turn;
let winTurn;
let SimonTurn;
let intervalId;
let strict = false;
let sound = true;
let power = false;
let win;

const turnCounter = document.querySelector("#Counter");

/* event listener to check if StrictMode is checked or not */
function StrictMode(){
  if (document.querySelector('#strictMode').checked == true){
  strict = true;
  } else {
  strict = false;
  }
}

/* event listener on the click on the strict mode checkbox, to call the function StrictMode()*/
document.querySelector('#strictMode').addEventListener('click', function(){
 StrictMode();
})


/* Power mode checked - allows different messages on the counter box */
function PowerChecked(){
if (document.querySelector('#powerMode').checked == true){
  power = true;
  document.querySelector(".boxTurn").innerHTML = "ON";
  } else {
  power = false;
  document.querySelector(".boxTurn").innerHTML = "OFF";
  clearColor();
  clearInterval(intervalId);
  }
}

/* event listener on the click on the power mode checkbox, to call the function PowerChecked()*/
document.querySelector('#powerMode').addEventListener('click', function(){
 PowerChecked();
 alert('Power Mode active, press the Play button!')
})

/* function clear Color - reset the pad colours to dark after the turn */
function clearColor() {
  document.querySelector('.green').style.backgroundColor = "darkgreen";
  document.querySelector('.red').style.backgroundColor = "darkred";
  document.querySelector('.yellow').style.backgroundColor = "goldenrod";
  document.querySelector('.blue').style.backgroundColor = "darkblue";
}

/* function Flash Color - flashes the pad colours during the turn */
function flashColor() {
 document.querySelector('.green').style.backgroundColor = "lime";
 document.querySelector('.red').style.backgroundColor = "red";
 document.querySelector('.yellow').style.backgroundColor = "yellow";
 document.querySelector('.blue').style.backgroundColor = "turquoise";
}

/* functions play audio clips */
function padgreen() {
  if (sound) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  sound = true;
  document.querySelector('.green').style.backgroundColor = "lime";
}

function padred() {
  if (sound) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  sound = true;
  document.querySelector('.red').style.backgroundColor = "red";
}

function padblue() {
  if (sound) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  sound = true;
  document.querySelector('.blue').style.backgroundColor = "turquoise";
}

function padyellow() {
  if (sound) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  sound = true;
  document.querySelector('.yellow').style.backgroundColor = "yellow";
}

/* Play function that generates the game sequence, resets the Simon and player order array,
sets the turn counter to 1 */

function play() {
  SimonOrder = [];
  playerOrder = [];
  lights = 0;
  win = false;
  winTurn = true; 
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  for (var i = 0; i < 10; i++) {
    SimonOrder.push(Math.floor(Math.random() * 4) + 1);
  } 
  console.log(SimonOrder);
  SimonTurn = true; /*it starts with the computer turn*/
  intervalId = setInterval(switchTurn, 1200); 
}


/* function that checks the turn status */
function switchTurn() {
  power = false; 
/* during the computer turn the event listener on the pad clicks is disabled */
  if (lights == turn) {
    clearInterval(intervalId);
    SimonTurn = false;
    clearColor();
    power = true;
  }
  
/* if it is the computer turn, it clears all the pad colours and activate the lights sequence */
  if (SimonTurn) {
    clearColor();
    setTimeout( function Flash() {
      if (SimonOrder[lights] == 1){ 
        padgreen();
      } 
      if (SimonOrder[lights] == 2){ 
        padred();
      }
      if (SimonOrder[lights] == 3){ 
        padblue();
      }
      if (SimonOrder[lights] == 4){ 
        padyellow();
      }
      lights++; 
/* the number of lights is going to be incremented of one at each turn */
    }, 300);
  }
}

/*event listener of the start button to call the play()function*/
document.querySelector("#start").addEventListener('click', function StartCommand(){
  if (power || win) {  
  play();
  }
})

/*function that checks the win status of the turn*/
function winTest() {
  if (playerOrder[playerOrder.length - 1] !== SimonOrder[playerOrder.length - 1]) {
    winTurn = false;
    console.log(winTurn);
    flashColor();
    turnCounter.innerHTML ="NO!"; 
    if (strict){
    clearColor();
    setTimeout(function(){ gameOverAlert(); }, 100);
    setTimeout(function(){ play(); }, 200);
    //resets the game and starts play again
    }
    else {
    setTimeout(function(){ 
      window.alert("Wait for the new Simon round and try again!"); 
    }, 70);
    setTimeout(function(){
      turnCounter.innerHTML = turn;
      clearColor();
      SimonTurn = true;
      lights = 0;
      playerOrder = [];
      winTurn = true;
      intervalId = setInterval(switchTurn, 1200);
       }, 1200);
       sound = false;
      }
  }
  
  if (playerOrder.length == 10 && winTurn) {
    winGame();
  }
  
  if (turn == playerOrder.length && winTurn && !win) {
    turn++;
    playerOrder = [];
    SimonTurn = true;
    lights = 0;
    setTimeout(function(){ window.alert("you won the turn!"); }, 70);
    setTimeout(function(){ turnCounter.innerHTML = turn; }, 70);
    turnCounter.innerHTML = turn;
    intervalId = setInterval(switchTurn, 1200);
  }
}

/*function that listens to the player click on the pads, records the number clicked in the Player Order array, 
flashes the pad and sounds and after a timeout clear the pad colours*/

document.querySelectorAll('.pad').forEach(function(e){
    e.addEventListener('click', function(){
      if (power){
        var padClicked = this.id;
              switch (padClicked) {
              case "green":
                playerOrder.push(1);
                padgreen(); 
                winTest();
                if (!win) {
                  setTimeout(function(){ 
                  clearColor(); 
                 }, 300);
                }
                break;
              case "yellow":
                playerOrder.push(4); 
                padyellow();
                winTest();
                if (!win) {
                  setTimeout(function(){ 
                  clearColor(); 
                 }, 300);
                }
                break;
              case "red":
                playerOrder.push(2); 
                padred();
                winTest();
                if (!win) {
                  setTimeout(function(){ 
                  clearColor(); 
                 }, 300);
                }
                break;
              case "blue":
                playerOrder.push(3);
                padblue();
                winTest();
                if (!win) { 
                  setTimeout(function(){ 
                  clearColor(); 
                 }, 300);
                }
                break;
              default:
                console.log('no match found');
            }
         }
          })
      })


/*function win the game*/
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  power = false;
  win = true;
  gameWinAlert();
}

/*function sweetalert2 - alert Game Help instructions*/
function gamehelp()
  {
    Swal.fire({
  type: 'info',
  text: "You won't be able to revert this!",
  html:
    '<small>Simon is a memory game in which you need to repeat a sequence of tones and lights, played by the device by pressing the buttons.</small>' +
    '<small>To win the game you have to pass 10 rounds, at each turn, the series becomes progressively longer and more complex.</small>' +
    '<small><h3><b>How to play</b></h3></small>' +
    '<li><small>To start the game check the Power Mode and the Play button</small></li>' +
    '<li><small>Each turn starts with the device flashing a sequence of lights</small></li>' +
    '<li><small>You have to repeat the same sequence by pressing the buttons</small></li>' +
    '<li><small>If you do a mistake, you can retry after the sequence is repeated</small></li>' +
    '<li><small>With the strict mode checked, the game is over after each mistake</small></li>' +
    '<li><small>The number of flashes matches the turn number of the counter</small></li>' +
    '<li><small>In each turn an additional sound is added to the previous sequence</small></li>',
  showCloseButton: true,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }
  
/*function sweetalert2 - alert Win Game */
function gameWinAlert()
  {  
   Swal.fire({
  html:
    '<i class="fas fa-medal"></i> ' +
    '</br> ' +
    '<b>Congratulations!</b> ' +
    'You are the winner!</b>',
  showCloseButton: false,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }
  
/*function sweetalert2 - alert game over*/
function gameOverAlert()
  {  
   Swal.fire({
  html:
    '<i class="fas fa-gamepad"></i> ' +
    '</br> ' +
    '<b>Game Over</b> ' +
    'Play again!</b>',
  showCloseButton: false,
  showCancelButton: false,
  focusConfirm: false,
  confirmButtonAriaLabel: 'Thumbs up, great!',
    })
  }