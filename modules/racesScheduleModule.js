import {countryNameToCode} from '../config/countryCodes.js';

// Internal
const fetchRaces = async () => {
    try {
        const races = await fetch('https://api.jolpi.ca/ergast/f1/2025/races/?format=json');
        const racesJSON = await races.json();
        return racesJSON.MRData.RaceTable.Races;
    } 
    catch (error) {
        console.log(`Error fetching races ${error}`);
        return [];
    };
};

// Internal
const mapRace = (raceFromApi) => {
    const country = raceFromApi.Circuit.Location.country;
    return {
        id: raceFromApi.round,
        flag: countryNameToCode[country.replace(' ', '_')],
        name: raceFromApi.raceName,
        circuit: raceFromApi.Circuit.circuitName,
        country: country,
        location: raceFromApi.Circuit.Location.locality,
        weekendDate: `${raceFromApi.FirstPractice.date}T${raceFromApi.FirstPractice.time}`,
        raceDate: `${raceFromApi.date}T${raceFromApi.time}`
    };
};

const getAllRaces = async () => {
    const races = await fetchRaces();
    const mappedRaces = races.map(race => mapRace(race));
    return mappedRaces;
};

export { getAllRaces}