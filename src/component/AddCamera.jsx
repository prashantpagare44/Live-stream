import React from 'react';

const AddCameraModal = ({ isOpen, onClose }) => {
    
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
             <header className="fixed top-0 left-0 w-full h-14 bg-blue-300 flex items-center px-4  border-b border-gray-700">
                <div className="flex items-center text-xl font-bold">
                   <span className="text-3xl text-red-600 mr-2">📹</span> 
                   <span className="text-white">LiveStream Detect</span>
                 </div>
              </header>
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg border-t-4 border-blue-600">
                
                
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                    <h2 className="text-2xl font-semibold text-white">Add New Camera</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-3xl leading-none">
                        &times; 
                    </button>
                </div>

                <form className="space-y-4 text-white">
                    
                    <div>
                        <input type="text" placeholder="Camera Nickname (e.g., BackyardCam)" 
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                    
                    <div>
                        <input type="text" placeholder="IP Address (e.g., 192.168.1.10)" 
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        
                        <input type="password" placeholder="Password" 
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div className="space-y-3 pt-2">
                 
                        {/* <div className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                            <span>Time Constraint Toggle [ON/OFF]</span>
                            <button type="button" className="text-blue-400 font-medium">Toggle</button>
                        </div>
                    
                        <div className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                            <span>Draw Polygon Interface [Open]</span>
                            <button type="button" className="text-yellow-400 font-medium">Open</button>
                        </div> */}
                    </div>

            
                    <div className="pt-4 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                            Save Camera
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddCameraModal;