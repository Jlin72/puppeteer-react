import React from "react";
import SearchBar from "./components/searchbar.js";
import Content from "./components/Content.js";
import something from './data.json';

const App = () => {
    return(
        <>
            <SearchBar />
            <Content />
            {/* <h1>Lol</h1>
            {something.fsf1d.u1la1.map(e => {
                return <div dangerouslySetInnerHTML={{__html: e}} />
            })} */}
        </>
    )
}

export default App;