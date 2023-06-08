import { IPool, IPoolPreview } from "./interfaces";

export default function defaultPool(): IPool {
    return {
        id: "",
        name: "",
        location: {
            lat: 0,
            lng: 0,
        },
        contact: null,
        courses: [],
        availability: [],
    }
};

const getPoolPreview = (pool: IPool): IPoolPreview => {
    return {
        id: pool.id,
        name: pool.name,
        location: pool.location,
    }
}

export {
    getPoolPreview,
};
