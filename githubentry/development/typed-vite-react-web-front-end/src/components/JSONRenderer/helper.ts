const getDepth = (depth: number) => {
    let depthString = "";
    for (let i = 0; i < depth; i++) {
        depthString += "___";
    }
    return depthString;
}


export {
    getDepth,
}