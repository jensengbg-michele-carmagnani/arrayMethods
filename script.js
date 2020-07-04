const main = document.querySelector(".main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const shoMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];



// fetch user and money

async function getRandomUser() {
  const url = "https://randomuser.me/api";
  const res = await fetch(url);
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  await addData(newUser);
}
// Map array by double the money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  displayUser();
}

// Sort users by reachest
function sortByReachest() {
  data.sort((a, b) => b.money - a.money);

  displayUser();
}

// Push user in the array
function addData(obj) {
  data.push(obj);

  displayUser();
}

function displayUser(provideData = data) {
  // clear main
  main.innerHTML = "<h2><strong>Person </strong>Wealth</h2>";
  provideData.forEach((person) => {
    const elem = document.createElement("div");
    elem.classList.add("person");
    elem.innerHTML = `<strong>${person.name}</strong> ${formtatMoney(
      person.money
    )}`;
    main.appendChild(elem);
  });
}

// format money
function formtatMoney(number) {
  return "€" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//  events listener
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByReachest);
