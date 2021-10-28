let selectedCelebrateDate;
let timerOn;

const backgroundImages = [
    "imageE.jpg",
    "imageEight.jpg",
    "imageEleven.jpg",
    "imageFive.jpg",
    "imageFour.jpg",
    "imageH.jpg",
    "imageI.jpg",
    "imageNine.jpg",
    "imageO.jpg",
    "imageOm.jpg",
    "imageOne.jpg",
    "imageR.jpg",
    "imageSeven.jpg",
    "imageSix.jpg",
    "imageTen.jpg",
    "imageThree.jpg",
    "imageTwo.jpg"
]

document.querySelector("select").addEventListener("input", showSearch)

function showSearch() {
    if (document.querySelector("select").options[document.querySelector("select").selectedIndex].value != "selectYourChoise") {
        document.querySelector(".searchBlock").style.display = "flex";
    }

    else {
        document.querySelector(".searchBlock").style.display = "none";
    }

}
//  request to find all hollidays
document.querySelector("select").addEventListener("input", getHolidays);

async function getHolidays() {
    let selectedCountry = document.querySelector("select").options[document.querySelector("select").selectedIndex].value;
    const result = await fetch(`https://holidayapi.com/v1/holidays?pretty&key=4a635eb0-3872-4c52-8e4e-da6a681d4713&country=${selectedCountry}&year=2020`);
    const resultReceived = await result.json();
    addInfoOnGeneralPage(resultReceived.holidays)

}
let celebrateDay = []
function addInfoOnGeneralPage(requestResult) {
    celebrateDay = [];
    document.querySelector(`.newFields`).innerHTML = "";
    for (let i = 0; i < requestResult.length; i++) {
        let holidayName = requestResult[i].name.replaceAll(" ", "").replaceAll(/[^a-zA-Z ]/g, "").replace(/\d/g, "");
        document.querySelector(`.newFields`).innerHTML += `
        <div class="card">
        <div class="cardBackground someBackground${holidayName} ${[i]}"></div>
        <div class="card-body">
            <h5 class="card-title">${requestResult[i].name}</h5>
            <p class="card-text">There is you may calculate days before ${requestResult[i].name}</p>
            <button class="${[i]} btn btn-light" onclick="checkDate(this)">Calculate</button>
        </div>
        </div>`;
        cardBackground(holidayName);
        if (parseInt(requestResult[i].date[5] + requestResult[i].date[6]) < 12) {
            celebrateDay.push([requestResult[i].date.replace("2020", "2022"), requestResult[i].name])
        }
        else {
            celebrateDay.push([requestResult[i].date.replace("2020", "2021"), requestResult[i].name])
        }
    }

}


// CALCULATION
document.querySelector(".card-body button").addEventListener("click", openModal);
document.querySelector(".closeModalBlock").addEventListener("click", closeModal);
document.addEventListener("keyup", closeModalEsc);


function openModal() {
    document.querySelector(".selectedHoliday").style.display = "flex";
    document.querySelector(".modalBlock").style.backgroundImage = `url('images/${backgroundImages[item]}')`;
    item++
    if (item === backgroundImages.length) {
        item = 0;
    }
    counter();
}

function closeModal() {
    document.querySelector(".selectedHoliday").style.display = "none";
    clearInterval(timerOn);
}

function closeModalEsc(e) {
    if (e.key === "Escape") {
        document.querySelector(".selectedHoliday").style.display = "none";
        clearInterval(timerOn);
    }
}


function checkDate(e) {
    let classOfButton = e.classList[0];
    selectedCelebrateDate = new Date(`${celebrateDay[classOfButton][0]}, 00:00`);
    document.querySelector(".selectedHolidayName").textContent = celebrateDay[classOfButton][1];
    calculateDaysBeforeCelebrateDay();
    openModal();
}

function calculateDaysBeforeCelebrateDay() {
    const msInSecond = 1000;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * 60 * 60 * 1000;


    const today = new Date();
    const difference = selectedCelebrateDate - today;

    let days = Math.floor(difference / msInDay);
    document.querySelector(".days").textContent = days;

    let hours = Math.floor((difference % msInDay) / msInHour);
    document.querySelector(".hours").textContent = hours;

    let minutes = Math.floor((difference % msInHour) / msInMinute);
    document.querySelector(".minutes").textContent = minutes;

    let seconds = Math.floor((difference % msInMinute) / msInSecond);
    document.querySelector(".seconds").textContent = seconds;


    if (difference <= 0) {
        document.querySelector(".days").textContent = 0;
        document.querySelector(".hours").textContent = 0;
        document.querySelector(".minutes").textContent = 0;
        document.querySelector(".seconds").textContent = 0;
        clearInterval(timerOn);
    }
}

function counter() {
    timerOn = setInterval(calculateDaysBeforeCelebrateDay, 1000);
}

// search
const search = document.querySelector("input");
let celebrates
search.addEventListener('keyup', function (event) {
    celebrates = document.querySelectorAll(".card");
    let userWritten = event.target.value.toLowerCase();
    celebrates.forEach(celebrate => {
        if (celebrate.querySelector(".card-title").textContent.toLowerCase().includes(userWritten) === false) {
            celebrate.style.display = "none";
        }
        else {
            celebrate.style.display = "flex";
        }
    }
    )
})

// BACKGROUND
let item = 0;
function cardBackground(name) {
    document.querySelector(`.someBackground${name}`).style.backgroundImage = `url('images/${backgroundImages[item]}')`;
    item++
    if (item === backgroundImages.length) {
        item = 0;
    }

}

