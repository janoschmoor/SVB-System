
export default function getCustomClaims(claims: {accessLevel: number}) {

    const accessLevel = claims.accessLevel;

    if (accessLevel >= 0 && accessLevel <= 3000) {
        const secureClaims = {
            client: true,
            coach: accessLevel >= 1000,
            admin: accessLevel >= 2000,
            accessLevel: accessLevel,
        }
        return secureClaims;
    }


    return null;
}
