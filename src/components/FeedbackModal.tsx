import React, { useState } from 'react';
import { X, Square, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// Submits directly to the Google Form linked to the feedback sheet.
// No backend or API keys needed — the form writes to the sheet automatically.
const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScfOMETI1Od-pukc2GfdQVBMePJuw-_Si-Ta2HS0ftmUfDhmw/formResponse';

// Google Form field entry IDs
const FIELD_FEEDBACK   = 'entry.621624340';   // "Your feedback" (paragraph)
const FIELD_CATEGORY   = 'entry.1904988938';  // "Feedback type" (single choice)
const FIELD_EXTRA      = 'entry.1314121031';  // "Additional comments"

const CATEGORIES = [
  { label: 'Bug Report',             formValue: 'Bug Report' },
  { label: 'Feature Request',        formValue: 'Feature Request' },
  { label: 'Skill tree improvement', formValue: 'Skill Tree Structure' },
  { label: 'Other',                  formValue: 'Other' },
] as const;

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>('idle');

  if (!isOpen) return null;

  const toggleCategory = (label: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setStatus('submitting');

    // Map selected labels → form values; default to 'General Feedback'
    const selectedLabels = [...selected];
    const primaryFormValue =
      CATEGORIES.find(c => c.label === selectedLabels[0])?.formValue ??
      'General Feedback';

    // URLSearchParams sets Content-Type: application/x-www-form-urlencoded
    // which is a simple header allowed in no-cors mode (required for Google Forms)
    const body = new URLSearchParams({
      [FIELD_FEEDBACK]: feedback.trim(),
      [FIELD_CATEGORY]: primaryFormValue,
      [FIELD_EXTRA]:    selectedLabels.join(', '),
    });

    try {
      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body,
      });
      setStatus('success');
      setTimeout(() => {
        onClose();
        setFeedback('');
        setSelected(new Set());
        setStatus('idle');
      }, 1800);
    } catch {
      setStatus('error');
    }
  };

  const handleDismiss = () => {
    onClose();
    setFeedback('');
    setSelected(new Set());
    setStatus('idle');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleDismiss} />

      {/* Modal */}
      <div
        className="relative w-full max-w-[500px] rounded-[10px] p-6 flex flex-col gap-[22px]"
        style={{
          background: '#2b303b',
          boxShadow: '0px 8px 24px 0px rgba(0,0,0,0.14)',
        }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2
              className="text-white text-[24px] leading-[32px] font-normal"
              style={{ letterSpacing: '-0.6px' }}
            >
              Provide feedback
            </h2>
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close feedback"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-[14px] leading-[20px] text-white/80 max-w-[402px]">
            I'm a one person team so your feedback helps me improve the site directly!
          </p>
        </div>

        {/* Body */}
        {status === 'success' ? (
          <div className="flex items-center justify-center h-[120px]">
            <p className="text-white text-[16px] leading-[24px] text-center">
              Thank you! Your feedback was received. 🙌
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Textarea */}
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Start adding your feedback in here"
              rows={3}
              disabled={status === 'submitting'}
              className={cn(
                'w-full resize-none rounded-[8px] px-4 py-2 text-[12px] leading-[16px] text-white',
                'placeholder:text-[#818898] focus:outline-none focus:ring-1 focus:ring-[#9952e0]',
                'disabled:opacity-50',
              )}
              style={{ background: '#2b303b', border: '1px solid #818898', minHeight: 80 }}
            />

            {/* Checkboxes */}
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(({ label }) => {
                const checked = selected.has(label);
                return (
                  <button
                    key={label}
                    onClick={() => toggleCategory(label)}
                    disabled={status === 'submitting'}
                    className="flex items-center gap-2 text-left disabled:opacity-50"
                  >
                    {checked
                      ? <CheckSquare size={20} className="shrink-0" style={{ color: '#9952e0' }} />
                      : <Square size={20} className="shrink-0 text-[#818898]" />
                    }
                    <span className="text-white text-[12px] leading-[16px]">{label}</span>
                  </button>
                );
              })}
            </div>

            {status === 'error' && (
              <p className="text-[12px] leading-[16px]" style={{ color: '#ee4f4f' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        {status !== 'success' && (
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleDismiss}
              className="text-[14px] font-medium leading-[20px] text-white/90 hover:text-white transition-colors px-2"
            >
              Dismiss
            </button>
            <button
              onClick={handleSubmit}
              disabled={!feedback.trim() || status === 'submitting'}
              className={cn(
                'px-8 h-8 rounded-[24px] text-[14px] font-medium leading-[20px] text-white transition-opacity',
                !feedback.trim() || status === 'submitting'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'opacity-90 hover:opacity-100',
              )}
              style={{ background: '#9952e0' }}
            >
              {status === 'submitting' ? 'Sending…' : 'Submit'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
