import React from 'react';
import './TemplateStyles.css';

interface SpendSummaryCardTemplateProps {
  data: {
    text?: string;
    intent?: string | null;
    parameters?: {
      start_date?: string;
      end_date?: string;
      total_spend?: number;
      categories?: Array<{
        category: string;
        spend: number;
      }>;
      [key: string]: any;
    };
    clarification?: string;
    [key: string]: any;
  };
}

/**
 * Custom template for rendering spend summary messages
 * Displays spend breakdown by category with visual bars
 */
export const SpendSummaryCardTemplate: React.FC<SpendSummaryCardTemplateProps> = ({ data }) => {
  const { parameters = {}, clarification } = data;
  const { start_date, end_date, total_spend, categories = [] } = parameters;

  // Format date for display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate percentage for each category
  const getPercentage = (spend: number) => {
    if (!total_spend || total_spend === 0) return 0;
    return Math.round((spend / total_spend) * 100);
  };

  // Get color based on category index
  const getCategoryColor = (index: number) => {
    const colors = ['#5bc5a7', '#6366f1', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316'];
    return colors[index % colors.length];
  };

  return (
    <div className="sonex-template-card spend-summary-card">
      <div className="template-card-header spend-summary-header">
        <div className="template-card-icon spend-icon">📊</div>
        <div className="template-card-title">Spend Summary</div>
      </div>
      
      <div className="template-card-body">
        {/* Date Range */}
        {(start_date || end_date) && (
          <div className="template-field">
            <span className="template-field-label">Period:</span>
            <span className="template-field-value">
              {formatDate(start_date)} - {formatDate(end_date)}
            </span>
          </div>
        )}
        
        {/* Total Spend */}
        {total_spend !== undefined && (
          <div className="template-field template-field-highlight">
            <span className="template-field-label">Total Spend:</span>
            <span className="template-field-value template-amount">{total_spend.toFixed(2)}</span>
          </div>
        )}
        
        {/* Category Breakdown */}
        {categories && categories.length > 0 && (
          <div className="template-categories-section">
            <div className="template-splits-header">Category Breakdown:</div>
            <div className="template-categories-list">
              {categories.map((cat, index) => {
                const percentage = getPercentage(cat.spend);
                const color = getCategoryColor(index);
                return (
                  <div key={index} className="template-category-item">
                    <div className="template-category-header">
                      <span className="template-category-name">
                        <span className="template-category-dot" style={{ backgroundColor: color }}></span>
                        {cat.category}
                      </span>
                      <span className="template-category-amount">{cat.spend.toFixed(2)}</span>
                    </div>
                    <div className="template-category-bar-container">
                      <div 
                        className="template-category-bar" 
                        style={{ width: `${percentage}%`, backgroundColor: color }}
                      ></div>
                    </div>
                    <span className="template-category-percentage">{percentage}%</span>
                  </div>
                );
              })}
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

