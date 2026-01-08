import React from 'react';
import './TemplateStyles.css';

interface BillSplitCardTemplateProps {
  data: {
    text?: string;
    intent?: string | null;
    parameters?: {
      totalAmount?: number;
      numberOfPeople?: number;
      perPersonAmount?: number;
      billName?: string;
      participants?: string[];
      splits?: Array<{
        name: string;
        amount: number;
        percentage?: number;
      }>;
      [key: string]: any;
    };
    clarification?: string;
    [key: string]: any;
  };
}

/**
 * Custom template for rendering bill-splitting messages
 * Displays bill split details with per-person breakdown
 */
export const BillSplitCardTemplate: React.FC<BillSplitCardTemplateProps> = ({ data }) => {
  const { parameters = {}, clarification } = data;
  const { totalAmount, numberOfPeople, perPersonAmount, billName, participants, splits } = parameters;

  return (
    <div className="sonex-template-card bill-split-card">
      <div className="template-card-header">
        <div className="template-card-icon bill-icon">🧾</div>
        <div className="template-card-title">Bill Split</div>
      </div>
      
      <div className="template-card-body">
        {billName && (
          <div className="template-field">
            <span className="template-field-label">Bill:</span>
            <span className="template-field-value">{billName}</span>
          </div>
        )}
        
        {totalAmount !== undefined && (
          <div className="template-field template-field-highlight">
            <span className="template-field-label">Total Amount:</span>
            <span className="template-field-value template-amount">${totalAmount.toFixed(2)}</span>
          </div>
        )}
        
        {numberOfPeople !== undefined && (
          <div className="template-field">
            <span className="template-field-label">Number of People:</span>
            <span className="template-field-value">{numberOfPeople}</span>
          </div>
        )}
        
        {perPersonAmount !== undefined && (
          <div className="template-field template-field-highlight">
            <span className="template-field-label">Per Person:</span>
            <span className="template-field-value template-amount">${perPersonAmount.toFixed(2)}</span>
          </div>
        )}
        
        {participants && participants.length > 0 && (
          <div className="template-field">
            <span className="template-field-label">Participants:</span>
            <div className="template-participants">
              {participants.map((participant, index) => (
                <span key={index} className="template-participant-badge">
                  {participant}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {splits && splits.length > 0 && (
          <div className="template-splits-section">
            <div className="template-splits-header">Split Breakdown:</div>
            <div className="template-splits-list">
              {splits.map((split, index) => (
                <div key={index} className="template-split-item">
                  <span className="template-split-name">{split.name}</span>
                  <span className="template-split-amount">${split.amount.toFixed(2)}</span>
                  {split.percentage !== undefined && (
                    <span className="template-split-percentage">({split.percentage}%)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {clarification && (
        <div className="template-card-footer">
          <p className="template-clarification">{clarification}</p>
        </div>
      )}
    </div>
  );
};

