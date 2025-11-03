import React, { useState, useEffect } from "react";

const Profile = ({ onBack }) => { // onBack prop yahaan receive hoga
    const [user, setUser] = useState(null);
    const [mobileInput, setMobileInput] = useState("");
    const [mobileNameInput, setMobileNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

   
    const getStoredUsers = () => {
        try {
            const storedUsers = localStorage.getItem("users");
            return JSON.parse(storedUsers) || [];
        } catch (error) {
            console.error("Profile: Could not access localStorage.", error);
            return [];
        }
    };

    // 2. Helper function to safely write to localStorage
    const setStoredUsers = (users) => {
        try {
            localStorage.setItem("users", JSON.stringify(users));
            return true;
        } catch (error) {
            console.error("Profile: Failed to write to localStorage:", error);
            alert("Profile could not be permanently saved due to browser restrictions.");
            return false;
        }
    };

    // --- LOGIC FUNCTIONS (Using Helper Functions) ---

    // Fetch user data
    useEffect(() => {
        const users = getStoredUsers(); // SAFE READ
        if (users.length > 0) {
            const lastUser = users[users.length - 1]; 
            setUser(lastUser);
            setEmailInput(lastUser.email || "");
            setPasswordInput(lastUser.password || "");
        }
    }, []);

    const updateProfile = () => {
        if (!emailInput || !passwordInput) {
            alert("Email and Password cannot be empty!");
            return;
        }

        const updatedUser = { ...user, email: emailInput, password: passwordInput };
        let users = getStoredUsers(); // SAFE READ

        if (users.length > 0) {
            users[users.length - 1] = updatedUser;
            setStoredUsers(users); // SAFE WRITE
            setUser(updatedUser);
            alert("Profile updated successfully!");
        } else {
            alert("Cannot update profile: No user data found.");
        }
    };

    const addMobileNumber = () => {
        if (!mobileInput || !mobileNameInput) {
            alert("Enter both number and name!");
            return;
        }

        const updatedUser = {
            ...user,
            mobileNumbers: [
                ...(user.mobileNumbers || []),
                { number: mobileInput, name: mobileNameInput },
            ],
        };

        let users = getStoredUsers(); // SAFE READ

        if (users.length > 0) {
            users[users.length - 1] = updatedUser;
            setStoredUsers(users); // SAFE WRITE
            setUser(updatedUser);
            setMobileInput("");
            setMobileNameInput("");
        }
    };

    const deleteMobileNumber = (index) => {
        const updatedNumbers = user.mobileNumbers.filter((_, i) => i !== index);
        const updatedUser = { ...user, mobileNumbers: updatedNumbers };

        let users = getStoredUsers(); // SAFE READ
        
        if (users.length > 0) {
            users[users.length - 1] = updatedUser;
            setStoredUsers(users); // SAFE WRITE
            setUser(updatedUser);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <p className="text-xl text-red-500 font-semibold">No Profile Found. Please Log in/Register.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-900 p-8 text-white">
            {/* Back to Dashboard Button */}
            
            <button onClick={onBack} className="self-start mb-6 text-white hover:text-blue-600 transition-colors flex items-center space-x-2">
                <span className="text-xl">←</span>
                <span>Back to Dashboard</span>
            </button>
            
            {/* Header */}
            <div className="text-center mb-8 pt-8">
                <h1 className="text-4xl font-bold text-blue-500 tracking-wide">
                    <span className="text-blue-600">📷 CIVA</span> Profile
                </h1>
                <p className="text-gray-400 mt-2">Manage your account details</p>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md transition-all duration-300 hover:scale-[1.01] border-t-4 border-red-600">
                <h2 className="text-2xl font-semibold mb-6 text-blue-500">Edit Profile Details</h2>

                {/* Editable Email */}
                <div className="mb-4">
                    <label className="block text-gray-300 font-medium mb-1"> Email:</label>
                    <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full border border-gray-600 bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                    />
                </div>

                {/* Editable Password */}
                <div className="mb-6">
                    <label className="block text-gray-300 font-medium mb-1"> Password:</label>
                    <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full border border-gray-600 bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                    />
                </div>

                {/* Update Button */}
                <button
                    onClick={updateProfile}
                    className="w-full bg-blue-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold mb-6 transition-all duration-300 hover:scale-[1.02]"
                >
                    Update Profile
                </button>

                {/* Mobile Numbers Display */}
                <div className="mb-6 border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-medium text-red-500 mb-3"> Registered Notification Numbers:</h3>
                    {user.mobileNumbers && user.mobileNumbers.length > 0 ? (
                        <ul className="list-none pl-0 text-gray-300 space-y-2">
                            {user.mobileNumbers.map((m, i) => (
                                <li key={i} className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
                                    <span>
                                        **{m.number}** - <span className="text-gray-400">({m.name})</span>
                                    </span>
                                    <button
                                        onClick={() => deleteMobileNumber(i)}
                                        className="text-red-400 hover:text-red-600 text-lg font-medium ml-4 transition-colors"
                                    >
                                        ✖
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-sm">No notification numbers added yet.</p>
                    )}
                </div>

                {/* Add Mobile Section */}
                <div className="border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-medium text-red-500 mb-3"> Add New Mobile Number</h3>
                    <div className="flex gap-3 mb-3">
                        <input
                            type="text"
                            className="w-1/3 border border-gray-600 bg-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                            placeholder="Nickname (Home)"
                            value={mobileNameInput}
                            onChange={(e) => setMobileNameInput(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-2/3 border border-gray-600 bg-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                            placeholder="Mobile number (for alerts)"
                            value={mobileInput}
                            onChange={(e) => setMobileInput(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={addMobileNumber}
                        className="w-full bg-blue-600 hover:bg-green-700 text-white py-2 rounded-md transition-all duration-300 hover:scale-[1.02] font-semibold"
                    >
                        Add Mobile Number
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;