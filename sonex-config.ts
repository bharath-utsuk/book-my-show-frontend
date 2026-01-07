// cspell:disable

import type { SonexTheme, WidgetConfig } from '@sonex/sdk-browser';
// import { BillSplitCardTemplate, ProfileCardTemplate, ExpenseCardTemplate, SpendSummaryCardTemplate } from './components/sonex-templates';
// import {
//   isExpenseCardData,
//   isBillSplitCardData,
//   isProfileCardData,
//   isBillSplitIntent,
//   isAddExpenseCardData,
//   isSpendSummaryCardData,
//   isSpendSummaryIntent
// } from './types/template-data';
// import { InteractiveExpenseCardExample } from './components/sonex-templates/InteractiveExpenseCardExample';

// Custom BookMyShow theme
const bookMyShowTheme: SonexTheme = {
  // Primary colors - BookMyShow red/dark theme
  primaryColor: '#f84464',
  secondaryColor: '#dc3558',
  backgroundColor: '#1a1a1a',
  textColor: '#1a1a1a',

  // Typography
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.5',

  // Layout
  borderRadius: '12px',
  shadowColor: 'rgba(248, 68, 100, 0.2)',
  borderColor: '#2d2d2d',

  // Icon styling
  iconColor: '#ffffff',
  iconBackgroundColor: '#f84464',
  iconSize: '24px',

  // Header styling
  headerBackgroundColor: '#f84464',
  headerTextColor: '#ffffff',
  headerPadding: '16px 20px',

  // Message styling
  messageUserBackgroundColor: '#f84464',
  messageAssistantBackgroundColor: '#2d2d2d',
  messageUserTextColor: '#ffffff',
  messageAssistantTextColor: '#ffffff',
  messagePadding: '12px 16px',
  messageMargin: '8px 0',

  // Input styling
  inputBackgroundColor: '#2d2d2d',
  inputBorderColor: '#3d3d3d',
  inputTextColor: '#ffffff',
  inputPlaceholderColor: '#888888',
  inputPadding: '8px 12px',

  // Button styling
  buttonBackgroundColor: '#f84464',
  buttonTextColor: '#ffffff',
  buttonHoverBackgroundColor: '#dc3558',
  buttonBorderRadius: '50%',

  // Status indicators
  onlineColor: '#10b981',
  offlineColor: '#dc3545',
  errorColor: '#dc3545',
  successColor: '#10b981',

  // Animations
  animationDuration: '300ms',
  animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

/**
 * Creates the Sonex widget configuration with event handlers
 * @param handleChatEvent - Event handler function for chat events
 * @returns Complete widget configuration
 */
export const createSonexConfig = (
  handleChatEvent: (eventType: string, data?: any) => void
): WidgetConfig => ({
  chatbotConfig: {
    apiEndpoint: 'http://localhost:3000/transcribe',
    sessionEndpoint: 'http://localhost:3000/transcribe/api/session',
  },
  title: 'BookMyShow Assistant',
  subtitle: 'Split your movie expenses!',
  defaultInputMode: 'voice',
  welcomeMessage: 'Hey! Ready to split those movie tickets? I can help you divide costs with your friends!',
  inputPlaceholder: 'Ask me to split tickets,\nsnacks, or parking costs...',
  theme: bookMyShowTheme,
  position: {
    bottom: '24px',
    right: '24px'
  },
  size: {
    width: '380px',
    height: '500px'
  },
  behavior: {
    autoOpen: false,
    autoOpenDelay: 3000
  },
  onOpen: () => handleChatEvent('open'),
  onClose: () => handleChatEvent('close'),
  onMessageSent: (message) => handleChatEvent('messageSent', message),
  onMessageReceived: (message) => handleChatEvent('messageReceived', message),
  onError: (error) => handleChatEvent('error', error),

  // Custom templates for rendering specific message types
//   templates: [
//     {
//       name: 'expense-card',
//       component: ExpenseCardTemplate,
//       matcher: (data) => {
//         // Use type guard to validate data structure
//         // Also check for expense-related intents as a fallback
//         return isAddExpenseCardData(data); // || isExpenseIntent(data?.intent);
//       }
//     },
//     {
//       name: 'bill-split-card',
//       component: BillSplitCardTemplate,
//       matcher: (data) => {
//         // Use type guard to validate data structure
//         // Also check for bill-split related intents as a fallback
//         return isBillSplitCardData(data) || isBillSplitIntent(data?.intent);
//       }
//     },
//     {
//       name: 'profile-card',
//       component: ProfileCardTemplate,
//       matcher: (data) => {
//         // Use type guard to validate data structure
//         // Also check for profile-related intents as a fallback
//         return isProfileCardData(data); // || isProfileIntent(data?.intent);
//       }
//     },
//     {
//       name: 'interactive-expense-card',
//       component: InteractiveExpenseCardExample,
//       matcher: (data) => {
//         // Use type guard to validate data structure
//         // Also check for profile-related intents as a fallback
//         return isExpenseCardData(data); // || isProfileIntent(data?.intent);
//       }
//     },
//     {
//       name: 'spend-summary-card',
//       component: SpendSummaryCardTemplate,
//       matcher: (data) => {
//         // Use type guard to validate data structure
//         // Also check for spend-summary related intents as a fallback
//         return isSpendSummaryCardData(data) || isSpendSummaryIntent(data?.intent);
//       }
//     }
//   ]
});

