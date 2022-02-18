import {
  Chat,
  Flex,
  Input,
  List,
  Image,
  Divider,
  Button,
  SendIcon,
  Box,
} from '@fluentui/react-northstar';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { queryClient } from '../../../../lib/react-query';
import { useGetAllMessages } from '../../api/getAllMessages';
import { useSendMessage } from '../../api/sendMessage';

type ContentPositionType = 'start' | 'end' | undefined;

const items = [
  {
    key: 'Baymax',
    media: (
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
        avatar
      />
    ),
    header: 'Baymax',
  },
];

const PinnedChatList = () => <List selectable defaultSelectedIndex={0} items={items} />;

const RecentChatList = () => <List selectable />;

const ChatListPane = () => (
  <Flex
    column
    styles={{
      width: '300px',
      overflowY: 'scroll',
    }}
  >
    <PinnedChatList />
    <RecentChatList />
  </Flex>
);

const demoSender = {
  id: '19111290-8cf4-478f-97c6-a46b0fa0d178',
  name: 'David Lee',
  email: 'david@clerk.chat',
  phone_number: '4158912697',
  user_id: '877da02e-394f-4fc7-b979-4b7ee5f18349',
};

const demoReceiver = {
  id: '10a6cb1b-2547-4f84-a248-3ae894293188',
  name: 'Baymax',
  email: 'baymax@clerk.chat',
  phone_number: '9402772691',
  user_id: 'df168f6b-e6d1-4fb1-94a8-3499941a9773',
};

const ChatMessagePane = () => {
  const [inputs, setInputs] = useState({
    sms: '',
  });

  //
  // Socket connection
  //
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3100');

    newSocket.on('msgToClient', () => {
      queryClient.invalidateQueries('allMessages');
    });

    //TODO: make room dynamic now is for demo purpose
    newSocket.emit('joinRoom', 'DemoRoomID');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  //
  // React Queries
  //
  const sendMessageMutation = useSendMessage();
  const getAllMessages = useGetAllMessages({
    sender_id: demoSender.id,
    receiver_id: demoReceiver.id,
  });

  let messages;
  if (getAllMessages.isSuccess) {
    messages = getAllMessages.data.map((message) => ({
      contentPosition:
        demoSender.id === message.sender.id
          ? ('end' as ContentPositionType)
          : ('start' as ContentPositionType),
      key: message.id,
      message: <Chat.Message content={message.sms} mine={demoSender.id === message.sender.id} />,
    }));
  }

  //
  // Handle user inputs & events
  //

  /**
   * Handles input field onChange event
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

  const handleSendClick = async () => {
    await sendMessageMutation.mutateAsync({
      data: {
        sms: inputs.sms,
        sender_id: demoSender.id,
        receiver_id: demoReceiver.id,
      },
    });
    setInputs((values: any) => ({
      ...values,
      sms: '',
    }));
    socket?.emit('msgToServer', { room: 'DemoRoomID' });
  };

  return (
    <Flex
      fill
      column
      padding="padding.medium"
      styles={{ position: 'relative', overflowY: 'scroll' }}
    >
      <Chat items={messages} style={{ flexGrow: 1, overflowY: 'scroll' }} />
      <Divider />
      <Input
        name="sms"
        onChange={handleChange}
        fluid
        placeholder="Type a new message"
        value={inputs.sms}
      />
      <Box>
        <Button
          loading={sendMessageMutation.isLoading}
          onClick={handleSendClick}
          iconOnly
          icon={<SendIcon />}
          text
        />
      </Box>
    </Flex>
  );
};

export const Inbox = () => (
  <Flex styles={{ position: 'relative', height: '100vh', alignItems: 'stretch' }}>
    <ChatListPane />
    <ChatMessagePane />
  </Flex>
);
