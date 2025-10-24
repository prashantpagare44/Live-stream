import React from 'react';

const DUMMY_ALERTS = [
    { id: 1, type: 'Motion Detected', camera: 'LivingRoomCam', time: '10:30 AM', color: 'bg-red-900/40' },
    { id: 2, type: 'Camera Offline', camera: 'GarageCam', time: '10:35 AM', color: 'bg-yellow-900/40' },
    { id: 3, type: 'Motion Detected', camera: 'BackyardCam', time: 'Yesterday', color: 'bg-red-900/40' },
];

const Notification = ({ isOpen, onClose }) => {
    const panelClasses = `fixed top-0 right-0 w-80 h-full bg-gray-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out
                          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;

    return (
        <div className={panelClasses}>
            
            <div className="p-6 h-full flex flex-col">
                
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-white">Notifications</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
                        &times; Close
                    </button>
                </div>

                <div className="flex justify-between items-center my-3 p-2 bg-gray-700 rounded-md">
                    <span className="text-gray-200">Alerts: Toggle ON/OFF</span>
                    <button className="text-green-400 hover:text-green-300 font-medium">Toggle</button>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 pt-3">
                    {DUMMY_ALERTS.map(alert => (
                        <div key={alert.id} className={`p-3 rounded text-sm ${alert.color} border border-gray-700`}>
                            <p className="font-semibold text-white">{alert.type}</p>
                            <p className="text-xs text-gray-300">
                                {alert.camera} - {alert.time}
                            </p>
                        </div>
                    ))}
                    <button className="w-full text-center text-blue-400 mt-4 text-sm hover:text-blue-300">
                        Clear All
                    </button>
                </div>

                <div className="mt-4 border-t border-gray-700 pt-4 text-center">
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 flex items-center justify-center space-x-1 w-full">
                        <span>← Back to Dashboard</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;