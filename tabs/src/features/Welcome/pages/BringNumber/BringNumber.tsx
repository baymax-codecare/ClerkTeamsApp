import { Image, Form, FormButton, Button, Flex, FormDropdown } from '@fluentui/react-northstar';
import { useNavigate } from 'react-router-dom';
import './BringNumber.css';
export const BringNumber = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate('/welcome/provision-number');
  };

  const handleCancel = () => {
    navigate('/welcome/signin');
  };

  const carrierLabelId = 'carrier-label';
  const otherLabelId = 'other-label';

  return (
    <div className="bring-number page">
      <div className="narrow page-padding">
        <Image src="/hello.png" />
        <Flex column className="bring-number-form" gap="gap.smaller">
          <Form onSubmit={handleDone}>
            <h1>Bring Your Number</h1>
            <p style={{ marginTop: 0, paddingBottom: '2.0rem' }}>
              Connect your existing carrier. Choose from the list below.
            </p>
            <FormDropdown
              label={{
                content: `Carrier`,
                id: carrierLabelId,
              }}
              fluid
              items={['Twillo', 'Ring Central Stack']}
              aria-labelledby={carrierLabelId}
              search={true}
              placeholder="Choose a carrier"
            />
            <FormDropdown
              label={{
                content: `Other`,
                id: otherLabelId,
              }}
              fluid
              items={['T-mobile', 'US Mobile', 'Mint Mobile', 'Tello']}
              aria-labelledby={otherLabelId}
              search={true}
              placeholder="Choose a carrier"
            />
            <Flex gap="gap.small">
              <Button onClick={handleCancel} content="Cancel" />
              <FormButton primary content="Next" />
            </Flex>
          </Form>
        </Flex>
      </div>
    </div>
  );
};
