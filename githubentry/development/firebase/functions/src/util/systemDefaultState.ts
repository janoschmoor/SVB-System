import { ICalendar } from "./interfaces";

export const SYSTEM_DEFAULT_STATE = { // ATTENTION OUTDATED AS OF 13.2.2023 (resouce now stored locally)
    query: {
        users: {
            keys: [
                { key: "status", disp: "#", isDefaultTable: true, type: "select", selectOptions: [{key: "created", disp: "Neu"}, {key: "active", disp: "Aktiv"}, {key: "error", disp: "Fehler"}, {key: "issue", disp: "Problem"}]},
                { key: "first_name", disp: "Vorname", isDefaultTable: true, type: "text" },
                { key: "last_name", disp: "Nachname", isDefaultTable: true, type: "text" },
                { key: "email", disp: "Email", isDefaultTable: true, type: "text" },
                { key: "date_of_birth", disp: "Geburtstag", isDefaultTable: true, type: "date" },
                { key: "roles", disp: "Rollen", type: "list-select" },
                { key: "isAdmin", disp: "Admin", type: "boolean" },
                { key: "isCoach", disp: "SL", type: "boolean" },
                { key: "isClient", disp: "Kunde", type: "boolean" },
                // { key: "form_of_address", disp: "Anrede", type: "text" },
                // { key: "phone_number", disp: "Telefonnummer", type: "text" },
                // { key: "language", disp: "Sprache", type: "select", selectOptions: [{key: "created", disp: "Neu"}, {key: "active", disp: "Aktiv"}, {key: "error", disp: "Fehler"}, {key: "issue", disp: "Problem"}]},
            ],
        },
        courses: {

        }
    }
}

export const SYSTEM_CALENDAR: ICalendar = {
    id: "calendar",
    events: [
        {
            id: "mkiuztredcvbnm",
            type: "trimester",
            name: "Trimester März-Juli",
            start: new Date("2023/3/1"),
            end: new Date("2023/6/30"),
        },
        {
            id: "73urjtj5gujk45r",
            type: "trimester",
            name: "Trimester August-November",
            start: new Date("2023/7/1"),
            end: new Date("2023/10/31"),
        },
        {
            id: "rtzujhnmkjhgee",
            type: "holiday",
            name: "Tag der Arbeit",
            start: new Date("2023/5/1"),
            end: new Date(new Date("2023/5/1").getTime() + (24 * 60 * 60 * 1000) - 1),
        },
        {
            id: "o87tfvbnjkuzg",
            type: "holiday",
            name: "Frühlingsferien",
            start: new Date("2023/4/1"),
            end: new Date(new Date("2023/4/16").getTime() + (24 * 60 * 60 * 1000) - 1),
        }
    ]
}

export const SYSTEM_COURSEINSTRUCTIONS = {
    id: "courseinstructions",
    instructions: [
        {
            repeat: "trimester",
            category: "krebs",
            pool: {id: "neklsvdi3434mk", name:"Wasserstelzen", lat:"47.44", lon: "15.12"}, // instruction
            code: `1WSK01`,
            duration: 1000*60*40,
            start_day: 0*24*60*60*1000,
            start_time: 1000*60*60*18,
            training_intervall: 1000*60*60*24*7,
            // repetitions: undefined,
        },
        {
            repeat: "trimester",
            category: "seepferd",
            pool: {id: "neklsvdi3434mk", name:"Wasserstelzen", lat:"47.44", lon: "15.12"}, // instruction
            code: `1WSK02`,
            duration: 1000*60*40,
            start_day: 0*24*60*60*1000,
            start_time: 1000*60*60*18,
            training_intervall: 1000*60*60*24*7,
            // repetitions: undefined,
        },
        {
            repeat: "trimester",
            category: "frosch",
            pool: {id: "neklsvdi3434mk", name:"Wasserstelzen", lat:"47.44", lon: "15.12"}, // instruction
            code: `1WSK03`,
            duration: 1000*60*40,
            start_day: 0*24*60*60*1000,
            start_time: 1000*60*60*18 + 1000*60*40,
            training_intervall: 1000*60*60*24*7,
            // repetitions: undefined,
        }
    ]
}

export const SYSTEM_COURSETEMPLATES = {
    id: "coursetemplates",
    courses: [
        {
            category: "krebs", // template
            target_group: ["child"], // template

            clients: [], // template
            coaches:[], // dyn

            dates: [], // dyn

            promotions: [], // dyn

            base_cost: 20000, // template
            max_clients: 12, // template
        },
        {
            category: "seepferd", // template
            target_group: ["child"], // template

            clients: [], // template
            coaches:[], // dyn

            dates: [], // dyn

            promotions: [], // dyn

            base_cost: 22000, // template
            max_clients: 12, // template
        },
        {
            category: "frosch", // template
            target_group: ["child"], // template

            clients: [], // template
            coaches:[], // dyn

            dates: [], // dyn

            promotions: [], // dyn

            base_cost: 24000, // template
            max_clients: 12, // template
        },
    ],
}