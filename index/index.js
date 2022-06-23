
let balance = 0;
let walletStatus = false;
let arrows = ["..\\img\\choice\\arrowDOWN.svg", "..\\img\\choice\\arrowUP.svg"];
let activeChoice = 0;
let changeStatus = 0;
let usdt = 0;
let bnb = 1;
let busd = 0;
let bnbPrise = 214.83;
let stacking = 0;

let connectWalletBtn = document.querySelector(".header__button");
let ChangeBtn = document.querySelector(".arrow");
let balanceBtn = document.querySelector(".balance__button");
let stackingDeposit = document.querySelector(".stacking-deposit");
let stackingWithdraw = document.querySelector(".stacking-withdraw");

let choiceItem = document.querySelectorAll(".choice__item");
let bnbButton = document.querySelector(".BNB");
let busdButton = document.querySelector(".BUSD");
let usdtButton = document.querySelector(".USDT");

let balanceAllTop = document.querySelector(".balance-allTop");
let balanceAllBoottom = document.querySelector(".balance-allBoottom");
let balanceAllStacking = document.querySelector(".balance-allstacking");
let inputBalanceTop = document.querySelector(".inputBalanceTop");
let inputBalanceBottom = document.querySelector(".inputBalanceBottom");
let stackingInput = document.querySelector(".stacking-input");

let balanceTop = document.querySelector(".balance-top");
let balanceBottom = document.querySelector(".balance-bottom");
let balanceBottom2 = document.querySelector(".balance-bottom2");
let balanceStacking = document.querySelector(".balance-stacking");

function updateData() {
  localStorage.setItem("balance", JSON.stringify(balance));
  localStorage.setItem("walletStatus", JSON.stringify(walletStatus));
  localStorage.setItem("stacking", JSON.stringify(stacking));

  balanceBottom.innerHTML = balance.toFixed(2) + " R USD";
  balanceBottom2.innerHTML = balance.toFixed(2) + " R USD";
  balanceStacking.innerHTML = stacking.toFixed(2) + " R USD";
}

function clickWallet() {
  if (walletStatus) {
    connectWalletBtn.classList.add("header__button");
    connectWalletBtn.classList.remove("header__button-on");
    connectWalletBtn.innerHTML = "CONNECT WALLET";
    walletStatus = false;
    connect = false;
    updateData();
  } else {
    if (!walletStatus) {
      connectWalletBtn.classList.add("header__button-on");
      connectWalletBtn.classList.remove("header__button");
      connectWalletBtn.innerHTML = "WALLET CONNECTED";
      walletStatus = true;

      updateData();
    }
  }
}

function clickChange() {
  if (!changeStatus) {
    balanceBtn.innerHTML = "WITHDRAW";
    ChangeBtn.src = arrows[1];
    balanceBtn.classList.remove("balance__button");
    balanceBtn.classList.add("balance__button-on");
    changeStatus = true;
  } else {
    if (changeStatus) {
      balanceBtn.innerHTML = "DEPOSIT";
      ChangeBtn.src = arrows[0];
      balanceBtn.classList.remove("balance__button-on");
      balanceBtn.classList.add("balance__button");
      changeStatus = false;
    }
  }
}

function bnbClick() {
  if (activeChoice != "bnb") {
    inputBalanceTop.value = 0.0;
    balanceTop.innerHTML = bnb.toFixed(2) + " BNB";
    activeChoice = "bnb";
    bnbButton.classList.remove("choice__item-focus");
    usdtButton.classList.remove("choice__item-focus");
    busdButton.classList.remove("choice__item-focus");
    bnbButton.classList.add("choice__item-focus");
  }
}

function busdClick() {
  if (activeChoice != "busd") {
    inputBalanceTop.value = 0.0;
    balanceTop.innerHTML = busd.toFixed(2) + " BUSD";
    activeChoice = "busd";
    busdButton.classList.remove("choice__item-focus");
    bnbButton.classList.remove("choice__item-focus");
    usdtButton.classList.remove("choice__item-focus");
    busdButton.classList.add("choice__item-focus");
  }
}

function usdtClick() {
  if (activeChoice != "usdt") {
    inputBalanceTop.value = 0.0;
    balanceTop.innerHTML = usdt.toFixed(2) + " USDT";
    activeChoice = "usdt";
    bnbButton.classList.remove("choice__item-focus");
    usdtButton.classList.remove("choice__item-focus");
    busdButton.classList.remove("choice__item-focus");
    usdtButton.classList.add("choice__item-focus");
  }
}

function balanceAllTopClick() {
  if (activeChoice == "bnb") {
    inputBalanceTop.value = bnb;
    inputBalanceBottom.value = bnbPrise * bnb;
  }
  if (activeChoice == "busd") {
    inputBalanceTop.value = busd;
    inputBalanceBottom.value = busd;
  }
  if (activeChoice == "usdt") {
    inputBalanceTop.value = usdt;
    inputBalanceBottom.value = usdt;
  }
}

function balanceAllBoottomClick() {
  inputBalanceBottom.value = balance;

  if (activeChoice == "bnb") {
    inputBalanceTop.value = inputBalanceBottom.value / bnbPrise;
  }
  if (activeChoice == "busd") {
    inputBalanceTop.value = busd;
    inputBalanceTop.value = inputBalanceBottom.value;
  }
  if (activeChoice == "usdt") {
    inputBalanceTop.value = usdt;
    inputBalanceTop.value = inputBalanceBottom.value;
  }
}

function clickSwap() {
  if (walletStatus) {
    if (!changeStatus) {
      if (activeChoice == "bnb" && bnb >= Number(inputBalanceTop.value)) {
        console.log("bnb");
        balance += bnbPrise * Number(inputBalanceTop.value);
        bnb -= Number(inputBalanceTop.value);
        balanceTop.innerHTML = bnb.toFixed(2) + " BNB";
      } else {
        if (activeChoice == "bnb" && bnb < Number(inputBalanceTop.value)) {
          alert("Insufficient number of coins");
        }
      }

      if (activeChoice == "busd" && busd >= Number(inputBalanceTop.value)) {
        console.log("busd");
        balance += Number(inputBalanceTop.value);
        busd -= Number(inputBalanceTop.value);
        balanceTop.innerHTML = busd.toFixed(2) + " BUSD";
      } else {
        if (activeChoice == "busd" && busd < Number(inputBalanceTop.value)) {
          alert("Insufficient number of coins");
        }
      }

      if (activeChoice == "usdt" && usdt >= Number(inputBalanceTop.value)) {
        console.log("usdt");
        balance += Number(inputBalanceTop.value);
        usdt -= Number(inputBalanceTop.value);
        balanceTop.innerHTML = usdt.toFixed(2) + " USDT";
      } else {
        if (activeChoice == "usdt" && usdt < Number(inputBalanceTop.value)) {
          alert("Insufficient number of coins");
        }
      }

      updateData();
    }
    if (changeStatus) {
      if (activeChoice == "bnb" && inputBalanceBottom.value <= balance) {
        balance -= Number(inputBalanceBottom.value);
        bnb += Number(inputBalanceBottom.value) / bnbPrise;
        balanceTop.innerHTML = bnb.toFixed(2) + " BNB";
      } else {
        if (activeChoice == "bnb" && inputBalanceBottom.value > balance) {
          alert("Insufficient number of coins");
        }
      }

      if (activeChoice == "busd" && inputBalanceBottom.value <= balance) {
        balance -= Number(inputBalanceBottom.value);
        busd += Number(inputBalanceBottom.value);
        balanceTop.innerHTML = busd.toFixed(2) + " BUSD";
      } else {
        if (activeChoice == "busd" && inputBalanceBottom.value > balance) {
          alert("Insufficient number of coins");
        }
      }

      if (activeChoice == "usdt" && inputBalanceBottom.value <= balance) {
        balance -= Number(inputBalanceBottom.value);
        usdt += Number(inputBalanceBottom.value);
        balanceTop.innerHTML = usdt.toFixed(2) + " USDT";
      } else {
        if (activeChoice == "usdt" && inputBalanceBottom.value > balance) {
          alert("Insufficient number of coins");
        }
      }
    }
    inputBalanceTop.value = 0.0;
    inputBalanceBottom.value = 0.0;
    updateData();
  } else {
    alert("Pls connect your wallet!");
  }
}

function stackingDepo() {
  if (walletStatus) {
    if (balance >= stackingInput.value) {
      stacking += Number(stackingInput.value);
      balanceStacking.innerHTML = stacking.toFixed(2) + " R USD";
      balance -= Number(stackingInput.value);
      updateData();
    } else {
      if (balance < stackingInput.value) {
        alert("Insufficient number of coins");
      }
    }
  } else {
    alert("Pls connect your wallet!");
  }
}

function stackingWith() {
  if (walletStatus) {
    if (stacking >= stackingInput.value) {
      stacking -= Number(stackingInput.value);
      balanceStacking.innerHTML = stacking.toFixed(2) + " R USD";
      balance += Number(stackingInput.value);
      updateData();
    } else {
      if (stacking < stackingInput.value) {
        alert("Insufficient number of coins");
      }
    }
  } else {
    alert("Pls connect your wallet!");
  }
}

function stackingAllClick() {
  stackingInput.value = stacking;
}

function siteLoad() {
  if (JSON.parse(localStorage.getItem("balance")) === null) {
    localStorage.setItem("balance", JSON.stringify(balance));

  } else {
    balance = JSON.parse(localStorage.getItem("balance"));

  }
  if (JSON.parse(localStorage.getItem("stacking")) === null) {
    localStorage.setItem("stacking", JSON.stringify(stacking));
    updateData();
  } else {
    stacking = JSON.parse(localStorage.getItem("stacking"));

    updateData();
  }
}

window.addEventListener("load", siteLoad);
connectWalletBtn.addEventListener("click", clickWallet);
ChangeBtn.addEventListener("click", clickChange);
bnbButton.addEventListener("click", bnbClick);
busdButton.addEventListener("click", busdClick);
usdtButton.addEventListener("click", usdtClick);
balanceAllTop.addEventListener("click", balanceAllTopClick);
balanceAllBoottom.addEventListener("click", balanceAllBoottomClick);

balanceBtn.addEventListener("click", clickSwap);

stackingDeposit.addEventListener("click", stackingDepo);
stackingWithdraw.addEventListener("click", stackingWith);
balanceAllStacking.addEventListener("click", stackingAllClick);

inputBalanceTop.oninput = () => {
  if (activeChoice == "bnb") {
    inputBalanceBottom.value = (bnbPrise * inputBalanceTop.value).toFixed(2);
  }
  if (activeChoice == "busd") {
    inputBalanceBottom.value = inputBalanceTop.value;
  }
  if (activeChoice == "usdt") {
    inputBalanceBottom.value = inputBalanceTop.value;
  }
};

inputBalanceBottom.oninput = () => {
  if (activeChoice == "bnb") {
    inputBalanceTop.value = (inputBalanceBottom.value / bnbPrise).toFixed(2);
  }
  if (activeChoice == "busd") {
    inputBalanceTop.value = inputBalanceBottom.value;
  }
  if (activeChoice == "usdt") {
    inputBalanceTop.value = inputBalanceBottom.value;
  }
};
