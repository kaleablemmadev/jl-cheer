import { useEffect, useState } from 'react'

function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([])

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      size: 20 + Math.random() * 30
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-500/20 animate-float"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`
          }}
        >
          💕
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 15s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default FloatingHearts
