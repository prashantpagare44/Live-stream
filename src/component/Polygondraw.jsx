import React, { useState, useRef, useCallback } from "react";
import PolygonRenderer from "./PolygonRenderer.jsx";

const PolygonDrawer = ({ videoHeight }) => {
  const [points, setPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const containerRef = useRef(null);

  const handleStartDraw = () => {
    setPoints([]);
    setIsDrawing(true);
    setIsSaved(false);
  };

  const handleAddPoint = useCallback(
    (event) => {
      if (event.target.closest("button")) return;

      if (!isDrawing) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const isNearStart =
        points.length > 2 &&
        Math.hypot(x - points[0].x, y - points[0].y) < 15;

      if (isNearStart) {
        setIsDrawing(false);
        setIsSaved(true);
      } else {
        setPoints((prev) => [...prev, { x, y }]);
      }
    },
    [isDrawing, points]
  );

  const handleSave = (e) => {
    e.stopPropagation(); 
    if (points.length < 3) {
      alert("Polygon must have at least 3 points.");
      return;
    }
    setIsDrawing(false);
    setIsSaved(true);
    alert("Polygon saved successfully!");
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsDrawing(false);
    setIsSaved(false);
    setPoints([]);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: videoHeight,
        position: "relative",
        border: "1px solid gray",
        background: "linear-gradient(to bottom right, #f0f4ff, #dbeafe)", 
      }}
      onClick={isDrawing ? handleAddPoint : undefined}
    >
      
      <video
        src="/videos/Meme.mp4"
        controls
        autoPlay
        muted
        loop
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      
      <PolygonRenderer
        points={points}
        isDrawing={isDrawing}
        isFinal={!isDrawing && points.length >= 3}
        isSaved={isSaved}
      />

   
      <div className="absolute top-2 left-2 p-2 bg-gray-900/70 rounded flex space-x-2 z-20">
        {!isDrawing && !isSaved ? (
          <button
            onClick={handleStartDraw}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
          >
            Start Draw
          </button>
        ) : (
          <>
            {!isSaved && (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm"
                >
                  Save Polygon
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm"
                >
                  Cancel
                </button>
              </>
            )}
            {isSaved && (
              <button
                onClick={handleStartDraw}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
              >
                Draw New Polygon
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PolygonDrawer;