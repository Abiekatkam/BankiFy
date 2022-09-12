// Data
const account1 = {
  owner: "Abie Katkam",
  movements: [2500, 11450, -400, 13000, -650, -130, 1470, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2022-05-18T21:31:17.178Z",
    "2022-05-23T07:42:02.383Z",
    "2022-06-28T09:15:04.904Z",
    "2022-06-01T10:17:24.185Z",
    "2022-06-02T14:11:59.604Z",
    "2022-07-16T17:01:17.194Z",
    "2022-07-17T23:36:17.929Z",
    "2022-07-19T10:51:36.790Z",
  ],
  currency: "RUP",
  locale: "en-IN",
};

const account2 = {
  owner: "Tony Stark",
  movements: [5000, 8400, -150, -790, -3210, -1000, 18500, -30],
  interestRate: 1.5,
  pin: 1122,
  movementsDates: [
    "2022-05-18T21:31:17.178Z",
    "2022-05-23T07:42:02.383Z",
    "2022-06-28T09:15:04.904Z",
    "2022-06-01T10:17:24.185Z",
    "2022-06-02T14:11:59.604Z",
    "2022-07-16T17:01:17.194Z",
    "2022-07-17T23:36:17.929Z",
    "2022-07-19T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Bruce Banner",
  movements: [25000, -200, 9340, -300, -20, 50, 1500, -460],
  interestRate: 0.7,
  pin: 1133,
  movementsDates: [
    "2022-05-18T21:31:17.178Z",
    "2022-06-23T07:42:02.383Z",
    "2022-06-28T09:15:04.904Z",
    "2022-06-30T10:17:24.185Z",
    "2022-07-02T14:11:59.604Z",
    "2022-07-16T17:01:17.194Z",
    "2022-07-17T23:36:17.929Z",
    "2022-07-19T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-GB",
};

const account4 = {
  owner: "Natasha Romanoff",
  movements: [25430, -500, 6000, -700, 150, -2190, 790, 200],
  interestRate: 1,
  pin: 1144,
  movementsDates: [
    "2022-05-18T21:31:17.178Z",
    "2022-05-23T07:42:02.383Z",
    "2022-06-28T09:15:04.904Z",
    "2022-06-01T10:17:24.185Z",
    "2022-06-02T14:11:59.604Z",
    "2022-07-16T17:01:17.194Z",
    "2022-07-17T23:36:17.929Z",
    "2022-07-19T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// format date

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayPassed = calcDaysPassed(new Date(), date);
  console.log(dayPassed);

  if (dayPassed === 0) return "Today";
  if (dayPassed === 1) return "Yesterday";
  if (dayPassed <= 7) {
    return `${dayPassed} days ago`;
  } else {
    // const day = `${date.getDay()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// display transaction

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const move = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  move.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    // const formatedMov = new Intl.NumberFormat(acc.locale, {
    //   style: "currency",
    //   currency: acc.locale,
    // }).format(mov);

    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)} Rs</div>
    </div>
      `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements);

// Display balance

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} Rs`;
};

// Display Summary

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}Rs`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}Rs`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}Rs`;
};

// create user names

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

// Update ui function :

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary :
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // in each call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 sec stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // set time to 5 min
  let time = 300;

  tick();

  // call the timer every second
  const timer = setInterval(tick, 1000);

  return timer;
};

////////////////////////////////////
// Event handlers for login username and pin:

let currentAccount, timer;

// Temporary display
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from defaulting
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI ans message :
    labelWelcome.textContent = `Welcome back, ${
      // currentAccount.owner.split(" ")[0]
      currentAccount.owner
    }`;
    containerApp.style.opacity = 100;

    // create current date and timme
    // const now = new Date();
    // const day = `${now.getDay()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };

    // const local = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // clear input firlds
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // update UI:
    updateUI(currentAccount);
  }
});

// Event handler for transfering money ;

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiveAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiveAcc &&
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    // console.log("Transfer Valid");

    // doing the transfer
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiveAcc.movementsDates.push(new Date().toISOString());

    // update ui
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// Event handlers for loan option :
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      //Add movements
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update ui
      updateUI(currentAccount);

      // reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 3000);
  }

  inputLoanAmount.value = "";
});

// Event handler to close account :

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

// event handlerss for sorting ;

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
