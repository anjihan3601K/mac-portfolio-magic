// iOS-style haptic feedback utility
// Uses the Vibration API where supported

export const haptics = {
  // Light tap feedback (like tapping a button)
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  
  // Medium impact (like toggling a switch)
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },
  
  // Heavy impact (like dropping something)
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  },
  
  // Success feedback pattern
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 20]);
    }
  },
  
  // Error feedback pattern
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30, 50, 30]);
    }
  },
  
  // Selection changed
  selection: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(5);
    }
  },
};
