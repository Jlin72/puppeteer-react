import React from "react";
import { useState, createContext } from "react";
import Announcer from "./Announcer";

export const searchBarContext = createContext();

export default function provider(props) {
	const contextInformation = {
		searchTerm: "",

		updateContext: (contextUpdates) => {
			setContextInfo((currentContextInfo) => ({ ...currentContextInfo, ...contextUpdates }));
		},
	};

	const [contextInfo, setContextInfo] = useState(contextInformation);
	return (
		<searchBarContext.Provider value={contextInfo}>
            {props.children}
		</searchBarContext.Provider>
	);
}
