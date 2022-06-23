let balance = 1000;
let bet = 0;
let x = 0;
let maxX = 0;
let xMultiplier = [0.0002,0.001,0.01];
let i=0;
let xF = 2;
let game = false;
let gamebet = 0;


let balanceHTML = document.querySelector(".header__balance");
let betHTML = document.querySelector(".bet__input");
let xHTML = document.querySelector(".main_x");
let buttonHTML = document.querySelector(".main__button");

let textHTML = document.querySelector(".main__text");

let add1 = document.querySelector(".add1");
let add10 = document.querySelector(".add10");
let subtract1 = document.querySelector(".subtract1");
let subtract10 = document.querySelector(".subtract10");

betHTML.oninput = () => {
  bet = betHTML.value;
};

function updateData() {
    balanceHTML.innerHTML = balance.toFixed(2) + "$";
    betHTML.value = bet;
    xHTML.innerHTML = x + "x";
    localStorage.setItem("balance", JSON.stringify(balance));
    textHTML.innerHTML = (bet * x).toFixed(2) + "$";
}

function randomX() {
    number1000 = Math.floor(Math.random() * (1001 - 0)) + 0;
    q = number1000;
    maxX = ((q/100)*(q/1000)).toFixed(2);

}

function changeColor(status) {
    if (status == 'on') {
        buttonHTML.classList.remove("main__button");
        buttonHTML.classList.add("main__button-on");
        xHTML.classList.remove("red");
        xHTML.classList.remove("green");
    }

    if (status == 'off') {
        buttonHTML.classList.add("main__button");
        buttonHTML.classList.remove("main__button-on");
        xHTML.classList.remove("green");
        xHTML.classList.add("red");
        buttonHTML.innerHTML = "СТАРТ";
    }

    if (status == "offWin") {
      buttonHTML.classList.add("main__button");
      buttonHTML.classList.remove("main__button-on");
      xHTML.classList.remove("red");
      xHTML.classList.add("green");
      buttonHTML.innerHTML = "СТАРТ";
    }

}

function upX() {
    setInterval(() => {
    if (x < maxX) {
      x += xMultiplier[i];
      xHTML.innerHTML = x.toFixed(xF) + "x";
      textHTML.innerHTML = (bet * x).toFixed(2) + "$";

      if (x > 0.1 && i < 1) {
        i += 1;
      }

      if (x > 2 && i < 2) {
        i++;
        xF = 1;
      }
    } else {
      xHTML.classList.add("red");
      changeColor("off");
      xF=2;
      i=0;
    }}, 10);
    
    } 



function play() {
    if (buttonHTML.classList.contains("main__button-on")) {
        stop();
        return;
    }    

    if (bet <= balance && bet != 0 && !game) {
        game = true;
        gamebet = bet;
        balance -= gamebet;
        x = 0;
        randomX();
        buttonHTML.innerHTML = "ЗАБРАТЬ"
        changeColor("on");
        updateData();
        id = setInterval(() => {
            if (x < maxX) {
                 x += xMultiplier[i];
                xHTML.innerHTML = x.toFixed(xF) + "x";
                textHTML.innerHTML = (gamebet * x).toFixed(2) + "$";
      
            if (x > 0.1 && i < 1) {
                i += 1;
            }
      
            if (x > 2 && i < 2) {
                i++;
                xF = 1;
            }

            } else {
                game = false;
                changeColor("off");
                xF = 2;
                i = 0;
                x = x.toFixed(2);
                updateData();
                clearInterval(id);


        }}, 10);

    } else {

        if (balance == 0) {
            alert("Пополните баланс!");
            updateData();
        }
      
        if (bet > balance) {
            bet = balance;
            updateData();
        }
    }
}



function stop() {
    game = false;
    clearInterval(id);
    changeColor("offWin");
    xF = 2;
    i = 0;
    x = x.toFixed(2);
    clearInterval(id);
    balance += gamebet*x;
    updateData();
}




function add1func() {
  if (bet < balance) {
    bet = Math.floor(bet);
    bet += 1;
    updateData();
  }
  if (bet > balance) {
    bet = balance;
    updateData();
  }
}

function add10func() {
  if (bet < balance) {
    bet = Math.floor(bet);
    bet += 10;
    updateData();
  }
  if (bet > balance) {
    bet = balance;
    updateData();
  }
}

function subtract1func() {
  if (bet > 0) {
    bet = Math.floor(bet);
    bet -= 1;
    updateData();
  }

  if (bet < 0) {
    bet = 0;
    updateData();
  }

  if (bet > balance) {
    bet = balance;
    updateData();
  }
}

function subtract10func() {
  if (bet > 0) {
    bet = Math.floor(bet);
    bet -= 10;
    updateData();
  }
  if (bet < 0) {
    bet = 0;
    updateData();
  }
  if (bet > balance) {
    bet = balance;
    updateData();
  }
}


function siteLoad() {
  if (JSON.parse(localStorage.getItem("balance")) === null) {
    console.log("null");
    localStorage.setItem("balance", JSON.stringify(balance.toFixed(2)));
    updateBalance();
  } else {
    balance = JSON.parse(localStorage.getItem("balance"));
  }
  updateData();
}


add1.addEventListener("click", add1func);
add10.addEventListener("click", add10func);
subtract1.addEventListener("click", subtract1func);
subtract10.addEventListener("click", subtract10func);
buttonHTML.addEventListener("click", play);


window.addEventListener("load", siteLoad);