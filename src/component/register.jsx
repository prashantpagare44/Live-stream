import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [mobileInput, setMobileInput] = useState(""); 
    const [mobileNameInput, setMobileNameInput] = useState(""); 
    const [mobileNumbers, setMobileNumbers] = useState([]); 

    // Helper function to safely read from localStorage
    const getStoredUsers = () => {
        try {
            const storedUsers = localStorage.getItem("users");
            return JSON.parse(storedUsers) || [];
        } catch (error) {
            console.warn("Security Warning: Cannot access localStorage.");
            return [];
        }
    };

    // Helper function to safely write to localStorage
    const setStoredUsers = (users) => {
        try {
            localStorage.setItem("users", JSON.stringify(users));
            return true;
        } catch (error) {
            console.error("Failed to write to localStorage:", error);
            return false;
        }
    };

    // Add mobile number with name
    const addMobileNumber = () => {
        if (!mobileInput || !mobileNameInput) {
            alert("Enter mobile number and name!");
            return;
        }

        setMobileNumbers([
            ...mobileNumbers,
            { number: mobileInput, name: mobileNameInput },
        ]);
        setMobileInput("");
        setMobileNameInput("");
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError(""); 

        // 1. Validation Logic
        if (!email || !password || !confirmPassword) {
            setError("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (mobileNumbers.length === 0) {
            setError("Add at least one mobile number!");
            return;
        }

        // 2. Save user
        const users = getStoredUsers();
        users.push({ email, password, mobileNumbers });
        
        const saveSuccess = setStoredUsers(users);

        if (saveSuccess) {
            alert("Registration Successful! Please log in.");
            navigate("/login");
        } else {
            // --- FIX: Redirect bhi add kiya gaya hai ---
            alert("Registration complete, but data could not be saved due to browser restrictions.");
            navigate("/login"); // Redirect user even if save failed
            // ------------------------------------------
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900">
            {/* --- HEADER: Consistent Dark Theme --- */}
            <header className="fixed top-0 left-0 w-full h-14 bg-blue-300 flex items-center px-4 shadow-lg z-20 border-b border-gray-700">
                <div className="flex items-center text-xl font-bold">
                    <span className="text-3xl text-red-600 mr-2">📹</span> 
                    <span className="text-white">LiveStream Detect</span>
                </div>
            </header>
            
            <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-[420px] mt-24 transition-all duration-300 hover:scale-[1.01] border-t-4 border-red-600">
                {/* --- HEADING: Consistent Red Accent --- */}
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
                    REGISTER NEW ACCOUNT
                </h2>

                <form onSubmit={handleRegister}>
                    {/* INPUTS: Consistent Red Focus Ring */}
                    <label className="text-gray-300 block mb-2 font-medium"> Email ID:</label>
                    <input
                        type="email"
                        className="w-full border border-gray-600 bg-gray-700 text-white rounded-md p-3 mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Add Mobile Button (BLUE/Primary Action) */}
                    <label className="block mb-2 font-medium text-gray-300"> Add Notification Number:</label>
                    <div className="flex gap-3 mb-3 text-white">
                        <input type="text" className="w-1/3 border border-gray-600 bg-gray-700 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Name" value={mobileNameInput} onChange={(e) => setMobileNameInput(e.target.value)} />
                        <input type="text" className="text-white w-2/3 border border-gray-600 bg-gray-700 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Enter mobile number" value={mobileInput} onChange={(e) => setMobileInput(e.target.value)} />
                    </div>
                    <button
                        type="button"
                        onClick={addMobileNumber}
                        className="text-white transition-all duration-300 hover:scale-[1.02] mb-4 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded font-semibold text-sm"
                    >
                        + Add Mobile
                    </button>

                    {/* Display added mobile numbers */}
                    {mobileNumbers.length > 0 && (
                        <div className="mb-4 text-gray-300 border border-gray-700 p-3 rounded">
                            <h3 className="font-medium mb-1 text-red-500">Registered Numbers:</h3>
                            <ul className="list-disc pl-5 text-sm">
                                {mobileNumbers.map((m, idx) => (<li key={idx}>**{m.number}** ({m.name})</li>))}
                            </ul>
                        </div>
                    )}

                    {/* Password Fields */}
                    <label className="block mb-2 font-medium text-gray-300"> Create Password:</label>
                    <input type="password" className="w-full border border-gray-600 bg-gray-700 rounded-md p-3 mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none text-white" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label className="text-gray-300 block mb-2 font-medium"> Confirm Password:</label>
                    <input type="password" className="text-white w-full border border-gray-600 bg-gray-700 rounded-md p-3 mb-4 focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {error && (<p className="text-red-500 text-sm mb-4 text-center font-semibold">{error}</p>)}

                    <button
                        type="submit"
                        // Primary Action Button (BLUE)
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-[1.02] w-full text-white py-3 rounded-lg font-semibold"
                    >
                        REGISTER ACCOUNT
                    </button>
                </form>

                <button
                    onClick={() => navigate("/login")}
                    className="text-red-500 hover:text-red-400 mt-4 hover:underline w-full text-center block text-sm"
                >
                    ← Back to Login
                </button>
            </div>
        </div>
    );
};

export default Register;