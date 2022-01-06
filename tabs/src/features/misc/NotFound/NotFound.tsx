import { Image, Button, Flex } from '@fluentui/react-northstar';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
export const NotFound = () => {
  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate('/auth/signin');
  };

  const handleStartOver = () => {
    navigate('/auth/signin');
  };
  return (
    <div className="not-found page">
      <div className="narrow page-padding">
        <Image src="/error.png" />
        <h1 className="center">Something went wrong</h1>
        <p className="center">
          Try refreshing this page or start over if that doesn’t do the trick.
        </p>
        <Flex column gap="gap.small" vAlign="center" hAlign="center" className="not-found-form">
          <Button primary content="Refresh" fluid onClick={handleRefresh} />
          <Button text content="Start over" primary fluid onClick={handleStartOver} />
        </Flex>
      </div>
    </div>
  );
};
