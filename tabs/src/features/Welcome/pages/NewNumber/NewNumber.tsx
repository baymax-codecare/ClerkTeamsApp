import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';
import {
  Image,
  Form,
  FormInput,
  FormButton,
  Button,
  Flex,
  Alert,
  FlexItem,
  FormDropdown,
} from '@fluentui/react-northstar';
import { useNavigate } from 'react-router-dom';
import './NewNumber.css';
export const NewNumber = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/welcome/provision-number');
  };

  const handleCancel = () => {
    navigate('/welcome/signin');
  };

  const labelId = 'choose-country-label';

  return (
    <div className="new-number page">
      <div className="narrow page-padding">
        <Image src="/newnumber.png" />
        <Flex column className="new-number-form" gap="gap.smaller">
          <Form onSubmit={handleDone}>
            <h1>Choose a Phone Number</h1>
            <p style={{ marginTop: 0, paddingBottom: '2.0rem' }}>
              Choose from any below. Not all phone numbers are available in a given area code.
            </p>
            <FormDropdown
              label={{
                content: `Country`,
                id: labelId,
              }}
              fluid
              items={['USA', 'Canada']}
              aria-labelledby={labelId}
              search={true}
              placeholder="Choose a country"
            />
            <Flex gap="gap.small" fill={true}>
              <FlexItem grow={true}>
                <FormInput
                  fluid
                  label="State"
                  name="state"
                  id="state"
                  required
                  showSuccessIndicator={false}
                  placeholder="Califonia"
                />
              </FlexItem>
              <FlexItem grow={true}>
                <FormInput
                  fluid
                  label="Area Code"
                  name="areacode"
                  id="areacode"
                  required
                  showSuccessIndicator={false}
                  placeholder="415"
                />
              </FlexItem>
            </Flex>
            <FormInput
              fluid
              label="Phone Number"
              name="phonenumber"
              id="phonenumber"
              required
              showSuccessIndicator={false}
              placeholder="(415) 943-6084"
            />
            <Flex gap="gap.small">
              <Button onClick={handleCancel} content="Cancel" />
              <FormButton primary content="Done" />
            </Flex>
            <Alert
              icon={<ExclamationTriangleIcon />}
              danger
              content="No phone numbers available in your area code. Please choose another."
            />
          </Form>
        </Flex>
      </div>
    </div>
  );
};
