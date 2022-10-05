import React, { useRef, useState, useContext } from 'react';
import {searchBarContext} from './Provider';

const SearchBar = (props) => {
    const inputRef = useRef("");
    const context = useContext(searchBarContext);
    const inputFunctions = {
        onFocus: (e) => {
            console.log(e.target.placeholder);
        },
        onChange: (e) => {
            console.log(e.target.value);
            console.log(`This is the context value ${context.searchTerm}`);
            context.updateContext({
                searchTerm: e.target.value
            })
        }
    }
    return(
        <>
            <form onSubmit={(e) => {e.stopPropagation()}}>
                <input {...inputFunctions} placeholder="Enter searchaaa lol value" ref={inputRef} />
            </form>
        </>
    )
}

export default SearchBar;