import { IUserPreview } from "../user/user";
import ILocation from "../utility/location";

export default interface IPool {
    readonly id: string;
    state: "active" | "passive" | "paused";
    code: string;
    name: string;

    adress: string;
    postal_code: string;
    city: string;

    cost_per_hour: number;

    note: string;

    caretaker: IUserPreview;
    management: IUserPreview;

    additional_note: string;
    location: ILocation;
    access_description: string;
    picture_url: string;
}

export interface IPoolPreview {
    readonly id: string;
    readonly name: string;
    readonly location: ILocation;
}