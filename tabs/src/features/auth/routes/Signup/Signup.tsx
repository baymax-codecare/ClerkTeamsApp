import {
  Image,
  Form,
  FormInput,
  FormButton,
  Button,
  Flex,
  FormCheckbox,
  Dropdown,
  Text,
} from '@fluentui/react-northstar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CaseOfUsing } from '../../types/user-case-of-using.enum';
import './Signup.css';

const caseOfUse = ['Customer Support', 'MFA(Verification Codes)', 'Sales & Marketing', 'Other'];
const caseOfUseMap = new Map([
  ['Customer Support', CaseOfUsing.CUSTOMER_SUPPORT],
  ['MFA(Verification Codes)', CaseOfUsing.MFA],
  ['Sales & Marketing', CaseOfUsing.SALES_AND_MARKETING],
  ['Other', CaseOfUsing.OTHER],
]);
export const Signup = () => {
  const [inputs, setInputs] = useState({ phone: '' });

  const navigate = useNavigate();

  const handleDone = () => {
    alert(inputs);
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/auth/signin');
  };
  return (
    <div className="sign-up page">
      <div className="narrow page-padding">
        <Image src="/clerk-logo.png" />
        <Flex column className="signup-form" gap="gap.smaller">
          <Form onSubmit={handleDone}>
            <h1 style={{ marginBottom: 0 }}>Sign up</h1>
            <p style={{ marginTop: 0 }}>Tell us a bit about yourself.</p>

            <Text>How are you planning on using Clerk?</Text>
            <Dropdown
              items={caseOfUse}
              defaultValue={caseOfUseMap.get(CaseOfUsing.CUSTOMER_SUPPORT)}
              getA11ySelectionMessage={{
                onAdd: (item) => {
                  const case_of_using = caseOfUseMap.get(item?.toString() || '');
                  setInputs((values) => ({ ...values, case_of_using }));
                  return 'hha';
                },
              }}
            />
            <FormInput
              fluid
              label="Phone Number"
              name="phone"
              id="phone"
              required
              showSuccessIndicator={false}
              placeholder="(415) 943-6084"
              value={inputs?.phone || ''}
              onChange={handleChange}
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
