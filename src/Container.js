import Operation from "./Operation";
import Textfield from "./Textfield";
import {useState} from 'react'
import { random } from "mathjs";
import {evaluate} from 'mathjs'
import {complex} from 'mathjs'

function Container() {
    const inititalScrollRange = 5

    const [opList, setOpList] = useState([])
    const [lastOp, setLastOp] = useState('')
    const [scrollRange, setScrollRange] = useState([0, inititalScrollRange])
    const [vars, setVars] = useState([ ({name: 'blaze', value: '420'})])

    function submit() {
        setOpList([...opList, lastOp])
        setScrollRange([(opList.length - scrollRange[1]) + scrollRange[0], opList.length])
        setLastOp('')
        console.log(vars);
    }

    function scrollDown() {
        if (opList.length >= inititalScrollRange && scrollRange[1] < opList.length - 1)
            setScrollRange([scrollRange[0] + 1, scrollRange[1] + 1])
    }

    function scrollUp() {
        if (scrollRange[0] > 0 && scrollRange[1] > inititalScrollRange)
            setScrollRange([scrollRange[0] - 1, scrollRange[1] - 1])
    }

    function onCalClick() {
        submit()
    }

    function onTextChange(event) {
        setLastOp(event.target.value)
    }

    function onClear() {
        setOpList([])
        setLastOp('')
        setScrollRange([0, inititalScrollRange])
        setVars([])
    }

    function onKeyDown(event) {
        if (event.keyCode === 13)
            submit()

        if (event.keyCode === 38)
            scrollUp()

        if (event.keyCode === 40)
            scrollDown()
    }

    return (
        <div className='container'>
            <h1>React Calculator</h1>
            {opList.map((op, index) => {
                let updateOps = opList
                
                if (op.includes('prev')) {
                    op = op.replace('prev', complex(evaluate(opList.at(index - 1))).toString())
                }

                vars.map((v) => {
                    if (op.includes(v.name)) {
                        op = op.replace(v.name, v.value)
                    }
                })

                vars.map((v) => {
                    if (op.includes('=')) {
                        let tmp = op.split('=')
                        tmp[0] = tmp[0].trim()
                        tmp[1] = tmp[1].trim()
                        let val = ({name: tmp.at(0), value: complex(evaluate(tmp.at(1))).toString()})
                        op = val.value
                        let tmp2 = vars
                        tmp2.push(val)
                        setVars(tmp2)
                    }
                })
                
                if (opList[index] !== op) {
                    updateOps[index] = op
                    setOpList(updateOps)
                }

                if (index >= scrollRange[0] && index <= scrollRange[1])
                    return <Operation key={random()} chars={op} />
            })}

            <Textfield text={lastOp} placeholder='Type here...' onCalClick={onCalClick} onChange={onTextChange} onClear={onClear} onKeyDown={onKeyDown}/>
        </div>
    )
}

export default Container;