import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const ForgotPassword = ({ onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();
    
    const handleSendLink = (e) => {
        e.preventDefault();
        
        if (!email) {
            setMessage('Please enter your registered email address.');
            return;
        }

        setIsSent(true);
        setMessage(`Password reset link sent to ${email}. Check your inbox!`);
    
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
             <header className="fixed top-0 left-0 w-full h-14 bg-blue-300 flex items-center px-4  border-b border-gray-700">
                <div className="flex items-center text-xl font-bold">
                   <span className="text-3xl text-red-600 mr-2">📹</span> 
                   <span className="text-white">LiveStream Detect</span>
                 </div>
              </header>
            <div className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md border-t-4 border-red-600">
                
                <h2 className="text-3xl font-bold text-center mb-2 text-blue-500">
                    Forgot Password
                </h2>
                <p className="text-gray-400 text-center mb-6">
                    Enter your registered email to receive the reset link.
                </p>

                {message && (
                    <div className={`p-3 mb-4 rounded-md text-sm font-medium ${isSent ? 'bg-green-800/50 text-green-300' : 'bg-red-800/50 text-red-300'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSendLink} className="space-y-4">
                    
                    <div>
                        <input 
                            type="email" 
                            placeholder="Registered Email ID" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-red-500 focus:outline-none text-white transition-colors"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSent}
                        className={`w-full py-3 font-semibold rounded-md transition-all 
                                    ${isSent ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-green-700'}`}
                    >
                        {isSent ? 'Link Sent!' : 'Send Reset Link'}
                    </button>
                </form>

                <button 
                   onClick={() => navigate("/login")}
                    className="mt-4 text-white hover:text-blue-500 hover:underline w-full text-center block text-sm"
                >
                    ← Back to Login
                </button>

            </div>
        </div>
    );
};

export default ForgotPassword;