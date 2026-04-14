'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@selectors';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
}

// ─── Theme constants (project palette) ───────────────────────────
const DARK_MAIN      = '#161B20';   // bg-dark-main
const DARK_SECONDARY = '#242E3D';   // bg-dark-secondary
const PATIENT_RED    = '#ef233c';   // theme-patient-primary
const SUCCESS_TEAL   = '#00B278';   // theme-superadmin-primary / secondary
const BORDER_COLOR   = 'rgba(255,255,255,0.07)';
const TEXT_MUTED     = 'rgba(255,255,255,0.45)';
const TEXT_SUB       = 'rgba(255,255,255,0.65)';

// ─── Rating label map ─────────────────────────────────────────────
const LABELS: Record<number, { text: string; color: string }> = {
  1: { text: 'Bad',       color: '#ef4444' },
  2: { text: 'Average',   color: '#f97316' },
  3: { text: 'Good',      color: '#eab308' },
  4: { text: 'Very Good', color: '#84cc16' },
  5: { text: 'Excellent', color: SUCCESS_TEAL },
};

// ─── Single Star ──────────────────────────────────────────────────
const Star = ({
  index,
  filled,
  onClick,
  onEnter,
  onLeave,
}: {
  index: number;
  filled: boolean;
  onClick: (n: number) => void;
  onEnter: (n: number) => void;
  onLeave: () => void;
}) => (
  <button
    type="button"
    onClick={() => onClick(index)}
    onMouseEnter={() => onEnter(index)}
    onMouseLeave={onLeave}
    className="focus:outline-none"
    style={{
      transform: filled ? 'scale(1.18)' : 'scale(1)',
      transition: 'transform 0.15s ease',
    }}
    aria-label={`Rate ${index} star${index !== 1 ? 's' : ''}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: 42,
        height: 42,
        fill: filled ? PATIENT_RED : 'transparent',
        stroke: filled ? PATIENT_RED : 'rgba(255,255,255,0.25)',
        strokeWidth: 1.4,
        filter: filled ? `drop-shadow(0 0 8px rgba(239,35,60,0.55))` : 'none',
        transition: 'all 0.15s ease',
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  </button>
);

// ─── Main Modal ───────────────────────────────────────────────────
const FeedbackModal = ({ isOpen, onClose, appointmentId }: FeedbackModalProps) => {
  const [rating, setRating]     = useState(0);
  const [hovered, setHovered]   = useState(0);
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [user] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) setTimeout(() => setMounted(true), 10);
    else         setMounted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const navigate = () => {
    const type = user?.type?.toLowerCase() ?? 'patient';
    router.push(`/${type}/telemed`);
  };

  const handleSubmit = async () => {
    if (!rating || loading) return;
    setLoading(true);
    try {
      console.log('rating >>>', rating);
      console.log('appointmentId >>>', appointmentId);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/web/telemed/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ appointmentId, rating }),
      });
    } catch (_) {
      // still show success UX
    } finally {
      setLoading(false);
      setSubmitted(true);
      setTimeout(navigate, 2400);
    }
  };

  const activeIndex   = hovered || rating;
  const labelInfo     = activeIndex ? LABELS[activeIndex] : null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10,14,18,0.80)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          margin: '0 16px',
          borderRadius: 20,
          background: DARK_SECONDARY,
          border: `1px solid ${BORDER_COLOR}`,
          boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
          overflow: 'hidden',
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(30px)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease',
        }}
      >
        {/* Red top accent bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${PATIENT_RED}, #ff6b6b, ${PATIENT_RED})` }} />

        {!submitted ? (
          <div style={{ padding: '28px 32px 32px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              {/* Icon ring */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: DARK_MAIN,
                  border: `2px solid ${PATIENT_RED}`,
                  marginBottom: 14,
                  boxShadow: `0 0 20px rgba(239,35,60,0.25)`,
                }}
              >
                {/* Phone icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={PATIENT_RED} style={{ width: 28, height: 28 }}>
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.2px',
                }}
              >
                Rate Your Session
              </h2>
              <p style={{ margin: '6px 0 0', fontSize: 13, color: TEXT_SUB, lineHeight: 1.5 }}>
                How was your teleconsultation experience?
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: BORDER_COLOR, marginBottom: 24 }} />

            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  index={i}
                  filled={i <= (hovered || rating)}
                  onClick={setRating}
                  onEnter={setHovered}
                  onLeave={() => setHovered(0)}
                />
              ))}
            </div>

            {/* Rating label */}
            <div style={{ textAlign: 'center', height: 24, marginBottom: 24 }}>
              {labelInfo ? (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    color: labelInfo.color,
                    transition: 'color 0.2s ease',
                    textTransform: 'uppercase',
                  }}
                >
                  {labelInfo.text}
                </span>
              ) : (
                <span style={{ fontSize: 12, color: TEXT_MUTED }}>Tap a star to rate</span>
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Skip */}
              <button
                onClick={navigate}
                style={{
                  flex: 1,
                  padding: '11px 0',
                  borderRadius: 10,
                  border: `1px solid ${BORDER_COLOR}`,
                  background: DARK_MAIN,
                  color: TEXT_MUTED,
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = DARK_MAIN;
                  (e.currentTarget as HTMLButtonElement).style.color = TEXT_MUTED;
                }}
              >
                Skip
              </button>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!rating || loading}
                style={{
                  flex: 2,
                  padding: '11px 0',
                  borderRadius: 10,
                  border: 'none',
                  background: !rating || loading
                    ? 'rgba(239,35,60,0.25)'
                    : PATIENT_RED,
                  color: !rating || loading ? 'rgba(255,255,255,0.35)' : '#ffffff',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: !rating || loading ? 'not-allowed' : 'pointer',
                  boxShadow: rating && !loading ? `0 4px 18px rgba(239,35,60,0.35)` : 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <svg
                      style={{ animation: 'avica-spin 0.8s linear infinite', width: 16, height: 16 }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </div>

          </div>
        ) : (
          /* ── Success State ── */
          <div style={{ padding: '40px 32px 44px', textAlign: 'center' }}>
            {/* Checkmark circle */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: SUCCESS_TEAL,
                boxShadow: `0 0 32px rgba(0,178,120,0.4)`,
                marginBottom: 20,
                animation: 'avica-popin 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" style={{ width: 36, height: 36 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#ffffff' }}>
              Feedback Submitted!
            </h3>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: TEXT_SUB, lineHeight: 1.6 }}>
              Thank you for rating your experience.
              <br />Returning to your dashboard...
            </p>

            {/* Teal progress dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: SUCCESS_TEAL,
                    animation: `avica-bounce 1.1s ease-in-out ${i * 0.18}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scoped keyframes */}
      <style>{`
        @keyframes avica-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes avica-popin {
          0%   { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes avica-bounce {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.35; }
          40%            { transform: translateY(-7px); opacity: 1;    }
        }
      `}</style>
    </div>
  );
};

export default FeedbackModal;
