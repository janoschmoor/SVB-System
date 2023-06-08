const SCHEMA = {
    users: {
        display: "Nutzer",
        keys: {}
    }
}


export default function readSchema(key: string, path: string) {
    if (path) {
        const segments = path.split("/") as Array<"users">;
        const type = SCHEMA[segments[0]];
        if (type) {
        }
    }
}