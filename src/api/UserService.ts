import axios from "axios";
import { IUser } from "../models/IUser";

export class UserService {
    static async getUsers() {
        return axios.get<IUser[]>("http://localhost:3000/users");
    }
    static async postUser(user: IUser) {
        return axios.post<IUser>("http://localhost:3000/users", user);
    }
}