import React, { useState, useRef, useCallback } from 'react';
import PolygonRenderer from './PolygonRenderer.jsx'; 

const PolygonDrawer = ({ 
    videoWidth, 
    videoHeight, 
    isDrawing, 
    points, 
    onStartDraw, 
    onSave, 
    onCancel, 
    onUpdatePoints 
}) => {
    
    const [currentMousePosition, setCurrentMousePosition] = useState({ x: 0, y: 0 }); 
    const containerRef = useRef(null);

    const handleMouseMove = useCallback((event) => {
        if (isDrawing && containerRef.current) { 
            const rect = containerRef.current.getBoundingClientRect();
            setCurrentMousePosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            });
        }
    }, [isDrawing]);


    const handleAddPoint = useCallback((event) => {
        if (!isDrawing) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top;    

        const isNearStart = points.length > 0 && Math.hypot(x - points[0].x, y - points[0].y) < 15;
        
        if (isNearStart && points.length >= 3) { 
            onSave(points); 
        } else {
            onUpdatePoints([...points, { x, y }]); 
        }
    }, [isDrawing, points, onSave, onUpdatePoints]);

    const handleSaveClick = () => {
        if (points.length < 3) {
            alert("Please define at least 3 points for a valid polygon.");
            return;
        }
        onSave(points); 
    };
    
    return (
        <div 
            ref={containerRef}
            style={{ width: '100%', height: videoHeight, position: 'relative', border: '1px solid gray' }}
            onClick={isDrawing ? handleAddPoint : undefined} 
            onMouseMove={handleMouseMove}
        >
            
            <video 
                src="/videos/Meme.mp4" 
                controls autoPlay muted loop
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: isDrawing ? 'none' : 'auto' }}
            />
            
            <PolygonRenderer 
                points={points} 
                isDrawing={isDrawing} 
                isFinal={!isDrawing && points.length >= 3} 
                currentMousePosition={isDrawing ? currentMousePosition : undefined} 
            />

            
            <div className="absolute top-2 left-2 p-2 bg-gray-900/70 rounded flex space-x-2 z-20">
                {!isDrawing ? (
                    <button onClick={onStartDraw} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm">
                        {points.length > 0 ? 'Edit Polygon' : 'Start Draw'}
                    </button>
                ) : (
                    <>
                        <button onClick={handleSaveClick} className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm">
                            Save Polygon ({points.length} points)
                        </button>
                        <button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm">
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PolygonDrawer;