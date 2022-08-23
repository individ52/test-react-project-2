import axios from "axios";
import { IEvent } from "../models/IEvent";

export class EventService {
    static getEvents() {
        return axios.get<IEvent[]>("http://localhost:3000/events");
    }
    static async postEvent(event: IEvent) {
        return axios.post<IEvent>("http://localhost:3000/events", event);
    }
}