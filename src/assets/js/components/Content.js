import React, { useEffect, useState, useContext} from 'react';
import something from '../data.json';
import { searchBarContext } from './Provider';

const Content = (props) => {
    const data = something;
    const [resultsFound, setResultsFound] = useState(false);
    const [resultsArr, setResultsArr] = useState([]);
    const context = useContext(searchBarContext);
    useEffect(() => {
        context.searchTerm = "lol"
    }, [context])
    return(
        <div>
            {/* {console.log(context.searchTerm)}
            <p>{context.searchTerm}</p>
            {Object.keys(data).map((value, index) => {
                return data[value].map((e, i) => {
                    if(e.includes("Ethics")) {
                        if(resultsFound === false) {
                            setResultsFound(true);
                        }
                        let unitLaNumber = value.split(".")
                        return (
                            <>
                            <p>{`Unit ${unitLaNumber[0]} LA ${unitLaNumber[1]}`}</p>
                            <div dangerouslySetInnerHTML={{__html: e}} key={i} />
                            <hr />
                            </>
                        )
                    }
                })
            })} */}
            {(resultsFound === false) ? <p>No results found</p> : ""}
            {(!context.searchTerm) ? (
                <p>Press on the search bar to start</p>
            ): (
                data.map((element, index) => {
                    return element.content.map((items, i) => {
                        if(items.includes(context.searchTerm)) {
                            return (
                                <>
                                    <p dangerouslySetInnerHTML={{__html: items}} />
                                    <hr />
                                </>
                            )
                        }
                    })
                })
            )}
        </div>
    )
}

export default Content;