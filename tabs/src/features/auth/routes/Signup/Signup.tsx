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

import { useUpdateProfile } from '../../api/updateProfile';
import { CaseOfUsing } from '../../types/user-case-of-using.enum';
import { UserStatus } from '../../types/user-status.enum';
import './Signup.css';

const caseOfUse = ['Customer Support', 'MFA(Verification Codes)', 'Sales & Marketing', 'Other'];
const caseOfUseMap = new Map([
  [caseOfUse[0], CaseOfUsing.CUSTOMER_SUPPORT],
  [caseOfUse[1], CaseOfUsing.MFA],
  [caseOfUse[2], CaseOfUsing.SALES_AND_MARKETING],
  [caseOfUse[3], CaseOfUsing.OTHER],
]);
export const Signup = () => {
  const [inputs, setInputs] = useState({ phone: '', case_of_using: CaseOfUsing.CUSTOMER_SUPPORT });
  const [isAcceptTerms, setAcceptTerms] = useState(false);

  //
  // React Query Mutation & Submit
  //
  const updateProfileMutation = useUpdateProfile();

  const handleDone = async () => {
    await updateProfileMutation.mutateAsync({
      data: { ...inputs, status: UserStatus.PROVISION_NUMBER },
    });
  };

  //
  // Handle click events
  //
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const navigate = useNavigate();

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
              defaultValue={caseOfUse[0]}
              getA11ySelectionMessage={{
                onAdd: (item) => {
                  const case_of_using: CaseOfUsing =
                    caseOfUseMap.get(item?.toString() || '') || CaseOfUsing.CUSTOMER_SUPPORT;
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
              placeholder=""
              value={inputs?.phone || ''}
              onChange={handleChange}
            />
            <Flex vAlign="center">
              <FormCheckbox
                checked={isAcceptTerms}
                onClick={() => {
                  setAcceptTerms(!isAcceptTerms);
                }}
                label="By signing up you agree to the"
                id="conditions"
              />
              <a href="/terms" style={{ textDecoration: 'none' }}>
                terms and conditions
              </a>
            </Flex>
            <Flex gap="gap.small">
              <Button onClick={handleCancel} content="Cancel" />
              <FormButton
                loading={updateProfileMutation.isLoading}
                disabled={!isAcceptTerms}
                primary
                content="Done"
              />
            </Flex>
          </Form>
        </Flex>
      </div>
    </div>
  );
};
