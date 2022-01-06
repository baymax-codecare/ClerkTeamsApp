import { Image, Button, Flex } from '@fluentui/react-northstar';
import { useNavigate } from 'react-router-dom';

import './ProvisionNumber.css';
export const ProvisionNumber = () => {
  const navigate = useNavigate();
  const getNewNumber = () => {
    navigate('/welcome/new-number');
  };
  const bringYourNumber = () => {
    navigate('/welcome/bring-number');
  };
  return (
    <div className="provision-number page">
      <div className="narrow page-padding">
        <Image src="/thumbs-up.png" />
        <h1 className="center" style={{ marginBottom: 0 }}>
          Get Started
        </h1>
        <p className="center">
          Choose a new phone number or activate your existing one. You can always change this later.
        </p>
        <Flex column gap="gap.small" vAlign="center" hAlign="center" className="provision-form">
          <Button primary content="Get a New Number" fluid onClick={getNewNumber} />
          <Button content="Bring Your Number" fluid onClick={bringYourNumber} />
        </Flex>
      </div>
    </div>
  );
};
