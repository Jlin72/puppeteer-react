import React from "react";
import { useState, createContext } from "react";

export const searchBarContext = createContext();

export default function Provider(props) {
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
