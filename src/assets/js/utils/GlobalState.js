import React, { useState, createContext } from "react";
import SearchBar from "../components/searchbar";
import Content from "../components/Content";

const searchBarContext = createContext();

const SearchbarProvider = (props) => {
    const contextInformation = {
        searchTerm: "",
        updateContext: (contextUpdates) => {
            setContextInfo((currentContextInfo) => ({...currentContextInfo, ...contextUpdates}));
        }
    };

    const [contextInfo, setContextInfo] = useState(contextInformation);
    return (
        <SearchbarProvider.Provider value={contextInfo}>
            <SearchBar searchTerm={contextInfo} />
            <Content searchTerm={contextInfo} />
        </SearchbarProvider.Provider>
    )
    
}