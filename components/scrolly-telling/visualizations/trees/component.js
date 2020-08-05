import React, { useState, useRef, useEffect } from 'react';

let ForceGraph2D;
if (typeof window !== 'undefined') {
  /* eslint-disable */
  ForceGraph2D = require('react-force-graph-2d').default;
  /* eslint-enable */
}

function Trees(props) {
    const { data, width, height } = props;
    const generatedNodes = data => 
        data.map((value, i) => {
            const img = new Image();
            img.src = `static/images/scrolly-telling/${value ? 'tree.png' : 'ghost-tree.png'}`;
            return {
                id: i,
                img
            };
    });
    const [graphData, setGraphData] = useState({ 
        nodes: generatedNodes(data), 
        links: [] 
    });
    const graphRef = useRef(null);
    const isClient = typeof window !== 'undefined';

    useEffect(() => {
        setGraphData({ 
            nodes: generatedNodes(data), 
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
                    nodeCanvasObject={({ img, x, y }, ctx) => {
                        const size = 12;
                        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
                      }}
                />
            }
        </div>
    );
}

export default Trees;