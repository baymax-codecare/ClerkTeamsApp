import { useNotificationStore, Notification as NotificationType } from '../../stores/notifications';

import { Notification } from './Notification';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();
  return (
    <div
      style={{
        position: 'absolute',
        top: '2.0rem',
        right: '1.0rem',
      }}
    >
      {notifications.map((notification: NotificationType) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};
