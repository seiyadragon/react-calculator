import Button from "./Button"

function Textfield({text, placeholder, onCalClick, onChange, onClear, onKeyDown}) {
    return (
        <div className='fieldcontainer'>
            <input className='textfield' onChange={onChange} value={text} placeholder={placeholder} onKeyDown={onKeyDown}></input>
            <Button text='Calculate' onClick={onCalClick}/>
            <Button text='Clear' onClick={onClear}/>
        </div>
    )
}

export default Textfield