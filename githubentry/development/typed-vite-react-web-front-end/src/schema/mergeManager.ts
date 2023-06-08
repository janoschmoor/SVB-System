export function ChangeMerger(initialData: any, path: string, change: any, changePath: string, ) {
    const newPath = changePath.replace(`${path}/`, '')
    const segments = newPath.split('/');
    let current = initialData;

    // Traverse the object and create nested objects/arrays if necessary
    for (let i = 0; i < segments.length - 1; i++) {
        const key = segments[i];
        const nextKey = segments[i + 1];

        if (current.hasOwnProperty(key)) {
        current = current[key];
        } else if (/^\d+$/.test(nextKey)) {
        current[key] = [];
        current = current[key];
        } else {
        current[key] = {};
        current = current[key];
        }
    }

    // Set the new value at the end of the path
    const finalKey = segments[segments.length - 1];
    const parent = current;
    const index = parseInt(finalKey, 10);
    if (Array.isArray(parent)) {
        parent[index] = change;
    } else {
        parent[finalKey] = change;
    }

    // Update the state with the new data
    return initialData;
}

// export default function MergeManager(mergeObj: {path: string, data: any, changes: any}, changeObj: {path: string, change: any}) {
//     // remove mergeObj.path from changeObj.path
//     const newPath = changeObj.path.replace(`${mergeObj.path}/`, '')
    
//     return ChangeMerger(mergeObj.changes, changeObj.change, newPath);
// }