import React from 'react';
import * as d3 from "d3";

function Trees(props) {
    const { data, width, height } = props;

    console.log('d3', d3);

    // const force = d3.layout.force()
    //     .nodes(data)
    //     .links([])
    //     .size([width, height]);


    return (
        <div className="trees-visualization">
            <svg width={width} height={height}>
                <g>
                </g>
            </svg>
        </div>
    );
}

export default Trees;