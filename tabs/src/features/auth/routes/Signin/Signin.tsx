import { useMsal } from '@azure/msal-react';
import { Image, Button, Flex } from '@fluentui/react-northstar';
// import { useNavigate } from 'react-router-dom';

import { Microsoft } from '../../../../components/icons';

import './Signin.css';
export const Signin = () => {
  const loginRequest = {
    scopes: ['User.Read'],
  };
  const { instance } = useMsal();
  // const navigate = useNavigate();
  const handleSignin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
    // navigate('/auth/provision-number');
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
