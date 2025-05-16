import { atom } from "recoil"

export const notification = atom({
    key: "notification",
    default: {
        home: 0,
        jobs: 10,
        connections: 20,
        profile: 0
    }
})