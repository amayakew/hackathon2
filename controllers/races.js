import { sendMail } from "../config/mailConfig.js";
import { getAllRaces } from "../modules/racesScheduleModule.js";


export const getRaceCalendar = async (req,res) =>{
    const races = await getAllRaces();
    res.json(races);
};

export const getNextRace = async (req,res) => {
    const races = await getAllRaces();
    for (let i = 0; i < races.length; i++){
        const race = races[i];
        if (new Date() < new Date(race.raceDate)){
            res.json(race);
            return;
        };
    };
    res.status(404).json({message:`No race found`});
};

export const addSubscription = async (req,res) => {
    const {email} = req.body;
    const success = await sendMail(email,`Hello from F1 Calendar`,`Thanks for subscribing`);
    if (success){
        return res.json({message: 'ok'});
    };
    res.status(400).json({message: `Failed subscribing`});
};