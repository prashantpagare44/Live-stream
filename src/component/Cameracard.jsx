import React from 'react';

const Cameracard = ({ camera, onSelect, isSelected, isCameraActive, onActivate }) => { 
    
    const borderStyle = isSelected ? 'border-red-600 border-2' : 'border-gray-700 border';
    const isActive = isCameraActive(camera.id); 

    return (
        <div 
            className={`p-4 bg-gray-900 rounded-lg shadow-md transition-all cursor-pointer ${borderStyle}`}
            onClick={(e) => onSelect(camera.id, 'Live')} n
        >
            <h3 className="text-xl text-white font-medium mb-3 flex justify-between items-center">
                <span>{camera.name}</span>
              
                <span className={`text-xs font-bold py-1 px-2 rounded-full ${isActive ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    {isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
            </h3> 
            <p className="text-white text-sm mb-4">IP: {camera.ip}</p>
            
           
            <div className="flex justify-between items-center border-t border-gray-700 pt-3 mt-3">
                
                
                <div className="flex space-x-2 text-xs font-semibold">
                   
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelect(camera.id, 'Live'); }} 
                        className="text-red-600 hover:text-red-400"
                    >
                        ▶ Live View
                    </button>
                    
                    <button 
                        onClick={(e) => { e.stopPropagation(); onSelect(camera.id, 'Setup'); }} 
                        className="text-blue-400 hover:text-blue-300"
                    >
                        ⚙ Setup
                    </button>
                </div>

               
                {isActive ? (
                    <button 
                       
                        onClick={(e) => { e.stopPropagation(); onActivate(camera.id, 'Deactivate'); }}
                        className="bg-red-700 hover:bg-red-800 text-white py-1 px-2 rounded text-xs font-bold"
                    >
                        Deactivate
                    </button>
                ) : (
                    <button 
                        
                        onClick={(e) => { e.stopPropagation(); onActivate(camera.id, 'Activate'); }}
                        className="bg-green-700 hover:bg-green-800 text-white py-1 px-2 rounded text-xs font-bold"
                    >
                        Activate
                    </button>
                )}
            </div>
        </div>
    );
}

export default Cameracard;