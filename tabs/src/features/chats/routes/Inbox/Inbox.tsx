import { Chat, Flex, Input, Button, SendIcon, Box, Divider } from '@fluentui/react-northstar';
import { useState } from 'react';

import { useAuth } from '../../../../lib/auth';
import { useAppSelector, useAppDispatch } from '../../../../stores/redux/hooks';
import { useGetAllMessages } from '../../api/getAllMessages';
import { useSendMessage } from '../../api/sendMessage';
import { ChatListPane } from '../../components';
import { WebSocket } from '../../components/Inbox.Socket';
import { msgToServerOn, selectActiveReceiverId } from '../../redux/socket.slice';

export type ContentPositionType = 'start' | 'end' | undefined;

const ChatMessagePane = () => {
  //
  // React- Redux related
  //
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    sms: '',
  });

  const { user } = useAuth();

  const senderContactId = user?.meContact.id || '';
  // const activeRoom = useAppSelector(selectActiveRoom);
  const receiverContactId = useAppSelector(selectActiveReceiverId);

  //
  // Socket connection
  //
  // const [socket, setSocket] = useState<Socket | null>(null);

  // useEffect(() => {
  //   const newSocket = io('http://localhost:3100');

  //   newSocket.on('msgToClient', () => {
  //     queryClient.invalidateQueries('allMessages');
  //   });

  //   //TODO: make room dynamic now is for demo purpose
  //   newSocket.emit('joinRoom', 'DemoRoomID');
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.close();
  //   };
  // }, [setSocket]);

  //
  // React Queries
  //
  const sendMessageMutation = useSendMessage();
  const getAllMessages = useGetAllMessages({
    sender_id: senderContactId,
    receiver_id: receiverContactId,
  });

  let messages;
  if (getAllMessages.isSuccess) {
    messages = getAllMessages.data.map((message) => ({
      contentPosition:
        senderContactId === message.sender.id
          ? ('end' as ContentPositionType)
          : ('start' as ContentPositionType),
      key: message.id,
      message: <Chat.Message content={message.sms} mine={senderContactId === message.sender.id} />,
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
        sender_id: senderContactId,
        receiver_id: receiverContactId,
      },
    });
    setInputs((values: any) => ({
      ...values,
      sms: '',
    }));
    // socket?.emit('msgToServer', { room: activeRoom });
    dispatch(msgToServerOn());
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

export const Inbox = () => {
  const receiverContactId = useAppSelector(selectActiveReceiverId);
  const isNoContacts = receiverContactId === '' || receiverContactId === undefined;
  return (
    <Flex styles={{ position: 'relative', height: '100vh', alignItems: 'stretch' }}>
      <WebSocket />
      <ChatListPane />
      {isNoContacts ? <div>Let&apos;s get started by adding a contact </div> : <ChatMessagePane />}
    </Flex>
  );
};
