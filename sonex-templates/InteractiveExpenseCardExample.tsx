/**
 * EXAMPLE: Interactive Expense Card Template
 *
 * This is a demonstration of how to properly handle events in custom templates.
 * This file is NOT currently used in the application - it's provided as a reference
 * for implementing interactive elements in custom card templates.
 *
 * Key Concepts Demonstrated:
 * 1. Internal event handling (copy button)
 * 2. Callback props for parent communication (edit/delete actions)
 * 3. Internal state management (expanded state, copied state)
 * 4. Navigation to edit page (instead of inline form)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateStyles.css';

interface InteractiveExpenseCardProps {
  data: {
    parameters?: {
      amount?: number;
      description?: string;
      category?: string;
      paidBy?: string;
      splitWith?: string[];
      date?: string;
      expenseId?: string;
    };
    clarification?: string;
  };
  /**
   * Optional callback for communicating actions to parent application
   * @param actionType - Semantic action identifier (e.g., 'edit_expense', 'delete_expense')
   * @param actionData - Data associated with the action
   */
  onAction?: (actionType: string, actionData: any) => void;
}

export const InteractiveExpenseCardExample: React.FC<InteractiveExpenseCardProps> = ({
  data,
  onAction
}) => {
  const navigate = useNavigate();
  const { parameters = {}, clarification } = data;
  const { amount, description, category, paidBy, splitWith, date, expenseId } = parameters;

  // ✅ Internal state management
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ Internal event handler - Copy amount to clipboard
  const handleCopyAmount = () => {
    if (amount !== undefined) {
      navigator.clipboard.writeText(amount.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ✅ Internal event handler - Toggle expanded view
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // ✅ Internal event handler - Navigate to edit page
  const handleStartEdit = () => {
    // Notify parent that navigation is happening
    if (onAction) {
      onAction('navigate_to_edit', {
        expenseId,
        amount,
        description,
        category,
        paidBy,
        splitWith,
        date
      });
    }

    // Navigate to edit page with expense data
    navigate('/edit-expense', {
      state: {
        expenseData: {
          expenseId,
          amount,
          description,
          category,
          paidBy,
          splitWith,
          date
        }
      }
    });
  };

  // ✅ Delete handler - Calls parent callback with confirmation
  const handleDelete = () => {
    if (window.confirm(`Delete expense "${description}"?`)) {
      if (onAction) {
        onAction('delete_expense', {
          expenseId,
          amount,
          description
        });
      }
    }
  };

  // ✅ Share handler - Internal action with optional parent notification
  const handleShare = () => {
    const shareText = `Expense: ${description} - $${amount?.toFixed(2)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Expense Details',
        text: shareText
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        alert('Copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard!');
    }

    // Optionally notify parent
    if (onAction) {
      onAction('share_expense', { expenseId, description, amount });
    }
  };

  return (
    <div className="sonex-template-card expense-card">
      {/* Header */}
      <div className="template-card-header">
        <div className="template-card-icon expense-icon">💰</div>
        <div className="template-card-title">Expense Details</div>
        {/* ✅ Expand/Collapse button with internal handler */}
        <button 
          onClick={handleToggleExpand}
          className="template-expand-button"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      <div className="template-card-body">
        {/* Display Mode */}
        {description && (
          <div className="template-field">
            <span className="template-field-label">Description:</span>
            <span className="template-field-value">{description}</span>
          </div>
        )}

        {amount !== undefined && (
          <div className="template-field template-field-highlight">
            <span className="template-field-label">Amount:</span>
            <span className="template-field-value template-amount">
              ${amount.toFixed(2)}
            </span>
            {/* ✅ Copy button with internal handler */}
            <button
              onClick={handleCopyAmount}
              className="template-action-button template-action-small"
              aria-label="Copy amount"
              title="Copy amount to clipboard"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        )}

        {/* Expanded details (shown when expanded) */}
        {isExpanded && (
          <>
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
                <span className="template-field-value">
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="template-card-actions">
        {/* ✅ All buttons have internal handlers */}
        <button
          onClick={handleStartEdit}
          className="template-action-button template-action-edit"
          title="Edit expense"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleShare}
          className="template-action-button template-action-share"
          title="Share expense"
        >
          📤 Share
        </button>
        <button
          onClick={handleDelete}
          className="template-action-button template-action-delete"
          title="Delete expense"
        >
          🗑️ Delete
        </button>
      </div>

      {/* Clarification message */}
      {clarification && (
        <div className="template-card-footer">
          <p className="template-clarification">{clarification}</p>
        </div>
      )}
    </div>
  );
};

/**
 * USAGE EXAMPLE in sonex-config.ts:
 * 
 * import { InteractiveExpenseCardExample } from './components/sonex-templates/InteractiveExpenseCardExample';
 * 
 * export const createSonexConfig = (handleChatEvent: Function) => ({
 *   // ... other config
 *   templates: [
 *     {
 *       name: 'interactive-expense-card',
 *       component: (props: any) => (
 *         <InteractiveExpenseCardExample 
 *           {...props}
 *           onAction={(actionType, actionData) => {
 *             console.log('Template action:', actionType, actionData);
 *             
 *             switch (actionType) {
 *               case 'edit_expense':
 *                 // Handle edit - maybe send a message to update the expense
 *                 handleChatEvent('template_action', { 
 *                   type: 'edit', 
 *                   data: actionData 
 *                 });
 *                 break;
 *               
 *               case 'delete_expense':
 *                 // Handle delete - maybe make an API call
 *                 handleChatEvent('template_action', { 
 *                   type: 'delete', 
 *                   data: actionData 
 *                 });
 *                 break;
 *               
 *               case 'share_expense':
 *                 // Handle share - maybe track analytics
 *                 console.log('Expense shared:', actionData);
 *                 break;
 *             }
 *           }}
 *         />
 *       ),
 *       matcher: (data) => isExpenseCardData(data)
 *     }
 *   ]
 * });
 */

