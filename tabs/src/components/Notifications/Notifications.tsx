import { useNotificationStore, Notification as NotificationType } from '../../stores/notifications';

import { Notification } from './Notification';

export const Notifications = () => {
  const { notifications, dismissNotification } = useNotificationStore();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
      }}
    >
      {notifications.map((notification: NotificationType) => {
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />;
      })}
    </div>
  );
};
