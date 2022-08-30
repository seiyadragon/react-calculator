import {useState} from 'react'
import {evaluate} from 'mathjs'
import {complex} from 'mathjs'

const Operation = ({ chars, prev, vars}) => {
    let evalExp = ''
    
    if (chars.includes('prev')) {
        chars = chars.replace('prev', complex(evaluate(prev)).toString())
    }

    vars.map((v) => {
        if (chars.includes(v.name)) {
            chars = chars.replace(v.name, v.value)
        }
    })

    vars.map((v) => {
        if (chars.includes('=')) {
            let tmp = chars.split('=')
            tmp[0] = tmp[0].trim()
            tmp[1] = tmp[1].trim()
            let val = ({name: tmp.at(0), value: complex(evaluate(tmp.at(1))).toString()})
            chars = val.value
            vars.push(val)
        }
    })

    try {
        evalExp = complex(evaluate(chars)).toString()
    } catch (error) {
        evalExp = 'Expression could not be resolved!'
    }

    return (
        <div>
            <h3><div className='equation'>{chars}</div><div className='answer'>{evalExp}</div></h3>
        </div>
    )
}

export default Operation