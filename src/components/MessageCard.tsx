import { useState } from 'react'

const defaultMessages = [
  {
    id: 1,
    message: "You've worked so hard for this moment. I believe in you completely. Every sleepless night, every sacrifice - it all leads to this success. You're going to shine! ✨",
    category: "Belief"
  },
  {
    id: 2,
    message: "Remember why you started this journey. Your dreams are within reach, and I'll be here cheering you on every step of the way. You've got this! 💪",
    category: "Motivation"
  },
  {
    id: 3,
    message: "The world needs your brilliance. These exams are just a stepping stone to the amazing future you're building. I'm so proud of you. 🌟",
    category: "Future"
  },
  {
    id: 4,
    message: "Take a deep breath. You are prepared, you are capable, and you are loved. Whatever happens, I'm here for you. You are and will be my beautiful future interior designer, my wife. Always. 💖",
    category: "Support"
  },
  {
    id: 5,
    message: "Your intelligence and dedication inspire me every day. I know you'll crush these exams because you never give up. I love your determination! 📚",
    category: "Admiration"
  },
  {
    id: 6,
    message: "When things get tough, remember that you're stronger than you think. I've seen you overcome challenges before, and you'll do it again. Together, we've got this. 🤝",
    category: "Strength"
  },
  {
    id: 7,
    message: "This exam doesn't limit you - it shows how much of an incredible person you're becoming. I'm lucky to watch you grow and achieve your dreams. 🌹",
    category: "Growth"
  },
  {
    id: 8,
    message: "Close your eyes and visualize your success. Now open them and make it happen. I'm sending you all admiration and love. May God be with you all the way! 💫",
    category: "Visualization"
  },
  {
    id: 9,
    message: "Look at this girl. Sweet with cuteness; Great with Confidence; Amazing with her Brilliance. You will go there, do those exams and you will make your husband swell with pride. 💖",
  }
]

interface MessageCardProps {
  isAdmin: boolean
}

function MessageCard({ isAdmin }: MessageCardProps) {
  const [messages, setMessages] = useState(defaultMessages)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editMessage, setEditMessage] = useState('')
  const [editCategory, setEditCategory] = useState('')

  const nextMessage = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
      setIsAnimating(false)
    }, 300)
  }

  const previousMessage = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length)
      setIsAnimating(false)
    }, 300)
  }

  const randomMessage = () => {
    setIsAnimating(true)
    setTimeout(() => {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * messages.length)
      } while (newIndex === currentIndex && messages.length > 1)
      setCurrentIndex(newIndex)
      setIsAnimating(false)
    }, 300)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditMessage(messages[currentIndex].message)
    setEditCategory(messages[currentIndex].category)
  }

  const handleSave = () => {
    const updatedMessages = [...messages]
    updatedMessages[currentIndex] = {
      ...updatedMessages[currentIndex],
      message: editMessage,
      category: editCategory
    }
    setMessages(updatedMessages)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (messages.length <= 1) return
    const updatedMessages = messages.filter((_, index) => index !== currentIndex)
    setMessages(updatedMessages)
    setCurrentIndex(0)
  }

  const handleAdd = () => {
    const newMessage = {
      id: Date.now(),
      message: "Your new inspiring message here... 💖",
      category: "Custom"
    }
    setMessages([...messages, newMessage])
    setCurrentIndex(messages.length)
  }

  const currentMessage = messages[currentIndex]

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-purple-900/80 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20 shadow-2xl shadow-pink-500/10">
      <div className="flex items-center justify-between mb-6">
        {isEditing ? (
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium border border-pink-500/30 focus:outline-none"
          />
        ) : (
          <span className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium">
            {currentMessage.category}
          </span>
        )}
        <span className="text-pink-400/60 text-sm">
          {currentIndex + 1} / {messages.length}
        </span>
      </div>

      <div className={`min-h-[200px] flex items-center justify-center mb-8 transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        {isEditing ? (
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/30 rounded-xl text-pink-100 focus:outline-none focus:border-pink-400 resize-none"
            rows={5}
          />
        ) : (
          <p className="text-2xl text-pink-100 leading-relaxed text-center font-light">
            {currentMessage.message}
          </p>
        )}
      </div>

      {isAdmin && isEditing && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleSave}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
          >
            ✅ Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-500 hover:to-slate-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-500/25"
          >
            ✕ Cancel
          </button>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={previousMessage}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/25"
        >
          ← Previous
        </button>
        <button
          onClick={randomMessage}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
        >
          🎲 Random
        </button>
        <button
          onClick={nextMessage}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-rose-500/25"
        >
          Next →
        </button>
      </div>

      {isAdmin && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleEdit}
            disabled={isEditing}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25"
          >
            ➕ Add New
          </button>
          <button
            onClick={handleDelete}
            disabled={messages.length <= 1}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:opacity-50 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <div className="mt-6 flex justify-center gap-2">
        {messages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true)
              setTimeout(() => {
                setCurrentIndex(index)
                setIsAnimating(false)
              }, 300)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-pink-400 w-8'
                : 'bg-pink-500/30 hover:bg-pink-500/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default MessageCard
