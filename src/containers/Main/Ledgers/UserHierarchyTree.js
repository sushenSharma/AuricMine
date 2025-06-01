import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";

const containerStyles = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#fff", // 👈 white background for visibility
  padding: "20px",
};

const treeData = {
  name: "Chief Mining Partner",
  attributes: { role: "oversee a national network" },
  children: [
    {
      name: "Senior Mine Director",
      attributes: { role: "Executive manager of regions" },
      children: [
        {
          name: "Ore Syndicate Head",
          attributes: { role: "Controls multiple mine sites" },
        },
        {
          name: "Ore Syndicate Head",
          attributes: { role: "Leads teams selling mine bonds" },
        },
      ],
    },
    {
      name: "Field Excavation Officer",
      attributes: { role: "Builds regional bond distribution" },
    },
  ],
};

export default function UserHierarchyTree() {
  const treeRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const dimensions = treeRef.current.getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2,
      y: 100,
    });
  }, []);

  return (
    <div style={containerStyles} ref={treeRef}>
      <Tree
        data={treeData}
        translate={translate}
        orientation="vertical"
        pathFunc="step" // 👈 cleaner node connections
        zoomable
        zoom={0.7} // 👈 auto zoom out for large trees
        nodeSize={{ x: 400, y: 250 }}
        separation={{ siblings: 2.5, nonSiblings: 3 }}
        styles={{
          links: {
            stroke: "#ccc",
            strokeWidth: 2,
          },
          nodes: {
            node: {
              circle: {
                fill: "#4CAF50",
                r: 50,
              },
              name: {
                fontSize: "16px",
                fontWeight: "bold",
                fill: "#333",
              },
              attributes: {
                fontSize: "12px",
                fill: "#555",
              },
            },
            leafNode: {
              circle: {
                fill: "#2196F3",
                r: 18,
              },
              name: {
                fontSize: "14px",
                fontWeight: "bold",
                fill: "#333",
              },
              attributes: {
                fontSize: "12px",
                fill: "#555",
              },
            },
          },
        }}
      />
    </div>
  );
}
