import {
  Image,
  Form,
  FormInput,
  FormButton,
  Button,
  Flex,
  FormCheckbox,
  FlexItem,
} from '@fluentui/react-northstar';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
export const Signup = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/welcome/provision-number');
  };

  const handleCancel = () => {
    navigate('/welcome/sign-n');
  };
  return (
    <div className="sign-up page">
      <div className="narrow page-padding">
        <Image src="/clerk-logo.png" />
        <Flex column className="signup-form" gap="gap.smaller">
          <Form onSubmit={handleDone}>
            <h1 style={{ marginBottom: 0 }}>Sign up</h1>
            <p style={{ marginTop: 0 }}>Tell us a bit about yourself.</p>
            <Flex gap="gap.small" fill={true} style={{ paddingTop: '2.0rem' }}>
              <FlexItem grow={true}>
                <FormInput
                  fluid
                  label="First Name"
                  name="fname"
                  id="first-name"
                  required
                  showSuccessIndicator={false}
                  placeholder="John"
                />
              </FlexItem>
              <FlexItem grow={true}>
                <FormInput
                  fluid
                  label="Last Name"
                  name="lname"
                  id="last-name"
                  required
                  showSuccessIndicator={false}
                  placeholder="Rich"
                />
              </FlexItem>
            </Flex>
            <FormInput
              fluid
              type="email"
              label="Email"
              name="email"
              id="email"
              required
              showSuccessIndicator={false}
              placeholder="john@microsoft.com"
            />
            <FormInput
              fluid
              label="Phone Number"
              name="phonenumber"
              id="phonenumber"
              required
              showSuccessIndicator={false}
              placeholder="(415) 943-6084"
            />
            <Flex vAlign="center">
              <FormCheckbox label="By signing up you agree to the" id="conditions" />
              <a href="/terms" style={{ textDecoration: 'none' }}>
                terms and conditions
              </a>
            </Flex>
            <Flex gap="gap.small">
              <Button onClick={handleCancel} content="Cancel" />
              <FormButton primary content="Done" />
            </Flex>
          </Form>
        </Flex>
      </div>
    </div>
  );
};
