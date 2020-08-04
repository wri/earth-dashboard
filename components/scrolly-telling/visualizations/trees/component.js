import React, { useState, useRef, useEffect } from 'react';

let ForceGraph2D;
if (typeof window !== 'undefined') {
  /* eslint-disable */
  ForceGraph2D = require('react-force-graph-2d').default;
  /* eslint-enable */
}

function Trees(props) {
    const { data, width, height } = props;
    const [graphData, setGraphData] = useState({ 
        nodes: data.map((value, i) => ({
            id: i,
            color: value ? 'green' : 'grey'
        })), 
        links: [] 
    });
    const graphRef = useRef(null);
    const isClient = typeof window !== 'undefined';


    useEffect(() => {
        setGraphData({ 
            nodes: data.map((value, i) => ({
                id: i,
                color: value ? 'green' : 'grey'
            })), 
            links: [] 
        });
    }, [data]);

    return (
        <div className="trees-visualization">
            {isClient &&
                <ForceGraph2D 
                    ref={graphRef}
                    graphData={graphData}
                    width={width}
                    height={height}
                    cooldownTime={5000}
                    d3AlphaDecay={0.5}
                    d3VelocityDecay={0.3}
                />
            }
        </div>
    );
}

export default Trees;