import Operation from "./Operation";
import Textfield from "./Textfield";
import {useState} from 'react'
import { random } from "mathjs";
import {evaluate} from 'mathjs'
import {complex} from 'mathjs'

const Container = () => {
    const inititalScrollRange = 5

    const [opList, setOpList] = useState([])
    const [lastOp, setLastOp] = useState('')
    const [scrollRange, setScrollRange] = useState([0, inititalScrollRange])
    const [vars, setVars] = useState([ ({name: 'prev', value: '0'})])

    const submit = () => {
        setOpList([...opList, lastOp])
        setScrollRange([(opList.length - scrollRange[1]) + scrollRange[0], opList.length])
        setLastOp('')
    }

    const scrollDown = () => {
        if (opList.length >= inititalScrollRange && scrollRange[1] < opList.length - 1)
            setScrollRange([scrollRange[0] + 1, scrollRange[1] + 1])
    }

    const scrollUp = () => {
        if (scrollRange[0] > 0 && scrollRange[1] > inititalScrollRange)
            setScrollRange([scrollRange[0] - 1, scrollRange[1] - 1])
    }

    const onCalClick = () => submit()

    const onTextChange = (event) => setLastOp(event.target.value)

    const onClear = () => {
        setOpList([])
        setLastOp('')
        setScrollRange([0, inititalScrollRange])
        setVars([])
    }

    const onKeyDown = (event) => {
        if (event.keyCode === 13)
            submit()

        if (event.keyCode === 38)
            scrollUp()

        if (event.keyCode === 40)
            scrollDown()
    }

    const setVarsFromChild = (array) => {
        setVars(array)
    }

    return (
        <div className='container'>
            <h1>React Calculator</h1>
            {opList.map((op, index) => {
                if (index >= scrollRange[0] && index <= scrollRange[1])
                    return <Operation key={random()} chars={op} vars={vars} unmodifiedChars={opList.at(index)} setVars={setVarsFromChild} prev={opList.at(index - 1)}/>
            })}

            <Textfield text={lastOp} placeholder='Type here...' onCalClick={onCalClick} onChange={onTextChange} onClear={onClear} onKeyDown={onKeyDown}/>
        </div>
    )
}

export default Container