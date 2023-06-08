export const buildConstraintStringDynamically = (compoundConstraints: any) => {
    var constraintString = "";
    compoundConstraints.forEach((opt: { type: any; value: any; key?: any; operator?: any}) => {
        switch (opt.type) {
            case "limit":
                constraintString += `limit(${opt.value}),`;
                break;
            
            case "orderBy":
                constraintString += `orderBy('${opt.key}', '${opt.operator}'),`;
                break

            case "text":
                constraintString += `where("${opt.key}", ">=", "${opt.value}"),where("${opt.key}", "<=", "${opt.value}\uf8ff"),`;
                break;

            // case "where":
            //     constraintString += `where("${opt.key}", "${opt.operator}", "${opt.value}"),`;
            //     break;

            case "date":
                constraintString += `where("${opt.key}", "${opt.operator}", new Date('${opt.value.toISOString()}')),`;
                break;
            
            // case "select":
            //     constraintString += `where("${opt.key}", "==", "${opt.value}"),`;
            //     break;

            case "boolean":
                constraintString += `where("${opt.key}", "==", ${opt.value}),`;
                break;
            
            case "number":
                constraintString += `where("${opt.key}", "${opt.operator}", ${opt.value}),`;
                break;

            default:
                break;
        }
    })

    if (constraintString.length > 0) {
        constraintString = constraintString.slice(0,constraintString.length-1);
    }
    return constraintString;
};