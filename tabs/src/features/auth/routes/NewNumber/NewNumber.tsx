import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';
import {
  Image,
  Form,
  FormButton,
  Button,
  Flex,
  Alert,
  FlexItem,
  FormDropdown,
  Loader,
} from '@fluentui/react-northstar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotificationType, useNotificationStore } from '../../../../stores/notifications';
import { useAvailableNumbers } from '../../api/availableNumbers';
import { useCreateNumber } from '../../api/createNumber';
import { useStatesWithArea } from '../../lib/usStatesAreaCode';
import './NewNumber.css';
export const NewNumber = () => {
  //
  // Handle user button clicks
  //
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/auth/provision-number');
  };

  const createNumberMutation = useCreateNumber();

  const handleDone = async () => {
    if (inputs.number === '') {
      useNotificationStore.getState().addNotification({
        type: NotificationType.ERROR,
        title: 'Error',
        message: 'Number is required',
      });
      return;
    }
    await createNumberMutation.mutateAsync({
      data: {
        number: `+1${inputs.number}`,
      },
    });
    return navigate('/chat');
  };

  //
  // US states with area code
  //
  const { statesWithArea, states } = useStatesWithArea();

  //
  // ReactJS state hook
  //
  const [inputs, setInputs] = useState({
    state: states[0],
    stateAbbreviation: statesWithArea[states[0]].abbreviation,
    area_code: statesWithArea[states[0]].areaCodes[0],
    number: '',
  });

  //
  // API Get Requests
  //
  const availableNumbersQuery = useAvailableNumbers({
    state: inputs.stateAbbreviation,
    area: inputs.area_code,
  });

  let phoneNumber;
  if (availableNumbersQuery.isLoading) {
    phoneNumber = <Loader label="Loading numbers" />;
  }

  let alert;
  if (!availableNumbersQuery.data?.length && !availableNumbersQuery.isLoading) {
    alert = (
      <Alert
        icon={<ExclamationTriangleIcon />}
        danger
        content="No phone numbers available in your area code. Please choose another."
      />
    );
  }

  if (availableNumbersQuery.isSuccess && availableNumbersQuery.data.length > 0) {
    phoneNumber = (
      <FormDropdown
        fluid
        label="Phone Number"
        items={availableNumbersQuery?.data || []}
        getA11ySelectionMessage={{
          onAdd: (item) => {
            const newNumber = item?.toString() || '';
            setInputs((values) => ({
              ...values,
              number: newNumber,
            }));
            return '';
          },
        }}
      />
    );
  }

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
                id: 'choose-country-label',
              }}
              fluid
              items={['USA']}
              aria-labelledby={'choose-country-label'}
              placeholder="Choose a country"
              defaultValue={'USA'}
            />
            <Flex gap="gap.small" fill={true}>
              <FlexItem grow={true}>
                <FormDropdown
                  fluid
                  label="State"
                  id="state"
                  items={states}
                  defaultValue={states[0]}
                  value={inputs['state']}
                  getA11ySelectionMessage={{
                    onAdd: (item) => {
                      const newState = item?.toString() || '';
                      setInputs((values) => ({
                        ...values,
                        state: newState,
                        stateAbbreviation: statesWithArea[newState].abbreviation,
                        area_code: statesWithArea[newState].areaCodes[0],
                      }));
                      return '';
                    },
                  }}
                />
              </FlexItem>
              <FlexItem grow={true}>
                <FormDropdown
                  fluid
                  label="Area Code"
                  items={statesWithArea[inputs['state']].areaCodes}
                  placeholder="415"
                  value={inputs['area_code']}
                  getA11ySelectionMessage={{
                    onAdd: (item) => {
                      const newAreaCode = item?.toString() || '';
                      setInputs((values) => ({
                        ...values,
                        area_code: newAreaCode,
                      }));
                      return '';
                    },
                  }}
                />
              </FlexItem>
            </Flex>
            {phoneNumber}

            <Flex gap="gap.small">
              <Button onClick={handleCancel} content="Cancel" />
              <FormButton
                primary
                content="Done"
                loading={availableNumbersQuery.isLoading || createNumberMutation.isLoading}
                disabled={
                  availableNumbersQuery.isLoading ||
                  availableNumbersQuery.isError ||
                  !availableNumbersQuery.data?.length ||
                  createNumberMutation.isLoading
                }
              />
            </Flex>
            {alert}
          </Form>
        </Flex>
      </div>
    </div>
  );
};
