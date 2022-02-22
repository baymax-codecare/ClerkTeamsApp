import {
  List,
  AcceptIcon,
  Flex,
  Input,
  Button,
  Popup,
  ChevronDownIcon,
  FilterIcon,
  ComposeIcon,
  Text,
  Image,
} from '@fluentui/react-northstar';
import { useState } from 'react';

import { Spinner } from '../../../components/elements';
// import { useAuth } from '../../../lib/auth';
import { useNotificationStore, NotificationType } from '../../../stores/notifications';
import { useAppDispatch } from '../../../stores/redux/hooks';
// import { generateRoomId } from '../../../utils/generateRoom';
import { useCreateContact } from '../api/createContact';
import { useGetContacts } from '../api/getContacts';
import { setActiveReceiverId } from '../redux/socket.slice';

/**
 * 'Add Contact Popup' react component
 * @returns AddContactPopup ReactCompnent
 */
const AddContactPopup = () => {
  const [open, setOpen] = useState(false); // 'Add Contact' popup toggle flag

  // Inputs states ex: name, phoneNumber, email
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const createContactMutation = useCreateContact(); // Add Contact mutation

  /**
   * @function
   * Close 'Add Contact' Popup
   */
  const closePopup = () => {
    setOpen(false);
  };

  /**
   * @function
   * Handles input changes
   * @param event
   */
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({
      ...values,
      [name]: value,
    }));
  };

  /**
   * @function
   * handles 'Add' button of 'Add Contact' Popup
   */
  const handleAddContact = async () => {
    await createContactMutation.mutateAsync({
      data: {
        name: inputs.name,
        email: inputs.email,
        phoneNumber: inputs.phoneNumber,
      },
    });

    // Add success notification
    if (createContactMutation.isSuccess) {
      useNotificationStore.getState().addNotification({
        type: NotificationType.SUCCESS,
        title: <AcceptIcon />,
        message: 'Contact is added successfully',
      });
      closePopup();
    }
  };

  const popupContent = (
    <Flex gap="gap.small" column>
      <Text size="medium">Add a contact</Text>
      <Input
        fluid
        name="name"
        required
        placeholder="First and last name"
        onChange={handleChange}
        value={inputs.name}
      />
      <Input
        fluid
        name="phoneNumber"
        required
        placeholder="Phone number"
        onChange={handleChange}
        value={inputs.phoneNumber}
      />
      <Flex gap="gap.small">
        <Flex.Item push>
          <Button content="Cancel" onClick={closePopup} />
        </Flex.Item>
        <Button
          loading={createContactMutation.isLoading}
          primary
          content="Add"
          onClick={handleAddContact}
        />
      </Flex>
    </Flex>
  );

  return (
    <Popup
      open={open as boolean}
      onOpenChange={(e, open) => setOpen(open as boolean)}
      trigger={<Button iconOnly icon={<ComposeIcon />} text />}
      content={{
        content: popupContent,
      }}
      trapFocus
    />
  );
};

/**
 * Toolbar of ChatListPane
 * @returns Toolbar
 */
const ChatToolBar = () => {
  return (
    <Flex padding="padding.medium" style={{ justifyContent: 'space-between' }}>
      <Popup
        content={
          <Flex column>
            <Button
              styles={{ justifyContent: 'left', paddingLeft: 0, paddingRight: 0 }}
              text
              content="Chat"
              icon={<AcceptIcon />}
              iconPosition="after"
            />
            <Button
              styles={{ justifyContent: 'left', paddingLeft: 0, paddingRight: 0 }}
              text
              content="Contacts"
              iconPosition="after"
            />
          </Flex>
        }
        trigger={
          <Button
            text
            content={<Text size="large">Chat</Text>}
            size="medium"
            icon={<ChevronDownIcon />}
            iconPosition="after"
          />
        }
      />
      <Flex style={{ alignItems: 'end' }}>
        <Button text icon={<FilterIcon />} iconOnly />
        <AddContactPopup />
      </Flex>
    </Flex>
  );
};

const PinnedChatList = () => <List selectable defaultSelectedIndex={0} />;

const RecentChatList = () => {
  const getContacts = useGetContacts(); // react-query to get contacts
  const { data, isLoading, isSuccess, isError } = getContacts;
  // const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const dispatch = useAppDispatch();
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text size="medium">Fetching contacts failed for some reason</Text>;
  }

  if (isSuccess && data && data?.length <= 0) {
    return <Text size="medium">Let&apos;s get started by adding a contact</Text>;
  }

  const recentChatItems = data?.map((contact) => ({
    key: contact.id,
    header: `${contact.name}(${contact.phoneNumber})`,
    media: (
      <Image
        src="https://avatars.dicebear.com/v2/female/389d880209ba01ce367bb03c488ad887.svg"
        avatar
      />
    ),
  }));
  return (
    <List
      selectable
      defaultSelectedIndex={0}
      items={recentChatItems}
      selectedIndex={index}
      onSelectedIndexChange={(e, newProps) => {
        const newIndex = newProps?.selectedIndex || 0;
        setIndex(newIndex);

        const receiverId: string = (data && data[newIndex].id) || '';
        // const receiverNumber: string = (data && data[newIndex].phoneNumber) || '';
        dispatch(setActiveReceiverId(receiverId));
        // const room = generateRoomId(receiverNumber, user?.meContact.phoneNumber || '');
        // const room = receiverNumber;
        // dispatch(setActiveRoom(room));
      }}
    />
  );
};

export const ChatListPane = () => {
  return (
    <Flex
      column
      styles={{
        width: '300px',
        overflowY: 'scroll',
      }}
    >
      <ChatToolBar />
      <PinnedChatList />
      <RecentChatList />
    </Flex>
  );
};
