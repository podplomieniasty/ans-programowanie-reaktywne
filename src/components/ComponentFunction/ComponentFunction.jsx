import React, {Component} from 'react';
import { useState } from 'react';

const ComponentFunction = (props) => {

    const [value, setValue] = useState(0);
    return(
        <div>
            <p>{value}</p>
            <button
                className="btn btn-secondary btn-sm"
                onClick={() => setValue(1)}>
                Set Value
                </button>
        </div>
    );
}

export default ComponentFunction;