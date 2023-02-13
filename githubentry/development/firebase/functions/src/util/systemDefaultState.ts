export const SYSTEM_DEFAULT_STATE = {
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
            ],
        },
        courses: {

        }
    }
}