// cspell:disable

import type { SonexTheme, WidgetConfig } from '@sonex/sdk-browser';
import {
  MovieShowsCardTemplate,
  MoviesListCardTemplate
} from './sonex-templates';
import {
  isMovieShowsCardData,
  // isMovieShowsIntent,
  isMoviesListCardData,
  // isMoviesListIntent
} from './sonex-template-data';


// Custom BookMyShow theme
const bookMyShowTheme: SonexTheme = {
  // Primary colors - BookMyShow red/dark theme
  primaryColor: '#f84464',
  secondaryColor: '#dc3558',
  backgroundColor: '#1a1a1a',
  textColor: '#ffffff',

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
    sessionEndpoint: 'http://localhost:3000/auth/session',
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
  templates: [
    {
      name: 'movies-list-card',
      component: MoviesListCardTemplate,
      matcher: (data) => {
        // Use type guard to validate data structure for movies list
        return isMoviesListCardData(data); // || isMoviesListIntent(data?.intent);
      }
    },
    {
      name: 'movie-shows-card',
      component: MovieShowsCardTemplate,
      matcher: (data) => {
        // Use type guard to validate data structure for movie shows
        return isMovieShowsCardData(data); // || isMovieShowsIntent(data?.intent);
      }
    }
  ]
});

