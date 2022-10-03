import React, { useRef, useState } from 'react';

const SearchBar = (props) => {
    const inputRef = useRef("")
    const inputFunctions = {
        onFocus: (e) => {
            console.log(e.target.placeholder);
        },
        onChange: (e) => {
            console.log(e.target.value)
        }
    }
    return(
        <>
            <form onSubmit={(e) => {e.stopPropagation()}}>
                <input {...inputFunctions} placeholder="Enter search value" ref={inputRef} />
            </form>
        </>
    )
}

export default SearchBar;