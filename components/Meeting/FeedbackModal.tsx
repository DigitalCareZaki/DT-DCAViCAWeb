'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@selectors';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
}

const StarIcon = ({ filled, hovered, onClick, onMouseEnter, onMouseLeave, index }: any) => {
  const isActive = filled || hovered;
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      className="focus:outline-none transform transition-all duration-150 hover:scale-125 active:scale-95"
      aria-label={`Rate ${index} star${index !== 1 ? 's' : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-10 h-10 transition-all duration-200"
        fill={isActive ? 'url(#starGradient)' : 'none'}
        stroke={isActive ? 'none' : '#4B5563'}
        strokeWidth={1.5}
        style={{
          filter: isActive ? 'drop-shadow(0 0 6px rgba(251,191,36,0.6))' : 'none',
        }}
      >
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </button>
  );
};

const ratingLabels: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

const FeedbackModal = ({ isOpen, onClose, appointmentId }: FeedbackModalProps) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [user] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const navigateAway = () => {
    const userType = user?.type?.toLowerCase() ?? 'patient';
    router.push(`/${userType}/telemed`);
  };

  const handleSubmit = async () => {
    if (!rating) return;
    setLoading(true);
    try {
      console.log('rating >>>', rating)
      console.log('appointmentId >>>', appointmentId)

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/web/telemed/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ appointmentId, rating }),
      });
      setSubmitted(true);
      setTimeout(() => {
        navigateAway();
      }, 2200);
    } catch {
      setSubmitted(true);
      setTimeout(() => {
        navigateAway();
      }, 2200);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigateAway();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {/* Animated card */}
      <div
        className="relative w-full max-w-md mx-4 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #1e2a3a, #16202e)',
          border: '1px solid rgba(255,255,255,0.08)',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(40px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
        }}
      >
        {/* Top gradient accent */}
        <div
          className="h-1 w-full"
          style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)' }}
        />

        {!submitted ? (
          <div className="px-8 py-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Session Feedback</h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                How was your teleconsultation experience?
              </p>
            </div>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon
                  key={i}
                  index={i}
                  filled={i <= rating}
                  hovered={i <= hovered && i > rating}
                  onClick={(v: number) => setRating(v)}
                  onMouseEnter={(v: number) => setHovered(v)}
                  onMouseLeave={() => setHovered(0)}
                />
              ))}
            </div>

            {/* Rating label */}
            <div className="text-center h-6 mb-6">
              {(hovered || rating) ? (
                <span
                  className="text-sm font-semibold tracking-wide"
                  style={{
                    background: 'linear-gradient(90deg, #FBBF24, #F59E0B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {ratingLabels[hovered || rating]}
                </span>
              ) : (
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Tap a star to rate
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                Skip
              </button>
              <button
                onClick={handleSubmit}
                disabled={!rating || loading}
                className="flex-2 flex-grow py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                style={{
                  background: !rating || loading
                    ? 'rgba(99,102,241,0.4)'
                    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: rating && !loading ? '0 4px 20px rgba(99,102,241,0.4)' : 'none',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Feedback'}
              </button>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="px-8 py-12 text-center">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 0 30px rgba(16,185,129,0.4)',
                animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Feedback Submitted!</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Thank you for your feedback. Redirecting you now...
            </p>
            {/* Animated dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#10b981',
                    animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FeedbackModal;
