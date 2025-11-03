import React from 'react'

const Cameracard = ({ camera, onSelect, isSelected })=>{

    const statusColor = camera.status === 'Live' ? 'bg-green-600' : 'bg-red-600'

    const borderStyle = isSelected ? 'border-red-600 border-2' : 'border-gray-700 border';


    
    return(
        <>
          <div className={`p-4 bg-gray-900 rounded-lg shadow-md transition-all cursor-pointer 
                        hover:shadow-red-600/30 hover:scale-[1.02] ${borderStyle}`}>

            <h3 className="text-xl text-white font-medium mb-3 flex justify-between items-center">
                <span>{camera.name}</span>
                
                <span className={`text-xs font-bold py-1 px-2 rounded-full ${statusColor} text-white`}>
                    {camera.status}
                </span>
            </h3>   
            <p className="text-white text-sm mb-4">IP: {camera.ip}</p>
            <div className="flex justify-start space-x-2 text-xs font-semibold mt-2">
                <button 
                    className="text-red-600 hover:text-red-400 whitespace-nowrap"
                    onClick={(e) => { e.stopPropagation(); onSelect(camera.id); }} 
                >
                    ▶ Live View
                </button>
                <button className="text-blue-400 hover:text-blue-300 whitespace-nowrap p-0" 
                         onClick={(e) => { e.stopPropagation(); onSelect(camera.id); }} >
                         ⚙ Setup
               </button>
                <button className="text-yellow-400 hover:text-yellow-300 whitespace-nowrap p-0"
                       onClick={(e) => { e.stopPropagation(); onSelect(camera.id); }} >
                      🔗 Control
               </button>
            </div>
            
            </div>
        </>
    )
}

export default Cameracard