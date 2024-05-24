import data from "../data/data.js";
const CONTAINER = document.querySelector(".js-container");
const date = new Date();
const today = date.getDate();
let days;
const BUTTON = document.querySelector(".js-btn")

function saveToStorage() {
    localStorage.setItem("data", JSON.stringify(days));
}

function initialData() {
    const storageData = localStorage.getItem("data");
    const localData = JSON.parse(storageData);

    if (localData) {
        days = localData;
    } else {
        days = data;
    }
}


function templateCard(item) {

    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");

    card.classList = "card";

    if (item.isFlipped) {
        front.classList = "card_content card_front is-flipped";
        back.classList = "card_content card_back";
    } else {
        front.classList = "card_content card_front";
        back.classList = "card_content card_back is-flipped";
    }

    front.innerHTML = `<h2> Dezember ${item.day}</h2> `;

    let message;

    if (item.day === 24) {
        message = "Today is Christmas!!"
    } else {
        message = `Just  ${24 - item.day} days until Christmas! `
    }
    back.innerHTML = `
    <div class="card_header">
    <iframe title="Youtube video player"
    src="${item.link}"
    frameborder="0"
    allowfullscreen>
    </iframe>
    </div>
    <div class="card_body">
    <p> ${message} </p>
    </div>
    `
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click",
        () => {
            if (item.day <= today) {
                front.classList.add("is-flipped"),
                    back.classList.remove("is-flipped")

                days[item.day - 1].isFlipped = true;
                saveToStorage()
            } else {
                alert("Hoooo-hoooo-hoooo! Please be patient!")
            }
        })
    return card;
}

BUTTON.addEventListener("click", () => {
    for (let day of days) {
        day.isFlipped = false
    }
    localStorage.clear()

    render()
});

const render = () => {
    CONTAINER.innerHTML = "";
    for (let day of days) {
        const newCard = templateCard(day);
        CONTAINER.appendChild(newCard);
    }

};

initialData();
render();