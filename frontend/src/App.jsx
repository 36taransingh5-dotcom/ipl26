import React from 'react'
import DailyPredictionForm from './components/DailyPredictionForm'
import MiniLeaderboard from './components/MiniLeaderboard'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0f12] text-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Abstract Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10 flex flex-col items-center mb-6">
        <h1 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 drop-shadow-sm">
          CRICPREDICT '26
        </h1>
        <p className="text-gray-400 text-sm font-medium mt-1 tracking-widest uppercase">Season Long Tracker</p>
      </div>

      <div className="w-full z-10">
        <DailyPredictionForm />
        <MiniLeaderboard />
      </div>

      <div className="mt-8 text-center z-10">
        <p className="text-xs text-gray-600 font-medium">&copy; 2026 IPL Prediction Tracker. Private League.</p>
      </div>
    </div>
  )
}

export default App
