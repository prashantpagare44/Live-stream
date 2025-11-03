import React, { useState } from 'react';

const LiveFeedPanel = ({ camera , onBack }) => {
    const [isTimeConstraintEnabled, setIsTimeConstraintEnabled] = useState(false);
    const [isPolygonModeEnabled, setIsPolygonModeEnabled] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

    const toggleState = (setter) => {
        setter(prev => !prev);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-red-600">
            
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                <h2 className="text-3xl font-bold text-red-600">{camera.name}</h2>
                <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                    <span className="text-xl">←</span>
                    <span>Back to Dashboard</span>
                </button>
            </div>

            <div className="w-full bg-gray-900 h-96 flex flex-col items-center justify-center rounded-lg mb-6 border border-gray-700">
                <p className="text-gray-500 text-lg">LIVE VIDEO STREAM ({camera.status})</p>
            </div>

            <h3 className="text-xl font-semibold mb-3">Detection and Stream Controls</h3>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                    <span className="text-gray-200">Time Constraint: Set Time Range</span>
             <button onClick={() => toggleState(setIsTimeConstraintEnabled)} 
            className=  {`font-medium ${isTimeConstraintEnabled ? 'text-green-400 hover:text-green-300' : 'text-blue-400  hover:text-blue-300'}`}>
            {isTimeConstraintEnabled ? 'ON' : 'OFF'}</button>
        </div>
         <div className="flex justify-between items-center p-3 rounded-md transition-colors 
                    ${isPolygonModeEnabled ? 'bg-green-800/50' : 'bg-gray-700'}">
                    <span className="text-gray-200">Detection Polygon Mode: Enable/Disable</span>
        <button 
            onClick={() => toggleState(setIsPolygonModeEnabled)} 
            className={`font-medium ${isPolygonModeEnabled ? 'text-green-400 hover:text-green-300' : 'text-yellow-400 hover:text-yellow-300'}`}>
            
            
            {isPolygonModeEnabled ? 'ENABLED' : ' DISABLED'}
        </button>                </div>
               <div className="flex justify-between items-center p-3 rounded-md transition-colors 
                               ${isNotificationEnabled ? 'bg-green-800/50' : 'bg-gray-700'}">
                    <span className="text-gray-200">Notification: Toggle ON/OFF</span>
<button onClick={() => toggleState(setIsNotificationEnabled)} 
            className={`font-medium ${isNotificationEnabled ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`}>
            
{isNotificationEnabled ? 'ON' : 'OFF'}
        </button>               
         </div>
            </div>

            <div className="mt-6 text-center">
                 <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors">
                    Send to Control Panel
                </button>
            </div>
        </div>
    );
};

export default LiveFeedPanel;