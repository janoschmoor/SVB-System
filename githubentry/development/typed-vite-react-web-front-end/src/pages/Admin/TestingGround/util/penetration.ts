import { loadCollection } from '../../../../services/firestore/firestore';
import { setUserAccessLevel } from '../../../../services/functions';


export const firestorePenetrationTest = async (currentUser: any) => {
    const stats = {
        time: Date.now(),
        result: true,
    }
    console.clear();
    console.log("Starting Firestore Penetration Test", stats.time);

    for (let index = 0; index < 3000; index+=1000) {
        console.log("Setting accesslevel to "+index)

        await check(stats, setUserAccessLevel, true, {userId: currentUser?.uid, newClaims: {roles: [], access_level: index}});
        await check(stats, loadCollection, index>=2000, {path: "users", options: [
            {type: "limit", value: 10},
            {type: "where", key: "last_name", operator: "==", value: "Moor"}
        ]});
    }

    console.log("Finished Firestore Penetration Test "+(stats.result ? "SUCCESSFUL" : "FAIL") +" [" + (Date.now()-stats.time) / 1000 + "s]")
}

const check = async (stats:any, f: any, awaitedOutcome: boolean, ...param: any) => {
    var res;
    try {
        res = await f(...param);
    } catch {
        res = {data:{statusCode:400}};
    }
    if ((res?.data?.statusCode == 200 && awaitedOutcome == true) || (res?.data?.statusCode != 200 && awaitedOutcome == false)) {
        console.log("%cSuccess", "color:green");
    } else {
        stats.result = false;
        console.log("%cFail", "color:red", res);
    }
}