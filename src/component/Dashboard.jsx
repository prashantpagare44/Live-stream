import React ,{useState} from 'react'
import CameraCard from './Cameracard.jsx'
import LiveFeedPanel from './LiveFeedpanel.jsx'
import AddCameraModal from './AddCamera.jsx'
import Notification from './Notification.jsx'
import Profile from './Profile.jsx'
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

const handleCameraselect = (id)=>{
   setSelectedCameraId(id);
   console.log(`Camera Selected: ${id}`)
}
const selectedCamera = cameras.find(cam => cam.id === selectedCameraId);

const handleAddCamera = (newCamera) => {
   
    setCameras(prevCameras => [
        ...prevCameras, 
        newCamera      
    ]);
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
       <div className="min-h-screen bg-gray-900  ">
        <header className="fixed top-0 left-0 w-full h-14 bg-blue-300 flex items-center justify-between px-4 shadow-lg z-20 border-b border-gray-700 ">
                
                <div className="flex items-center text-xl font-bold">
                     <img className="text-3xl text-red-600 mr-2 rounded-full w-12 h-12" src="/Images/image.png" alt="Logo" />
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
            <main className="flex-1 pt-14 p-4 md:p-6  m-2"> 
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className={`${selectedCamera ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                            
                            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                                <h2 className="text-2xl font-semibold text-white">Connected Cameras</h2>
                                <button onClick={() => setIsAddCamera(true)} className="flex items-center m-4 space-x-2 px-2 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap">
                                    <span className="text-xl">+</span> 
                                    <span>Add camera</span>
                                </button>
                            </div>

                          {cameras.length === 0 ? (
                                <p className="text-gray-400 text-lg">No cameras added yet. Click 'Add camera' to get started.</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-6">
                                    {cameras.map(camera => (
                                        <CameraCard 
                                            key={camera.id}
                                            camera={camera}
                                            onSelect={handleCameraselect}
                                            isSelected={selectedCameraId === camera.id}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedCamera ? (
                        <div className="lg:col-span-2">
                            <LiveFeedPanel 
                                camera={selectedCamera} 
                                onBack={() => setSelectedCameraId(null)} 
                            />
                        </div>
                    ) : (
                        <div className="min-w-2xl lg:col-span-2 hidden lg:block p-6 text-gray-400 text-center border border-dashed border-gray-700 rounded-lg">
                            <p className="mt-20 text-lg">Select a camera from the list to view the live feed and controls.</p>
                        </div>
                    )}
                </div>
            </main>
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
    )

}

export default Dashboard