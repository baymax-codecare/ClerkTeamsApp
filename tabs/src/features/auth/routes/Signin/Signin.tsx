import { Image, Button, Flex } from '@fluentui/react-northstar';
import { useNavigate } from 'react-router-dom';

import { Microsoft } from '../../../../components/icons';
import { NotificationType, useNotificationStore } from '../../../../stores/notifications';

import './Signin.css';
export const Signin = () => {
  const navigate = useNavigate();
  const handleSignin = async () => {
    try {
      microsoftTeams.authentication.authenticate({
        url: window.location.origin + '/auth/signin',
        width: 600,
        height: 535,
        successCallback: function (result) {
          // getUserProfile(result.accessToken);
        },
        failureCallback: function (reason) {
          // handleAuthError(reason);
        },
      });
      navigate('/auth/provision-number');
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message || error;

      useNotificationStore.getState().addNotification({
        type: NotificationType.ERROR,
        title: 'Error',
        message,
      });
    }
  };

  return (
    <div className="sign-in page">
      <div className="narrow page-padding">
        <Image src="/clerk-logo.png" />
        <h1 className="center">Welcome to Clerk! We&apos;re glad you&apos;re here</h1>
        <p className="center">
          Bring your business phone to Teams and start text messaging your contacts today.
        </p>
        <Flex column gap="gap.small" vAlign="center" hAlign="center" className="signin-form">
          <Button
            primary
            content="Sign in with Microsoft"
            fluid
            onClick={handleSignin}
            icon={<Microsoft />}
          />
        </Flex>
      </div>
    </div>
  );
};
