import {useState} from 'react'
import {evaluate} from 'mathjs'
import {complex} from 'mathjs'

const Operation = ({ chars, vars, unmodifiedChars, setVars, prev}) => {

    const evalString = (string) => {

        vars.map((v, index) => {
            if (string.includes(v.name)) {
                if (v.name === 'prev' && !string.includes('=')) {
                    v.value = (prev)
                    setVars(vars)
                }

                string = string.replace(v.name, v.value)
            }
        })

        vars.map((v) => {
            if (string.includes('=')) {
                if (!string.includes(v.name)) {
                    let tmp = string.split('=')
                    tmp[0] = tmp[0].trim()
                    tmp[1] = tmp[1].trim()
                    let val = ({name: tmp.at(0), value: complex(evaluate(tmp.at(1))).toString()})
                    string = val.value
                    vars.push(val)
                    setVars(vars)
                }
            }
        })

        return complex(evaluate(string)).toString()
    }

    try {
        chars = evalString(chars)
    } catch (error) {
        chars = 'Expression could not be resolved!'
    }

    return (
        <div>
            <h3><div className='equation'>{unmodifiedChars}</div><div className='answer'>{chars}</div></h3>
        </div>
    )
}

export default Operation