import { Image, Button, Flex } from '@fluentui/react-northstar';
import { TeamsUserCredential } from '@microsoft/teamsfx';

import { Microsoft } from '../../../../components/icons';
import { useAuth } from '../../../../lib/auth';
import storage from '../../../../utils/storage';
import { LoginCredentialsDTO } from '../../api/login';
import './Signin.css';
export const Signin = () => {
  const { login } = useAuth();
  // const navigate = useNavigate();
  //const { isInTeams } = useTeamsFx();

  const handleSignin = async () => {
    const credential = new TeamsUserCredential();
    //if (isInTeams) {
    try {
      const userInfo = await credential.getUserInfo();
      const token = await credential.getToken('');
      storage.setToken(token?.token || '');
      const userDTO: LoginCredentialsDTO = {
        email: userInfo.objectId,
        token: token?.token || '',
      };

      const authUser = await login(userDTO);
      console.log(authUser);
      // navigate('/inbox');
    } catch (error) {
      // TODO: Handle Error
    }

    //
    //} else {
    // TODO: show login pop to login with Microsoft Windows
    //}
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
