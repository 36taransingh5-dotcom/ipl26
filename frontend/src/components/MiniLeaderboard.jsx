import React from 'react';

const mockUsers = [
    { rank: 1, name: 'Isha', points: 420 },
    { rank: 2, name: 'Riya', points: 385 },
    { rank: 3, name: 'Shaifali', points: 360 },
    { rank: 4, name: 'Eknoor', points: 310 },
    { rank: 5, name: 'Taran Tranquils', points: 290 },
];

const MiniLeaderboard = () => {
    return (
        <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800 text-white font-sans w-full max-w-md mx-auto my-6">
            <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
                <h3 className="text-lg font-bold text-gray-100 uppercase tracking-wide flex items-center">
                    <span className="w-2 h-6 bg-cyan-500 rounded mr-3 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                    Private League
                </h3>
                <span className="text-xs font-semibold px-2 py-1 bg-gray-800 rounded-md text-cyan-400 border border-gray-700">Live</span>
            </div>

            <div className="p-0">
                <ul className="divide-y divide-gray-800/50">
                    {mockUsers.map((user) => (
                        <li key={user.name} className="flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors group">
                            <div className="flex items-center space-x-4">
                                <span className={`font-black text-lg w-6 text-center ${user.rank <= 3 ? 'text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'text-gray-500'}`}>
                                    {user.rank}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 flex items-center justify-center text-xs font-bold text-gray-300 group-hover:border-cyan-500 transition-colors">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-200">{user.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">{user.points}</span>
                                <span className="text-xs text-gray-500 ml-1 mt-1">pts</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4 bg-gray-800/30 text-center border-t border-gray-800">
                <button className="text-sm font-bold text-green-400 hover:text-green-300 uppercase tracking-wider transition-colors">
                    View Full Standings →
                </button>
            </div>
        </div>
    );
};

export default MiniLeaderboard;
