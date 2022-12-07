import { IPoolPreview } from "../pool/pool";
import { IUserPreview } from "../user/user";
import IDate from "../utility/date";

export default interface ICourse {
    readonly id: string;
    code: string;
    category: string;
    target_group: Array<"aqua" | "adult" | "high_diving" | "diverse" | "adolescent" | "elki" | "child">;
    state: "active" | "in_planning" | "paused" | "complete";

    pool: IPoolPreview;
    clients: Array<IUserPreview>;
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

    absences: Array<Array<boolean>>; // maybe better subcollections also for invoice stuff
    promotions: Array<boolean>;

    //  Defaulted by Settings
    settings: ICourseSettings;

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