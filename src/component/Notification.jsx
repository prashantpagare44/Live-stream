import React,{useState} from 'react';

const DUMMY_ALERTS = [
    { id: 1, type: 'Motion Detected', camera: 'LivingRoomCam', time: '10:30 AM', color: 'bg-red-900/40' },
    { id: 2, type: 'Camera Offline', camera: 'GarageCam', time: '10:35 AM', color: 'bg-yellow-900/40' },
    { id: 3, type: 'Motion Detected', camera: 'BackyardCam', time: 'Yesterday', color: 'bg-red-900/40' },
];

const Notification = ({ isOpen, onClose }) => {

    const [alerts, setAlerts] = useState(DUMMY_ALERTS);
    const [isAlertsEnabled, setIsAlertsEnabled] = useState(true);

    const handleToggle = () => {
        setIsAlertsEnabled(prev => !prev);
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear all notifications?")) {
            setAlerts([]); 
        }
    };

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
              <button 
                onClick={handleToggle} 
                className={`font-medium ${isAlertsEnabled ? 'text-green-400' : 'text-red-400'} hover:text-white`}>
                {isAlertsEnabled ? 'Toggle [ON]' : 'Toggle [OFF]'} {/* <--- Dynamic Text */}
            </button>                
            </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 pt-3">
            {alerts.length === 0 ? (
                <p className="text-gray-500 text-center mt-5">No new notifications.</p>
            ) : (
               
                alerts.map(alert => (
                    <div key={alert.id} className={`p-3 rounded text-sm ${alert.color} border border-gray-700`}>
                        <p className="font-semibold text-white">{alert.type}</p>
                        <p className="text-xs text-gray-300">
                            {alert.camera} - {alert.time}
                        </p>
                    </div>
                ))
            )}
            
            {alerts.length > 0 && (
                <button 
                    onClick={handleClearAll} 
                    className="w-full text-center text-red-400 mt-4 text-sm hover:text-red-300 font-semibold"
                >
                    Clear All
                </button>
            )}
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