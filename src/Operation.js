import {useState} from 'react'
import {evaluate} from 'mathjs'
import {complex} from 'mathjs'

function Operation({ chars }) {
    let evalExp

    try {
        evalExp = complex(evaluate(chars)).toString()
    } catch (error) {
        evalExp = 'Expression could not be resolved!'
        chars = '0'
    }

    return (
        <div>
            <h3><div className='equation'>{chars}</div><div className='answer'>{evalExp}</div></h3>
        </div>
    )
}

export default Operation