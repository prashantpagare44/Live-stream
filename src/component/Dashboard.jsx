import React ,{useState} from 'react';
import CameraCard from './Cameracard.jsx';
import LiveFeedPanel from './LiveFeedpanel.jsx'; 
import AddCameraModal from './AddCamera.jsx';
import Notification from './Notification.jsx';
import Profile from './Profile.jsx'; 
import PolygonDrawer from './Polygondraw.jsx';

const DUMMY_CAMERAS = [
    { id: 'cam-001', name: "LivingRoomCam", status: "Live", ip: "192.168.0.101" },
    { id: 'cam-002', name: "GarageCam", status: "Offline", ip: "192.168.0.102" },
    { id: 'cam-003', name: "BackyardCam", status: "Live", ip: "192.168.0.103" },
    { id: 'cam-004', name: "FrontDoorCam", status: "Live", ip: "192.168.0.104" },
];

const Dashboard = ()=>{
    
    const [cameras , setCameras] = useState(DUMMY_CAMERAS);
    const [selectedCameraId, setSelectedCameraId] = useState(null);
    const [isAddCamera, setIsAddCamera] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeCameraId, setActiveCameraId] = useState('cam-001'); 
    const [currentViewMode, setCurrentViewMode] = useState(null); 
    
    const [isPolygonDrawing, setIsPolygonDrawing] = useState(false); 
    const [polygonPoints, setPolygonPoints] = useState([]); 

    const handleCameraselect = (id, mode) => { 
        setSelectedCameraId(id);
        setCurrentViewMode(mode); 
        setIsPolygonDrawing(false); 
    }
    const selectedCamera = cameras.find(cam => cam.id === selectedCameraId);

    const handleAddCamera = (newCamera) => {
        setCameras(prevCameras => [
            ...prevCameras, 
            newCamera      
        ]);
    };

    const handleActivation = (id, status) => {
        if (status === 'Activate') {
            setActiveCameraId(id);
            alert(`Camera ${id} Activated!`);
        } else {
            setActiveCameraId(null); 
            alert(`Camera ${id} Deactivated!`);
        }
    };
    
    const isCameraActive = (id) => activeCameraId === id;
    
    const handleStartDraw = () => {
        setPolygonPoints([]);
        setIsPolygonDrawing(true);
    };

    const handleSavePolygon = (points) => {
        setPolygonPoints(points); 
        setIsPolygonDrawing(false);
        console.log("Saving Final Polygon:", points);
        alert("Polygon Saved! (Backend Integration Pending)");
    };

    const handleCancelDraw = () => {
        setIsPolygonDrawing(false);
    };


    if (isProfileOpen) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <Profile onBack={() => setIsProfileOpen(false)} /> 
            </div>
        );
    }

    return(
        <>
            <div className="min-h-screen bg-gray-900">
                <header className="fixed top-0 left-0 w-full h-14 bg-blue-300 flex items-center justify-between px-4 shadow-lg z-20 border-b border-gray-700 ">
                    <div className="flex items-center text-xl font-bold">
                        <span className="text-3xl text-red-600 mr-2">📹</span> 
                        <span className="text-white">Smart Detection Panel</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsNotification(!isNotification)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700">
                            <span className="text-2xl">🔔</span> 
                        </button>
                        <button onClick={() => setIsProfileOpen(true)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700">
                            <span className="text-2xl">👨‍💼</span> 
                        </button>
                    </div>
                </header>
                
                <main className="flex-1 pt-14 p-4 md:p-6 m-2"> 
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="lg:col-span-1">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                                
                                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                                    <h2 className="text-2xl font-semibold text-white">Connected Cameras</h2>
                                    <button onClick={() => setIsAddCamera(true)} className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap">
                                        <span className="text-xl">+</span> 
                                        <span>Add camera</span>
                                    </button>
                                </div>

                                {cameras.length === 0 ? (
                                    <p className="text-gray-400 text-lg">No cameras added yet.</p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-6">
                                        {cameras.map(camera => (
                                            <CameraCard 
                                                key={camera.id}
                                                camera={camera}
                                                onSelect={handleCameraselect} 
                                                isSelected={selectedCameraId === camera.id} 
                                                isCameraActive={isCameraActive} 
                                                onActivate={handleActivation}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            {selectedCamera ? (
                                <>
                                    {currentViewMode === 'Live' && (
                                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-red-600 mb-6">
                                            <h2 className="text-3xl font-bold mb-4 text-red-500">{selectedCamera.name} - Live Stream</h2>
                                            
                                            <PolygonDrawer
                                                videoWidth="100%"
                                                videoHeight="450px"
                                                
                                                isDrawing={isPolygonDrawing}
                                                points={polygonPoints}
                                                onStartDraw={handleStartDraw}
                                                onSave={handleSavePolygon}
                                                onCancel={handleCancelDraw}
                                                onUpdatePoints={setPolygonPoints} 
                                            />
                                        </div>
                                    )}

                                    {currentViewMode === 'Setup' && (
                                        <LiveFeedPanel 
                                            camera={selectedCamera} 
                                            onBack={() => setSelectedCameraId(null)} 
                                            onModeSwitch={(mode) => handleCameraselect(selectedCameraId, mode)} 
                                        />
                                    )}
                                    
                                    {currentViewMode && (
                                        <button 
                                            onClick={() => handleCameraselect(selectedCamera.id, currentViewMode === 'Live' ? 'Setup' : 'Live')} 
                                            className="w-full text-center py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                                        >
                                            Switch to {currentViewMode === 'Live' ? '⚙ Setup Panel' : '▶ Live Stream'}
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="p-6 text-gray-400 text-center border border-dashed border-gray-700 rounded-lg h-full">
                                    <p className="mt-20 text-lg">Select a camera to view its details or setup its detection.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
                
                {selectedCamera && (
                    <div className="fixed bottom-0 right-0 p-4 bg-gray-900 border-t border-gray-700 w-full lg:w-96 shadow-2xl z-30">
                        <div className="flex justify-between items-center">
                            <h4 className="text-white font-semibold text-lg">{selectedCamera.name} Status:</h4>
                            
                            {isCameraActive(selectedCamera.id) ? (
                                <button 
                                    onClick={() => handleActivation(selectedCamera.id, 'Deactivate')}
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-bold"
                                >
                                    Deactivate
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleActivation(selectedCamera.id, 'Activate')}
                                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-bold"
                                >
                                    Activate
                                </button>
                            )}
                        </div>
                    </div>
                )}
                
                <AddCameraModal
                    isOpen={isAddCamera}
                    onClose={() => setIsAddCamera(false)}
                    onSave={handleAddCamera} 
                />
                <Notification
                    isOpen={isNotification}
                    onClose={() => setIsNotification(false)}
                />
            </div>
        </>
    );
}

export default Dashboard;