import { useState } from "react"
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil"
import { CounterAtom } from "./test"
const Recoil = () => {
    const [count, setCount] = useState(0)
    return (
        <RecoilRoot>
            <IncerseBtn />
            <DecreseBtn />
            <Counter />
        </RecoilRoot>
    )
}

const IncerseBtn = () => {
    const setCount = useSetRecoilState(CounterAtom)
    const onClickBtn = () => {
        setCount(e => e + 1)
    }
    return (
        <div>
            <button onClick={onClickBtn}>Increse</button>
        </div>
    )
}

const DecreseBtn = () => {
    const setCount = useSetRecoilState(CounterAtom)
    const onClickBtn = () => {
        setCount(e => e - 1)
    }
    return (
        <div>
            <button onClick={onClickBtn}>Dercrese</button>
        </div>
    )
}

const Counter = () => {
    const count = useRecoilValue(CounterAtom)
    return (
        <p>{count}</p>
    )
}

export default Recoil