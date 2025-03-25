function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    });
}

function buildInnerHtml(race) {
    const formattedWeekendDate = formatDate(race.weekendDate);
    const formattedRaceDate = formatDate(race.raceDate)
    return `
            <div class="number">R${race.id}</div>
            <div class="info">
                <p class="date">${formattedWeekendDate} - ${formattedRaceDate}</p>
                <div class="countryContainer">
                    <div class="flag">
                        <img class="flagImg" src="https://flagcdn.com/w40/${race.flag}.png">
                    </div>
                    <p class="country"> ${race.country}</p>
                </div>
                <p class="location">${race.location}</p>
            </div>`
}

async function getRacesCalendar(){
    const container = document.getElementById('allRaces');
    const calendar = await fetch("http://localhost:3000/api/race-calendar");
    const calendarObject = await calendar.json();
    const currentYear = new Date().getFullYear();
    document.getElementById("year").innerText = currentYear;

    calendarObject.forEach(race => {
        const raceContainer = document.createElement("div");
        raceContainer.classList.add("raceContainer");
        raceContainer.innerHTML = buildInnerHtml(race)
        container.appendChild(raceContainer);
    });
};

function main(){
    getRacesCalendar()
    const btnGoBack = document.getElementById("goBack");
    btnGoBack.addEventListener('click', ()=>{
        window.location.href = 'http://localhost:3000/nextRace.html';
    });
};

window.onload = main;