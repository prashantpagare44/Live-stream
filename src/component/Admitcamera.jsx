import React, { useState } from 'react'; 

const AddCameraModal = ({ isOpen, onClose, onSave }) => { 
    
    
    const [nickname, setNickname] = useState('');
    const [ipAddress, setIpAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    if (!isOpen) return null; 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        const newCamera = {
            id: `cam-${Date.now()}`, 
            name: nickname,
            status: 'Live', 
            ip: ipAddress,
        };
        
        onSave(newCamera); 
        
        setNickname('');
        setIpAddress('');
        setUsername('');
        setPassword('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
           
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg border-t-4 border-blue-600">
                
                <form onSubmit={handleSubmit} className="space-y-4 text-white">
                    
                    <div>
                        <input type="text" placeholder="Camera Nickname (e.g., BackyardCam)" 
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
                    </div>
                    
                    <div>
                        <input type="text" placeholder="IP Address (e.g., 192.168.1.10)" 
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
                        <input type="password" placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:border-blue-500 focus:outline-none" />
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