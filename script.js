let SimonOrder = [];
let playerOrder = [];
let flash;
let turn;
let good;
let SimonTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#Counter");

// event listener to check if StrictMode is checked or not
function StrictMode(){
  if (document.querySelector('#strictMode').checked == true){
  console.log('selezionato');
  strict = true;
  } else {
  strict = false;
  }
}


// event listener on the click on the strict mode checkbox, to call the function  StrictMode()
document.querySelector('#strictMode').addEventListener('click', function(){
 console.log('StrictMode');
 StrictMode();
})


// Power mode checked - allows different messages on the counter box TESTED

function PowerChecked(){
if (document.querySelector('#powerMode').checked == true){
  console.log('power mode is on');
  on = true;
  document.querySelector(".boxTurn").innerHTML = "ON";
  } else {
  console.log('power mode is off');
  on = false;
  document.querySelector(".boxTurn").innerHTML = "OFF";
  clearColor();
  clearInterval(intervalId);
  }
}

document.querySelector('#powerMode').addEventListener('click', function(){
 console.log('PowerClicked');
 PowerChecked();
 alert('Power Mode active, press the Play button!')
})

//function clear Color - reset the pad colours to dark after the turn
function clearColor() {
  document.querySelector('.green').style.backgroundColor = "darkgreen";
  document.querySelector('.red').style.backgroundColor = "darkred";
  document.querySelector('.yellow').style.backgroundColor = "goldenrod";
  document.querySelector('.blue').style.backgroundColor = "darkblue";
}

//function Flash Color - flashes the pad colours during the turn TESTED
function flashColor() {
 document.querySelector('.green').style.backgroundColor = "lime";
 document.querySelector('.red').style.backgroundColor = "red";
 document.querySelector('.yellow').style.backgroundColor = "yellow";
 document.querySelector('.blue').style.backgroundColor = "turquoise";
}

//functions play audio
function padgreen() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  document.querySelector('.green').style.backgroundColor = "lime";
}

function padred() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  document.querySelector('.red').style.backgroundColor = "red";
}

function padblue() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  document.querySelector('.blue').style.backgroundColor = "turquoise";
}

function padyellow() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  document.querySelector('.yellow').style.backgroundColor = "yellow";
}

//Play function at the start Simon and Player order set to zero, counter set to 1
function play() {
  SimonOrder = [];
  playerOrder = [];
  flash = 0;
  win = false;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true; 
  for (var i = 0; i < 10; i++) {
    SimonOrder.push(Math.floor(Math.random() * 4) + 1);
  } 
  console.log(SimonOrder);
  SimonTurn = true; //it starts with the computer turn
  intervalId = setInterval(gameTurn, 800); //setinterval is going to run the function gameTurn after 800 mlliseconds
  //the computer flashes a ligh after 800 milliseconds and is going to repeat it until this interval is cleared
  //this interval is cleared after all the lights have been flashed
}

function gameTurn() {
  on = false; //during the computer turn the player can't click on the buttons
  if (flash == turn) {
    clearInterval(intervalId);
    SimonTurn = false;
    clearColor();
    on = true;
  }
  
  
  // if it is the computer turn,  it clears all the pad colours and activate the flashes on the four pads
    if (SimonTurn) {
    clearColor();
    setTimeout( function Flash() {  //setTimeout after 200 milliseconds
      if (SimonOrder[flash] == 1){ 
        padgreen();
      } 
      if (SimonOrder[flash] == 2){ 
        padred();
      }
      if (SimonOrder[flash] == 3){ 
        padblue();
      }
      if (SimonOrder[flash] == 4){ 
        padyellow();
      }
      flash++; //flash started at 0 and is going to be incremented of one every time the computer flashes, this happens after 200 milliseconds
      //a light is going to be to 
    }, 200);
  }
  
}

//event listener of the start button to call the play()function
document.querySelector("#start").addEventListener('click', function StartCommand(){
  if (on || win) {  
  console.log('start pressed');
  play();
  }
})

//function to check the win status
function check() {
  if (playerOrder[playerOrder.length - 1] !== SimonOrder[playerOrder.length - 1]) {
    good = false;
    console.log(good);
    window.alert("try again!");
  }

  if (playerOrder.length == 10 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML ="NO!"; 
    /*inner html not working*/
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();//reset the game to zero and start play again
      } else {
        SimonTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }

   if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    SimonTurn = true;
    flash = 0;
    window.alert("you won the turn!");
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
    console.log('the turn number is:'+turn);
  }

} 


/*function that listens to the player click on the pads, records the number clicked in the Player Order array 
flashes the pad and sound and after a timeout clear the pad colours*/

document.querySelectorAll('.pad').forEach(function(e){
    e.addEventListener('click', function(){
      if (on){
        console.log('cliccato'); 
        var padClicked = this.id;
              switch (padClicked) {
              case "green":
                console.log('green clicked');
                playerOrder.push(1);
                console.log(playerOrder);
                padgreen(); 
                check();
                if (!win) {
                  setTimeout(function(){ 
                  clearColor(); 
                 }, 300);
                }
                break;
              case "yellow":
                console.log('yellow clicked');
                playerOrder.push(4); 
                console.log(playerOrder);
                padyellow();
                check();
                if (!win) {
                  setTimeout(function(){ 
                  clearColor(); 
                 }, 300);
                }
                break;
              case "red":
                console.log('red clicked');
                playerOrder.push(2); 
                console.log(playerOrder);
                padred();
                check();
                if (!win) {
                  setTimeout(function(){ 
                  clearColor(); 
                 }, 300);
                }
                break;
              case "blue":
                console.log('blue clicked');
                playerOrder.push(3);
                console.log(playerOrder);
                padblue();
                check();
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


// function win the game
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
  alert('Congratulations you won the game');
}

