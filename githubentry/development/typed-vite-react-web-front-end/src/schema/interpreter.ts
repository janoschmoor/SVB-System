import SCHEMA from "./schema";


export default function Interpreter (path: string | undefined, data: any): IProperty | undefined {

    const schema = search(path);

    if (path === undefined || schema === undefined) {
        const type = getDataType(data);
        if (type != "unknown") {
            const _schema = search(type);
            if (typeof path == "string" && _schema) {
                var p = path as string;
                var lastElement = p.split("/").pop();
                _schema.key = lastElement ? lastElement : "unknown";
            }
            if (_schema?.properties) {
                const copy = Object.assign({}, _schema);
                delete copy.properties;
                return copy;
            }
            return _schema;
        }
        return undefined;
    }

    if (typeof path == "string" && schema) {
        var p = path as string;
        var lastElement = p.split("/").pop();
        schema.key = lastElement ? lastElement : "unknown";
    }
    if (schema?.properties) {
        const copy = Object.assign({}, schema);
        delete copy.properties;
        return copy;
    }
    return schema;
}

export function getProperties(path: string, access_level?: number): IProperty[] | undefined { // gives you all the .properties of the object at path location
    
    const schema = search(path);
    if (schema) {
        const array = [];
        if (schema.properties) {
            for (const property of schema.properties) {
                if (!(access_level && property.minViewLevel) || (access_level && property.minViewLevel && property.minViewLevel <= access_level)) {
                    const copy = Object.assign({}, property);
                    delete copy.properties;
                    array.push(copy);
                }
            }
        }

        return array;
    }
    return undefined;
}
export function getProperty (path: string): IProperty | undefined { // get you the object at path location
    const schema = search(path);
    if (schema) {
        const copy = Object.assign({}, schema);
        delete copy.properties;
        return copy;
    }
    return undefined;
}

export function buildFromChanges (changePaths: string[], basePath: string, data: any): any {
    const newData: any = {};
    for (const changePath of changePaths) {
        const path = changePath.replace(basePath+"/", "");
        const key = path.split("/").shift();
        if (key) {
            newData[key] = data[key];
        }
    }
    return newData;
}

const getDataType = (data: any) => {
    if (typeof data === "string") {
        return "string";
    } else if (typeof data === "number") {
        return "number";
    } else if (typeof data === "boolean") {
        return "boolean";
    } else if (typeof data === "object") {
        if (Array.isArray(data)) {
            return "array";
        } else if (data instanceof Date) {
            return "date";
        } else if (data == null) {
            return "null";
        } else {
            return "object";
        }
    } else {
        return "unknown";
    }
}

const search = (path: string | undefined, branch?: any):IProperty | undefined  => {
    if (path === undefined) {
        return undefined;
    }
    if (!branch) {
        branch = SCHEMA;
    }
    const segments = path.split("/");
    const segment = segments.shift();

    var property = branch.find((property: any) => property.key === segment);
    if (!property) {
        property = branch.find((property: any) => property.key === "**");
        if (!property) {
            return undefined;
        }
    }
    
    if (segments.length == 0) {
        // const copy = Object.assign({}, property);
        // delete copy.properties;
        // return copy;
        return Object.assign({}, property);
    }
    return search(segments.join("/"), property.properties);
}

export interface IProperty {
    key: string;
    display: string;
    type: string;
    properties?: IProperty[];   // for objects / arrays
    disableCreate?: boolean;    // not creatable
    disableChange?: boolean;    // not editable like the id
    optional?: boolean;         // as in not required
    options?: string[];         // for select
    preview?: string;           // is a user or cource etc. preview
    minViewLevel?: number;      // access restriction
    minEditLevel?: number;      // access restriction
    timeMode?: "default" | "delta";
    actions: Array<{render: Function, id: string}>;
    template?: any;             // for arrays and objects to dynamically create new elements
}