
const LiveFeedPanel = ({ camera , onBack }) => {
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
                    <button className="text-blue-400 hover:text-blue-300 font-medium">Toggle [ON/OFF]</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                    <span className="text-gray-200">Detection Polygon Mode: Enable/Disable</span>
                    <button className="text-yellow-400 hover:text-yellow-300 font-medium">View / Edit Area</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-md">
                    <span className="text-gray-200">Notification: Toggle ON/OFF</span>
                    <button className="text-green-400 hover:text-green-300 font-medium">Toggle</button>
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