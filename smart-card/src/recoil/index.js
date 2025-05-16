import { useState } from "react"
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { notification } from "./test"
const Recoil = () => {

    return (
        <RecoilRoot>
            <Main />
        </RecoilRoot>
    )
}

const Main = () => {
    const notificationCount = useRecoilValue(notification)
    const setValue = useSetRecoilState(notification)
    console.log(setValue)
    console.log(notificationCount)
    const onClickBTn = () => {
        setValue(notificationCount.jobs + 1)
    }
    return (
        <div>
            <button>Home {notificationCount.home}</button>
            <button>jobs {notificationCount.jobs}</button>
            <button>connections {notificationCount.connections}</button>
            <button onClick={onClickBTn}>profile {notificationCount.profile}</button>
        </div>
    )
}

export default Recoil