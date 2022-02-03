import { AcceptIcon } from '@fluentui/react-icons-northstar';
import {
  Avatar,
  Chat,
  Divider,
  ChatItemProps as FUChatItemProps,
  Flex,
} from '@fluentui/react-northstar';
import React from 'react';

import { ChatList } from '../../components/ChatList';
const robinAvatar = {
  image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
  status: {
    color: 'green',
    icon: AcceptIcon,
  },
};

type ChatItemProps = FUChatItemProps & {
  key: string;
};

const items: Array<ChatItemProps> = [
  {
    message: (
      <Chat.Message content="Hello" author="Cecil Folk" timestamp="Yesterday, 10:15 PM" mine />
    ),
    contentPosition: 'end',
    attached: 'top',
    key: 'message-id-1',
  },
  {
    message: (
      <Chat.Message content="I'm back!" author="Cecil Folk" timestamp="Yesterday, 10:15 PM" mine />
    ),
    contentPosition: 'end',
    attached: true,
    key: 'message-id-2',
  },
  {
    message: (
      <Chat.Message
        content={{
          content: (
            <div>
              What do you think about <a href="http://www.goodFood.com">www.goodFood.com</a>?
            </div>
          ),
        }}
        author="Cecil Folk"
        timestamp="Yesterday, 10:15 PM"
        mine
      />
    ),
    contentPosition: 'end',
    attached: 'bottom',
    key: 'message-id-3',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: <Chat.Message content="Hi" author="Robin Counts" timestamp="Yesterday, 10:15 PM" />,
    attached: 'top',
    key: 'message-id-4',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message content="Looks good!" author="Robin Counts" timestamp="Yesterday, 10:15 PM" />
    ),
    attached: true,
    key: 'message-id-5',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content={
          <div>
            I also like <a href="#">www.goodFood2.com</a>.
          </div>
        }
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
      />
    ),
    attached: 'bottom',
    key: 'message-id-6',
  },
  {
    message: (
      <Chat.Message
        content="Would you like to grab lunch there?"
        author="Cecil Folk"
        timestamp="Yesterday, 10:16 PM"
        mine
      />
    ),
    contentPosition: 'end',
    key: 'message-id-7',
  },
  {
    gutter: <Avatar {...robinAvatar} />,
    message: (
      <Chat.Message
        content="Sure! Let's try it."
        author="Robin Counts"
        timestamp="Yesterday, 10:15 PM"
      />
    ),
    key: 'message-id-8',
  },
  {
    children: <Divider content="Today" color="brand" important />,
    key: 'message-id-9',
  },
  {
    message: (
      <Chat.Message content="Ok, let's go." author="Cecil Folk" timestamp="Today, 11:15 PM" mine />
    ),
    contentPosition: 'end',
    key: 'message-id-10',
  },
];

export const Inbox = () => (
  <Flex>
    <ChatList />
    <Chat items={items} styles={{ height: '100vh' }} />
  </Flex>
);
