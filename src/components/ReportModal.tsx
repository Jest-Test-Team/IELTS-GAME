'use client';

import { useEffect } from 'react';
import { SessionError, TestType } from '@/types';
import { useTestController } from './hooks/useTestController';

interface ReportModalProps {
  type: TestType;
  data: any[];
}

export default function ReportModal({ type, data }: ReportModalProps) {
  const {
    sessionAttempts,
    sessionCorrect,
    sessionErrors,
    closeReport,
  } = useTestController(type, data);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('report-modal');
      if (event.target === modal) {
        closeReport();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeReport();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeReport]);

  const rate = sessionAttempts > 0 ? Math.round((sessionCorrect / sessionAttempts) * 100) : 0;

  const errorHTML = sessionErrors
    .map((error: SessionError) => (
      <li key={`${error.prompt}-${error.userAnswer}`}>
        Question: &quot;{error.prompt}&quot;<br />
        Your answer: <strong>{error.userAnswer}</strong><br />
        Correct answer: <code>{error.correctAnswer}</code>
      </li>
    ));

  return (
    <div id="report-modal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="report-title">
            {type.charAt(0).toUpperCase() + type.slice(1)} Test Report
          </h3>
          <span id="modal-close-button" className="close-button" onClick={closeReport}>
            &times;
          </span>
        </div>
        <div id="report-body" className="report-body">
          <p>
            <b>Session Score: {sessionCorrect} / {sessionAttempts} ({rate}%)</b>
          </p>
          {errorHTML.length > 0 ? (
            <>
              <h4>Mistakes in this session:</h4>
              <ul className="report-errors">{errorHTML}</ul>
            </>
          ) : (
            <p>🎉 Great job! No mistakes in this session.</p>
          )}
        </div>
      </div>
    </div>
  );
}
