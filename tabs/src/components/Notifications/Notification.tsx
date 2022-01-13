import { Alert } from '@fluentui/react-northstar';

import { NotificationType } from '../../stores/notifications';

export type NotificationProps = {
  notification: {
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  return (
    <Alert
      header={title}
      styles={{
        marginBottom: '0.5rem',
      }}
      content={message}
      dismissible
      dismissAction={{
        'aria-label': 'close',
        onClick: () => onDismiss(id),
      }}
      danger={type == NotificationType.WARNING}
      info={type == NotificationType.INFO}
      success={type == NotificationType.SUCCESS}
      variables={{
        urgent: type == NotificationType.ERROR,
      }}
    />
  );
};
