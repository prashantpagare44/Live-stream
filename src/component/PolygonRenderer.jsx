import React from "react";

export default function PolygonRenderer({ points, isDrawing, isFinal, isSaved }) {
  if (!points || points.length === 0) return null;

const pointsString = points.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <svg
    width="100%"
    height="100%"
    style={{ 
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
    }} 
>
      <polygon
        points={pointsString}
        stroke={isSaved ? "lime" : isFinal ? "yellow" : "red"}
        strokeWidth="3"
        fill={
          isSaved
            ? "rgba(0,255,0,0.25)"
            : isFinal
            ? "rgba(255,255,0,0.15)"
            : "rgba(255,0,0,0.1)"
        }
      />

      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="5"
          fill={isSaved ? "green" : "red"}
          stroke="white"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}