import React, { useState } from 'react';
import './TemplateStyles.css';

interface ExpenseCardTemplateProps {
  data: {
    text?: string;
    intent?: string | null;
    parameters?: {
      amount?: number;
      description?: string;
      category?: string;
      currency?: string;
      paidBy?: string;
      type?: string;
      splitWith?: string[];
      date?: string;
      [key: string]: any;
    };
    clarification?: string;
    [key: string]: any;
  };
}

/**
 * Custom template for rendering expense-related messages
 * Displays expense details in a card format
 */
export const ExpenseCardTemplate: React.FC<ExpenseCardTemplateProps> = ({ data }) => {
  const { parameters = {}, clarification } = data;
  console.log('ExpenseCardTemplate data:', data);
  const { amount, currency, description, category, paidBy, splitWith, date } = parameters;

  // ✅ Internal state management
  const [copied, setCopied] = useState(false);

  // ✅ Event handler defined within the template
  const handleCopyAmount = () => {
    console.log('handleCopyAmount Copying amount:', amount);
    if (amount !== undefined) {
      navigator.clipboard.writeText(amount.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="sonex-template-card expense-card">
      <div className="template-card-header">
        <div className="template-card-icon expense-icon">💰</div>
        <div className="template-card-title">Expense Details</div>
      </div>
      
      <div className="template-card-body">
        {description && (
          <div className="template-field">
            <span className="template-field-label">Description:</span>
            <span className="template-field-value">{description}</span>
          </div>
        )}
        
        {amount !== undefined && (
          <div className="template-field template-field-highlight">
            <span className="template-field-label">Amount:</span>
            <span className="template-field-value template-amount">{amount.toFixed(2)} {currency ? currency : ''}</span>
            {/* ✅ Button with internal event handler */}
            <button 
              onClick={handleCopyAmount}
              className="template-action-button"
              aria-label="Copy amount"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        )}
        
        {category && (
          <div className="template-field">
            <span className="template-field-label">Category:</span>
            <span className="template-field-value template-badge">{category}</span>
          </div>
        )}
        
        {paidBy && (
          <div className="template-field">
            <span className="template-field-label">Paid by:</span>
            <span className="template-field-value">{paidBy}</span>
          </div>
        )}
        
        {splitWith && splitWith.length > 0 && (
          <div className="template-field">
            <span className="template-field-label">Split with:</span>
            <span className="template-field-value">{splitWith.join(', ')}</span>
          </div>
        )}
        
        {date && (
          <div className="template-field">
            <span className="template-field-label">Date:</span>
            <span className="template-field-value">{new Date(date).toLocaleDateString()}</span>
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

