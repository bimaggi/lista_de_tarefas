import React, { useState } from 'react';

function Form(props){
    const [text,setText]=useState('')

    function handleChange(e){
        let t = e.target.value
        setText(t)
    }
    function addItem(e){
        e.preventDefault()
        if(text){
            props.onAddItem(text)
            setText('')
        }
    }
    return(
    <>
    <form className="outro">
        <input type="text" value={text} onChange={handleChange}/>
        <button onClick={addItem}>Add</button>
    </form>
    
    </>
    )
}
export default Form