

import React from 'react';

export default function PolygonRenderer({ points, isDrawing, isFinal, currentMousePosition }) {
    if (!points || points.length === 0) return null;

    const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

    let tempPointsString = pointsString;
    if (isDrawing && points.length > 0 && currentMousePosition) {
        tempPointsString += ` ${currentMousePosition.x},${currentMousePosition.y}`;
    }

    return (
        <svg 
            width="100%" 
            height="100%" 
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                pointerEvents: 'none', 
                zIndex: isDrawing ? 10 : 9 
            }}
        >
            <polygon 
                points={tempPointsString} 
                stroke={isFinal ? "green" : "yellow"} 
                strokeWidth={isFinal ? "4" : "3"} 
                fill={isFinal ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 255, 0, 0.1)"}
            />

            {points.map((p, index) => (
                <circle 
                    key={index} 
                    cx={p.x} 
                    cy={p.y} 
                    r="5" 
                    fill={isDrawing ? "red" : "green"} 
                    stroke="white" 
                    strokeWidth="2" 
                />
            ))}
        </svg>
    );
}