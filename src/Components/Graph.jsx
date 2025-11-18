import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// Using example from week 12

// Convert log string to a numeric 
function LogToNum(input) {
    if (!input) return 0;

    if (Array.isArray(input)) {
        input = input[input.length - 1];
    }

    // Check for if it isnt a string
    if (typeof input !== 'string') return 0;

    const match = input.match(/gain:([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
}

export default function D3Graph() {

    const [rngArray, setRngArray] = useState([]);
    const maxItems = 50;

    useEffect(() => {
        const handleD3Data = (event) => {
            const value = LogToNum(event.detail);

            setRngArray(prev => {
                const newArray = [...prev, value];
                if (newArray.length > maxItems) {
                    newArray.shift();
                }
                return newArray;
            });
        };

        document.addEventListener("d3Data", handleD3Data);
        return () => document.removeEventListener("d3Data", handleD3Data);

    }, []);

    // D3 Graph 
    useEffect(() => {
        const svg = d3.select('#gain-svg');
        svg.selectAll("*").remove();

        const width = svg.node().getBoundingClientRect().width - 40;
        const height = svg.node().getBoundingClientRect().height - 25;
        const barWidth = width / (rngArray.length || 1);

        const yScale = d3.scaleLinear()
            .domain([0, 3])
            .range([height, 0]);

        const chartGroup = svg.append('g')
            .attr('transform', 'translate(30,3)');


        // Convert Line from green to red

        const defs = svg.append("defs");

        const gradient = defs.append("linearGradient")
            .attr("id", "gainGradient")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "0%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "limegreen");

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "red");


        // Draw line

        if (rngArray.length > 0) {
            chartGroup.append('path')
                .datum(rngArray)
                .attr('fill', 'none')
                .attr('stroke', 'url(#gainGradient)')
                .attr('stroke-width', 2)
                .attr('d', d3.line()
                    .x((d, i) => i * barWidth)
                    .y(d => yScale(d))
                );
        }


        // Y-Axis

        const yAxis = d3.axisLeft(yScale);
        chartGroup.append('g').call(yAxis);

    }, [rngArray]);

    return (
        <div className="section-box">
            <h4 className="section-title">Gain Visualisation</h4>
            <svg
                id="gain-svg"
                width="100%"
                height="300px"
                style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}
            ></svg>
        </div>
    );
}
