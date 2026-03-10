import React, { useState } from 'react';

const DailyPredictionForm = () => {
    const [matchWinner, setMatchWinner] = useState('');
    const [tossWinner, setTossWinner] = useState('');
    const [topScorer, setTopScorer] = useState('');
    const [topWicketTaker, setTopWicketTaker] = useState('');
    const [boundaries, setBoundaries] = useState(35);
    const [submitted, setSubmitted] = useState(false);

    // New state variables for API integration
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, this would send data to the backend
    };

    return (
        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 text-white font-sans w-full max-w-md mx-auto my-6">

            {/* Match Card Header */}
            <div className="relative p-6 bg-gradient-to-br from-gray-800 to-gray-900 border-b border-gray-700">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent opacity-50"></div>
                <div className="relative z-10 flex justify-between items-center text-center">

                    {/* Team A - Example RCB */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            <span className="font-extrabold text-xl text-white tracking-wider">RCB</span>
                        </div>
                    </div>

                    {/* VS & Match Info */}
                    <div className="flex flex-col items-center justify-center px-4">
                        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Match 24</span>
                        <span className="text-2xl font-black italic text-gray-50 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">VS</span>
                        <span className="text-[10px] font-medium text-cyan-400 mt-2 tracking-wide uppercase">Thu 16 Apr | 7:30 PM PM</span>
                    </div>

                    {/* Team B - Example CSK */}
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                            <span className="font-extrabold text-xl text-gray-900 tracking-wider">CSK</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prediction Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">

                {/* Match Winner */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">Match Winner</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border transition-all duration-300 ${matchWinner === 'RCB' ? 'bg-gray-800 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-gray-900 border-gray-700 hover:border-gray-500'}`}>
                            <input type="radio" name="matchWinner" value="RCB" className="hidden" onChange={(e) => setMatchWinner(e.target.value)} />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${matchWinner === 'RCB' ? 'border-green-500' : 'border-gray-500'}`}>
                                {matchWinner === 'RCB' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                            </div>
                            <span className={`font-bold ${matchWinner === 'RCB' ? 'text-green-400' : 'text-gray-400'}`}>RCB</span>
                        </label>
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border transition-all duration-300 ${matchWinner === 'CSK' ? 'bg-gray-800 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-gray-900 border-gray-700 hover:border-gray-500'}`}>
                            <input type="radio" name="matchWinner" value="CSK" className="hidden" onChange={(e) => setMatchWinner(e.target.value)} />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${matchWinner === 'CSK' ? 'border-green-500' : 'border-gray-500'}`}>
                                {matchWinner === 'CSK' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                            </div>
                            <span className={`font-bold ${matchWinner === 'CSK' ? 'text-green-400' : 'text-gray-400'}`}>CSK</span>
                        </label>
                    </div>
                </div>

                {/* Toss Winner */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">Toss Winner</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border transition-all duration-300 ${tossWinner === 'RCB' ? 'bg-gray-800 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-gray-900 border-gray-700 hover:border-gray-500'}`}>
                            <input type="radio" name="tossWinner" value="RCB" className="hidden" onChange={(e) => setTossWinner(e.target.value)} />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${tossWinner === 'RCB' ? 'border-cyan-500' : 'border-gray-500'}`}>
                                {tossWinner === 'RCB' && <div className="w-2 h-2 rounded-full bg-cyan-500"></div>}
                            </div>
                            <span className={`font-bold ${tossWinner === 'RCB' ? 'text-cyan-400' : 'text-gray-400'}`}>RCB</span>
                        </label>
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border transition-all duration-300 ${tossWinner === 'CSK' ? 'bg-gray-800 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-gray-900 border-gray-700 hover:border-gray-500'}`}>
                            <input type="radio" name="tossWinner" value="CSK" className="hidden" onChange={(e) => setTossWinner(e.target.value)} />
                            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${tossWinner === 'CSK' ? 'border-cyan-500' : 'border-gray-500'}`}>
                                {tossWinner === 'CSK' && <div className="w-2 h-2 rounded-full bg-cyan-500"></div>}
                            </div>
                            <span className={`font-bold ${tossWinner === 'CSK' ? 'text-cyan-400' : 'text-gray-400'}`}>CSK</span>
                        </label>
                    </div>
                </div>

                {/* Top Scorer & Wicket Taker */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Top Scorer</label>
                        <input
                            type="text"
                            placeholder="e.g., V. Kohli"
                            value={topScorer}
                            onChange={(e) => setTopScorer(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all placeholder-gray-500"
                            list="batters"
                        />
                        <datalist id="batters">
                            <option value="V. Kohli" />
                            <option value="F. du Plessis" />
                            <option value="R. Gaikwad" />
                            <option value="S. Dube" />
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">Top Wicket Taker</label>
                        <input
                            type="text"
                            placeholder="e.g., M. Siraj"
                            value={topWicketTaker}
                            onChange={(e) => setTopWicketTaker(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all placeholder-gray-500"
                            list="bowlers"
                        />
                        <datalist id="bowlers">
                            <option value="M. Siraj" />
                            <option value="R. Jadeja" />
                            <option value="M. Pathirana" />
                            <option value="L. Ferguson" />
                        </datalist>
                    </div>
                </div>

                {/* Total Boundaries Slider */}
                <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">Total Boundaries</label>
                        <span className="text-xl font-bold text-green-400">{boundaries}</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="60"
                        value={boundaries}
                        onChange={(e) => setBoundaries(e.target.value)}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-medium px-1">
                        <span>10</span>
                        <span>60</span>
                    </div>
                </div>

                {/* Feedback Messages */}
                {submitStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                        {errorMessage}
                    </div>
                )}
                {submitStatus === 'success' && (
                    <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                        ✅ Picks successfully locked in!
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || submitStatus === 'success'}
                        className={`w-full py-4 rounded-xl font-black text-lg tracking-wider transition-all duration-300 uppercase ${submitStatus === 'success'
                            ? 'bg-gray-800 text-green-500 border border-green-500/50 cursor-not-allowed shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : isSubmitting
                                ? 'bg-gray-700 text-gray-400 cursor-wait'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-gray-900 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transform hover:-translate-y-1'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Locking...
                            </span>
                        ) : submitStatus === 'success' ? (
                            '🔒 Picks Locked'
                        ) : (
                            'Lock In Picks'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DailyPredictionForm;
