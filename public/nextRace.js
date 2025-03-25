function setTimer(date){
    // Set the target date/time
    const targetDate = new Date(date); // Replace with your desired date

    function updateTimer() {
        const now = new Date();
        const timeRemaining = targetDate - now; // Calculate time difference

        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer when the target time is reached
            console.log("Time's up!");
            return;
        };
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        // Display the timer
        const daysLeft = days === 1 ? `1 Day` : `${days} Days`;
        return document.getElementById("timer").innerText = `${daysLeft} ${hours}:${minutes}:${seconds}`;
    };
    // Update every second
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer()
};

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    });
}

async function getNextRaceData() {
    try {
        const raceData = await fetch("http://localhost:3000/api/next-race");
        const raceDataJSON = await raceData.json();
        const formattedWeekendDate = formatDate(raceDataJSON.weekendDate);
        const formattedRaceDate = formatDate(raceDataJSON.raceDate);
        document.getElementById("raceName").innerText = raceDataJSON.name;       
        document.getElementById("circuit").innerText = raceDataJSON.circuit;       
        document.getElementById("weekendDate").innerText = `${formattedWeekendDate} - ${formattedRaceDate}`;       
        setTimer(raceDataJSON.raceDate);
    } 
    catch (error) {
        console.log(error);
    };
};

async function addSubscription(email,selectedOption) {
    const response = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            selectedOption
        })
    });
    const responseJson = await response.json();
    return responseJson;
};

function main() {
    getNextRaceData();

    const btnToCalendar = document.getElementById("toCalendar");
    btnToCalendar.addEventListener('click', ()=>{
        window.location.href = 'http://localhost:3000/raceCalendar.html';
    });

    const form = document.getElementById('form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const selectedOption = document.querySelector('input[name="subscription"]:checked');
        await addSubscription(email,selectedOption);
        document.getElementById("inputsContainer").innerHTML = '<span class="subscribed">Subscribed Successfully ;)</span>';
    });
};

window.onload = main;