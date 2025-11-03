import React, { useState } from 'react';

// DUMMY PROFILE NUMBERS (Real mein Profile component se aayega)
const DUMMY_PROFILE_NUMBERS = [
    { number: '98765 XXXX (Home)', id: 1 },
    { number: '88888 XXXX (Office)', id: 2 },
];

// Weekly schedule ke liye default structure
const DEFAULT_SCHEDULE = {
    start: '00:00',
    end: '23:59',
    enabled: true,
};

const LiveFeedPanel = ({ camera, onBack, onModeSwitch }) => { 
    // State to manage Notification Recipient dropdown
    const [selectedRecipient, setSelectedRecipient] = useState('');
    
    // State to manage WEEKLY TIME CONSTRAINTS
    const [schedule, setSchedule] = useState({
        isGlobalEnabled: false, // Overall ON/OFF switch
        days: {
            MON: DEFAULT_SCHEDULE,
            TUE: DEFAULT_SCHEDULE,
            WED: DEFAULT_SCHEDULE,
            THU: DEFAULT_SCHEDULE,
            FRI: DEFAULT_SCHEDULE,
            SAT: { ...DEFAULT_SCHEDULE, enabled: false }, // Default off
            SUN: { ...DEFAULT_SCHEDULE, enabled: false }, // Default off
        }
    });

    // Handler for Day Toggle
    const toggleDay = (day) => {
        setSchedule(prev => ({
            ...prev,
            days: {
                ...prev.days,
                [day]: { ...prev.days[day], enabled: !prev.days[day].enabled }
            }
        }));
    };
    
    // Handler for Time Input Change (Using MON as generic reference for now)
    const handleTimeChange = (day, field, value) => {
        setSchedule(prev => ({
            ...prev,
            days: {
                ...prev.days,
                [day]: { ...prev.days[day], [field]: value }
            }
        }));
    };

    // Handler for Launch Polygon Editor (Switches view to Live Mode)
    const handleLaunchEditor = () => {
        if (onModeSwitch) {
            onModeSwitch('Live'); 
        }
    };

    // Get the first active day (for displaying time inputs easily)
    const firstActiveDay = Object.keys(schedule.days).find(day => schedule.days[day].enabled) || 'MON';


    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-blue-600 text-white">
            
            {/* Setup Header */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                 <h2 className="text-3xl font-bold text-red-500">{camera.name} - Setup Details</h2>
                 <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1">
                    <span className="text-xl">←</span>
                    <span>Back to Dashboard</span>
                </button>
            </div>
            
            {/* 1. Time Constraint Section (UPGRADED) */}
            <div className="mb-6 p-4 bg-gray-700 rounded-md">
                
                {/* Global Toggle */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-600">
                    <h3 className="text-xl font-semibold">Time Constraint (Weekly)</h3>
                    <button 
                        onClick={() => setSchedule(prev => ({...prev, isGlobalEnabled: !prev.isGlobalEnabled}))}
                        className={`py-1 px-3 rounded text-sm font-semibold ${schedule.isGlobalEnabled ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                        {schedule.isGlobalEnabled ? 'System Enabled' : 'System Disabled'}
                    </button>
                </div>
                
                <p className="text-gray-400 mb-4">Set specific time ranges for detection, day by day.</p>
                
                {/* Day Toggles (SUN-SAT) */}
                <div className="flex justify-between gap-1 mb-6">
                    {Object.keys(schedule.days).map(day => (
                        <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`text-xs font-bold w-full py-2 rounded transition-colors ${
                                schedule.days[day].enabled && schedule.isGlobalEnabled
                                    ? 'bg-red-600 text-white' 
                                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            }`}
                            disabled={!schedule.isGlobalEnabled}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Time Inputs (Generic for Active Days) */}
                <div className={`p-4 rounded-md ${schedule.isGlobalEnabled ? 'bg-gray-800' : 'bg-gray-900/50'}`}>
                    <p className="text-yellow-400 font-semibold mb-3">Time Settings (Example: {firstActiveDay})</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-400">Start Time</label>
                            <input 
                                type="time" 
                                value={schedule.days[firstActiveDay].start}
                                onChange={(e) => handleTimeChange(firstActiveDay, 'start', e.target.value)} 
                                disabled={!schedule.isGlobalEnabled}
                                className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-400">End Time</label>
                            <input 
                                type="time" 
                                value={schedule.days[firstActiveDay].end}
                                onChange={(e) => handleTimeChange(firstActiveDay, 'end', e.target.value)} 
                                disabled={!schedule.isGlobalEnabled}
                                className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-white" 
                            />
                        </div>
                    </div>
                    
                    <p className="text-xs text-red-400 mt-3">Schedules spanning midnight (e.g., 22:00 to 06:00) will be handled by detection service.</p>
                </div>
            </div>
            
            {/* 2. Notification Recipient List */}
            <div className="mb-6 p-4 bg-gray-700 rounded-md">
                <h3 className="text-xl font-semibold mb-3">Notification Recipients</h3>
                
                <label className="block text-sm mb-2">Choose Registered Number (from Profile)</label>
                <select 
                    value={selectedRecipient}
                    onChange={(e) => setSelectedRecipient(e.target.value)}
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-white appearance-none cursor-pointer"
                >
                    <option value="">-- Select a notification number --</option>
                    {DUMMY_PROFILE_NUMBERS.map(num => (
                        <option key={num.id} value={num.id}>{num.number}</option>
                    ))}
                </select>
                <p className="text-xs text-red-400 mt-2">Access Control: Only this number will receive alerts for this camera.</p>
            </div>
            
            <div className="mb-6 p-4 bg-gray-700 rounded-md">
                <h3 className="text-xl font-semibold mb-3">Detection Polygon Area</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                    <p className="text-gray-400 mb-3">Polygon drawing available separately in **PolygonArea.jsx**</p>
                    <p className="text-sm text-yellow-400">Launch Polygon Editor button below.</p>
                    <button 
                        onClick={handleLaunchEditor} 
                        className="mt-3 bg-red-600 hover:bg-red-700 py-2 px-4 rounded font-semibold"
                    >
                        Launch Polygon Editor
                    </button>
                </div>
            </div>

            <div className="flex justify-end border-t border-gray-700 pt-4">
                 <button className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded font-semibold">
                    Save Details
                </button>
            </div>
        </div>
    );
};

export default LiveFeedPanel;