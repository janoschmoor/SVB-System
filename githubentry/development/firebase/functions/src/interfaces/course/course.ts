import { IPoolPreview } from "../pool/pool";
import { IUserPreview } from "../user/user";
import IDate from "../utility/date";

export default interface ICourse {
    readonly id: string; // gen
    code: string; // template
    category: string; // template
    target_group: Array<"aqua" | "adult" | "high_diving" | "diverse" | "adolescent" | "elki" | "child">; // template
    state: "active" | "planned" | "paused" | "complete"; // template

    pool: IPoolPreview; // template
    clients: Array<IUserPreview>; // template
    coaches: Array<IUserPreview>; // dyn

    duration: number; // template
    start_day: number; // template
    intervall: string; // template
    time: number; // template
    repetitions?: number; // template
    dates: Array<IDate>; // dyn


    absences: any; // dyn
    promotions: Array<boolean>; // dyn

    base_cost: string; // template
    max_clients: number; // template

}

export interface ICoursePublic {
    readonly id: string;
    code: string;
    category: string;
    target_group: Array<"aqua" | "adult" | "high_diving" | "diverse" | "adolescent" | "elki" | "child">;
    state: "active" | "in_planning" | "paused" | "complete";

    pool: IPoolPreview;
    reservations: number;
    coaches: Array<IUserPreview>;
    duration: string;
    duration_numeric: number;
    dates: Array<IDate>;
    weekday?: string;
    weekday_numeric?: number;
    time?: string;
    time_numeric?: number;
    saison?: "august" | "november" | "march";
    year: string;

    //  Defaulted by Settings
    base_cost: string; 

}

export interface ICoursePreview {
    readonly id: string;
    readonly state: "active" | "in_planning" | "paused" | "complete";
    readonly pool: IPoolPreview;
    readonly coaches: Array<IUserPreview>;
    readonly weekday: string;
    readonly weekday_numeric: number;
    readonly time: string;
    readonly time_numeric: number;
}

export interface ICourseSettings {
    base_cost: string;
    max_clients: number;
}