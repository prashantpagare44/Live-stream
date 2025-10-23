import React from 'react'


const Dashboard = ()=>{

    return(
    <>
       <div className="min-h-screen bg-gray-900  ">
        <header className="fixed top-0 left-0 w-full h-14 bg-red-900 flex items-center justify-between px-4 shadow-lg z-20 border-b border-gray-700 ">
                
                <div className="flex items-center text-xl font-bold">
                     <img className="text-3xl text-red-600 mr-2 rounded-full w-12 h-12" src="/Images/image.png" alt="Logo" />
                     <span className="text-white">Smart Detection Panel</span>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700">
                        <span className="text-2xl">🔔</span> 
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700">
                        <span className="text-2xl">👨‍💼</span> 
                    </button>

                </div>
            </header>
            <main className=" flex-1 pt-14 p-4 md:p-6 m-4">
                 <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 m-2">
                    <h1 className="text-2xl font-semibold text-white">Connected camera </h1>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                        <span className="text-2xl">+</span>
                        <span >Add camera </span>
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <p className="text-gray-400 col-span-full">No cameras added yet. Click 'Add Camera Button' to get started.</p>
                 </div>
            </main>
       </div>
    </>
    )

}

export default Dashboard