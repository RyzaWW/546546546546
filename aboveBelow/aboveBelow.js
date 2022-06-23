let balance = 10000;
let bet = 0;

let newNumber = 500;
let redX = 2;
let greenX = 2;
let greenXLast = 2;
let redXLast = 2;
let lastNumber = 500;

let numberHTML = document.querySelector(".selector__number");
let balanceHTML = document.querySelector(".header__balance");
let betHTML = document.querySelector(".bet__input");
let xRedHTML = document.querySelector(".selector__x-red");
let xGreenHTML = document.querySelector(".selector__x-green");
let redTextHTML = document.querySelector(".red-text");
let greenTextHTML = document.querySelector(".green-text");

let add1 = document.querySelector(".add1");
let add10 = document.querySelector(".add10");
let subtract1 = document.querySelector(".subtract1");
let subtract10 = document.querySelector(".subtract10");
let greenButtton = document.querySelector(".selector__button-green");
let redButtton = document.querySelector(".selector__button-red");



betHTML.oninput = () => {
    bet = betHTML.value;
}


function updateData() {
    balanceHTML.innerHTML = balance + "$";
    betHTML.value = bet ;
    xRedHTML.innerHTML = redX + " X";
    xGreenHTML.innerHTML = greenX + " X";
    numberHTML.innerHTML = newNumber;
    greenTextHTML.innerHTML = "возможный выйгрыш " + (greenX*bet).toFixed(2) + "$";
    redTextHTML.innerHTML ="возможный выйгрыш " + (redX * bet).toFixed(2) + "$";
    localStorage.setItem("balance", JSON.stringify(balance));
}


function Random1000() {
    newNumber = Math.floor(Math.random() * (1001 - 0)) + 0;
    xGreenVar = 100 / (100 - (newNumber * 100) / 1000);
    xRedVar = 100 / ((newNumber * 100) / 1000);
    greenX = xGreenVar.toFixed(2);
    redX = xRedVar.toFixed(2);

}


function changeColor (color) {
    if (color == "red") {
        numberHTML.classList.remove("gray-color");
        numberHTML.classList.add("red-color");
        numberHTML.classList.remove("green-color");
    }
    if (color == "green") {
        numberHTML.classList.remove("gray-color");
        numberHTML.classList.remove("red-color");
        numberHTML.classList.add("green-color");
    }
}

function add1func() {
    if(bet < balance) {
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
    if(bet > 0) {
        bet = Math.floor(bet);
        bet -= 1;
        updateData();
    }

    if(bet < 0) {
        bet = 0;
        updateData();
    }

    if (bet > balance) {
      bet = balance;
      updateData();
    }        

}

function subtract10func() {
    if(bet > 0) {
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


function Up() {
    if (bet <= balance && bet != 0) {
        Random1000();
        balance -= bet;
        z = newNumber;
        v = lastNumber;

        if (newNumber > lastNumber) {
            id = setInterval(()=> {
                numberHTML.innerHTML = v;
                v+=10;
                if(z < v) {
                    clearInterval(id);
                    updateData();
                }
            },1)
            i = greenXLast * bet;
            greenXLast = greenX;
            redXLast = redX;
            redXLast = redX;
            lastNumber = newNumber;
            balance = Math.floor((balance + i) * 100) / 100;
            changeColor("green");

        }

        if (newNumber < lastNumber) {
            id = setInterval(() => {
              numberHTML.innerHTML = v;
              v -= 10;
              if (z > v) {
                clearInterval(id);
                updateData();
              }
            }, 1);
            greenXLast = greenX;
            redXLast = redX;
            lastNumber = newNumber;
            numberHTML.classList.add("red-color");
            changeColor("red");

        }

        balance = Math.floor(balance * 100) / 100;
        updateData();
    } else {

        if(balance == 0) {
            alert("Пополните баланс!");
            updateData();
        }

        if (bet > balance) {
            bet = balance;
            updateData();
        }
        
        
    }
}

function Down() {

    if (bet <= balance && bet != 0) {
        Random1000();
        balance -= bet;
        z = newNumber;
        v = lastNumber;

        if (newNumber < lastNumber) {
            id = setInterval(() => {
            numberHTML.innerHTML = v;
            v -= 10;
            if (z > v) {
                clearInterval(id);
                updateData();
            }
            }, 1);
        
            i = redXLast * bet;
            greenXLast = greenX;
            redXLast = redX;
            redXLast = redX;
            lastNumber = newNumber;
            balance = Math.floor((balance + i) * 100) / 100;
            changeColor("red");

        }

        if (newNumber > lastNumber) {
            id = setInterval(() => {
                numberHTML.innerHTML = v;
                v += 10;
                if (z < v) {
                    clearInterval(id);
                    updateData();
                }
            }, 1);
            greenXLast = greenX;
            redXLast = redX;
            lastNumber = newNumber;
            changeColor("green");
        }

        balance = Math.floor(balance * 100) / 100;
        updateData();
    }

    if(balance == 0) {
        alert("Пополните баланс!");
        updateData();
    }   

    if (bet > balance) {
        bet = balance;
        updateData();
    }
}

function siteLoad() {
    if (JSON.parse(localStorage.getItem("balance")) === null) {
        console.log('null');
        localStorage.setItem("balance", JSON.stringify(balance.toFixed(2)));
        updateBalance();
    } else {
        balance = JSON.parse(localStorage.getItem("balance"));
    }
    updateData();
}









add1.addEventListener("click",add1func);
add10.addEventListener("click", add10func);
subtract1.addEventListener("click", subtract1func);
subtract10.addEventListener("click", subtract10func);
greenButtton.addEventListener("click", Up);
redButtton.addEventListener("click", Down);
window.addEventListener("load", siteLoad);



