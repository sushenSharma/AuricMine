import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const WordGraph = ({ words }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear SVG content before redrawing

    const { width, height } = ref.current.getBoundingClientRect();

    // Create a scale for the font size
    const fontSizeScale = d3
      .scaleSqrt()
      .domain([0, d3.max(words, (d) => d.weight)])
      .range([12, 40]);

    // Initialize the nodes for the simulation
    const nodes = words.map((word) => ({
      ...word,
      x: Math.random() * width,
      y: Math.random() * height,
      radius: fontSizeScale(word.weight),
    }));

    // Create the force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.radius)
      )
      .on("tick", ticked);

    function ticked() {
      const u = svg
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text((d) => d.text)
        .style("font-size", (d) => `${fontSizeScale(d.weight)}px`)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central");
    }

    return () => {
      simulation.stop(); // Stop simulation when component unmounts
    };
  }, [words]); // Redraw when words change

  return <svg ref={ref} style={{ width: "100%", height: "100%" }}></svg>;
};

export default WordGraph;
