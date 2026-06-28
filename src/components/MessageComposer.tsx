import { useState } from 'react'

function MessageComposer() {
  const [recipientName, setRecipientName] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [savedMessages, setSavedMessages] = useState<Array<{ id: number; name: string; message: string; time: string }>>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    if (!recipientName || !customMessage) return

    const newMessage = {
      id: Date.now(),
      name: recipientName,
      message: customMessage,
      time: scheduledTime || 'Send now'
    }

    setSavedMessages([newMessage, ...savedMessages])
    setRecipientName('')
    setCustomMessage('')
    setScheduledTime('')
    setShowSuccess(true)

    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDelete = (id: number) => {
    setSavedMessages(savedMessages.filter(msg => msg.id !== id))
  }

  const quickMessages = [
    "You're going to ace this! 💖",
    "Believe in yourself as I believe in you ✨",
    "All your hard work will pay off 🌟",
    "You're brilliant and capable! 💪",
    "I'm so proud of you always 🌹"
  ]

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20 shadow-2xl shadow-pink-500/10">
      <h2 className="text-2xl font-bold text-pink-300 mb-6">💝 Write Your Message</h2>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <img 
            src="src/assets/AGS_Image.jpg"
            alt="Her Photo"
            className="w-full h-[200px] object-cover object-bottom rounded-xl border-2 border-pink-500/30"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect fill="#1e1b4b" width="400" height="200"/><text fill="#ec4899" font-family="sans-serif" font-size="20" x="50%" y="50%" text-anchor="middle" dy=".3em">💕 Her Photo 💕</text></svg>')
            }}
          />
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter her name..."
            className="absolute bottom-4 left-4 right-4 px-4 py-3 bg-slate-900/80 backdrop-blur-sm border border-pink-500/30 rounded-xl text-pink-100 placeholder-pink-300/30 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-pink-200/80 mb-2 text-sm font-medium">Your Message</label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Write something inspiring..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-xl text-pink-100 placeholder-pink-300/30 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-pink-200/80 mb-2 text-sm font-medium">Schedule (Optional)</label>
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-xl text-pink-100 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-pink-200/80 mb-2 text-sm font-medium">Quick Add 💕</label>
          <div className="flex flex-wrap gap-2">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => setCustomMessage(prev => prev ? prev + ' ' + msg : msg)}
                className="px-3 py-2 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-200 text-sm transition-all hover:scale-105"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!recipientName || !customMessage}
        className="w-full py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:via-rose-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30"
      >
        {scheduledTime ? '📅 Schedule Message' : '💖 Save Message'}
      </button>

      {showSuccess && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-center animate-pulse">
          ✨ Message saved successfully!
        </div>
      )}

      {savedMessages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-pink-300 mb-4">💌 Saved Messages</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {savedMessages.map((saved) => (
              <div
                key={saved.id}
                className="p-4 bg-slate-800/50 border border-pink-500/20 rounded-xl hover:border-pink-500/40 transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-pink-300 font-medium">To: {saved.name}</span>
                  <button
                    onClick={() => handleDelete(saved.id)}
                    className="text-pink-400/50 hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-pink-100/80 text-sm mb-2">{saved.message}</p>
                <span className="text-pink-400/60 text-xs">
                  {saved.time === 'Send now' ? 'Ready to send' : `Scheduled: ${new Date(saved.time).toLocaleString()}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageComposer
