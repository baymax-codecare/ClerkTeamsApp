import { Image, Button, Flex } from '@fluentui/react-northstar';
import { TeamsUserCredential } from '@microsoft/teamsfx';
import { useState } from 'react';

import { Microsoft } from '../../../../components/icons';
import { useAuth } from '../../../../lib/auth';
import { useNotificationStore, NotificationType } from '../../../../stores/notifications';
import storage from '../../../../utils/storage';
import { LoginCredentialsDTO } from '../../api/login';
import './Signin.css';
export const Signin = () => {
  const { user, login, isLoggingIn } = useAuth();
  const [isSigningIn, setIsSigninIn] = useState(false);

  const handleSignin = async () => {
    setIsSigninIn(true);
    try {
      let authUser;

      //
      // if already logged in
      //
      if (user) {
        authUser = user;
      } else {
        //
        // attempts login with access_token from teams app
        //

        const credential = new TeamsUserCredential();
        const userInfo = await credential.getUserInfo(); // Get logged in user info from teams app
        const token = await credential.getToken(''); // Get token from teams app //* behind msal.js is running to get token *//
        storage.setToken(token?.token || ''); // set token for the axios request

        const userDTO: LoginCredentialsDTO = {
          preferredUsername: userInfo.objectId,
        };

        authUser = await login(userDTO); // login request to the backend

        if (authUser == null) {
          throw 'User not found'; // Login failed
        }
      }

      setIsSigninIn(false);
    } catch (error: any) {
      const message = error.response?.data?.message || error?.message || error;

      useNotificationStore.getState().addNotification({
        type: NotificationType.ERROR,
        title: 'Error',
        message,
      });
      console.error(error);
      setIsSigninIn(false);
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
            disabled={isLoggingIn || isSigningIn}
            loading={isLoggingIn || isSigningIn}
            onClick={handleSignin}
            icon={<Microsoft />}
          />
        </Flex>
      </div>
    </div>
  );
};
