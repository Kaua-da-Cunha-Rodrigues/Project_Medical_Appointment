import { UserDatas } from "../../auth/models/user.model";

export interface AppModel {
    id?: string,
    specialty: string,
    doctor: string,
    date: string,
    time: string,
    obs: string,
    status: string,
    User: UserDatas
}