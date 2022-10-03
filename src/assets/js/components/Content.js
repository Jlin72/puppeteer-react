import React, { useEffect, useState, useContext} from 'react';
import something from '../data.json';

const Content = (props) => {
    const data = something.bat4m;
    const [resultsFound, setResultsFound] = useState(false);
    const [resultsArr, setResultsArr] = useState([]);
    return(
        <div>
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
            })}
            {(resultsFound === false) ? <p>No results found</p> : ""}
            <p>Something</p>
        </div>
    )
}

export default Content;