import {Router} from "express";
import {getRaceCalendar,getNextRace,addSubscription} from "../controllers/races.js";

const router = Router();
export default router;

router.get("/race-calendar", getRaceCalendar);

router.get("/next-race", getNextRace);

router.post("/subscribe", addSubscription);
