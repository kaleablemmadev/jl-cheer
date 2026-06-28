import { useState } from 'react'
import MessageCard from './components/MessageCard'
import MessageComposer from './components/MessageComposer'
import FloatingHearts from './components/FloatingHearts'
import herPhoto from './assets/AGS_Image.jpg'  // ✅ Add this

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <FloatingHearts />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent mb-4">
            💖 Exam Motivation 💖
          </h1>
          <p className="text-pink-200/80 text-lg mb-6">Sending love and inspiration to help you shine</p>
          
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              isAdmin 
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' 
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            }`}
          >
            {isAdmin ? '👑 Admin Mode' : '👁️ View Mode'}
          </button>
        </header>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <MessageCard isAdmin={isAdmin} />
          {isAdmin ? (
            <MessageComposer />
          ) : (
            <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20 shadow-2xl shadow-pink-500/10 flex flex-col items-center justify-center">
              <img 
                src={herPhoto}
                alt="Her Photo"
                className="w-full h-[400px] object-cover object-center rounded-2xl border-2 border-pink-500/30 shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#1e1b4b" width="400" height="400"/><text fill="#ec4899" font-family="sans-serif" font-size="24" x="50%" y="50%" text-anchor="middle" dy=".3em">💕 Her Photo 💕</text></svg>')
                }}
              />
              <p className="mt-6 text-pink-200/80 text-lg text-center">You've got this! 💖</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
