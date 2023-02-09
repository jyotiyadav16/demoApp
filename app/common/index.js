import {showMessage, MessageType} from 'react-native-flash-message';

export const showToast = (
  type,
  message,
  duration,
) => {
  showMessage({
    type: type,
    message: message,
    duration: duration,
  });
};