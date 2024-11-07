import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { CONVERSATION_TYPES } from '@dc/resources/constants';
import { RECEIVER_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

import recipientsQuery from '@shared/graphql/shared/query/conversationRecipients';
import findOrCreateConversationMutation from '@shared/graphql/shared/mutations/findOrCreateConversation';
import sendMessageMutation from '@shared/graphql/shared/mutations/sendMessage';
import conversationGroupsQuery from '@shared/graphql/shared/query/conversationGroups';
import conversationQuery from '@shared/graphql/shared/query/conversation';
import conversationsQuery from '@shared/graphql/shared/query/conversations';
import Messaging from '@shared/components/Messaging/Messaging';
import { MessagingProvider } from '@shared/hooks/useMessaging';
import MessagingModal from '@shared/components/Messaging/Modal/Modal';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

// This is because scrollintoView is not implemented in jsdom.
window.HTMLElement.prototype.scrollIntoView = function () {};

const conversationGroupsMock = {
  request: {
    query: conversationGroupsQuery,
    variables: { first: 20 },
  },
  result: {
    data: {
      conversationGroups: {
        edges: [
          {
            node: {
              hasUnreadConversation: false,
              participant: {
                uuid: '1',
                name: 'Bruce Wayne',
                members: [],
                owner: null,
              },
              recentConversation: {
                id: '1',
                recentMessage: {
                  id: '1',
                  body: 'recent message body',
                  createdAt: '2020-01-20',
                },
              },
            },
          },
          {
            node: {
              hasUnreadConversation: true,
              participant: {
                uuid: '2',
                name: 'Peter Parker',
                members: [],
                owner: null,
              },
              recentConversation: {
                id: '2',
                recentMessage: {
                  id: '2',
                  body: 'second recent message body',
                  createdAt: '2020-01-21',
                },
              },
            },
          },
        ],
        pageInfo: {
          startCursor: 'xxx',
          endCursor: 'xxx',
          hasNextPage: true,
        },
      },
    },
  },
};

const getFirstGroupConversationsMock = (participantType) => ({
  request: {
    query: conversationsQuery,
    variables: {
      with: {
        participantUuid: '1',
        participantType,
      },
    },
  },
  result: {
    data: {
      conversations: {
        edges: [
          {
            node: {
              conversationContext: {
                id: '1',
                name: 'First context',
              },
              serviceName: null,
              id: '1',
              messagesRead: true,
              recentMessage: {
                id: '1',
                body: 'recent message body',
                createdAt: '2020-01-15',
              },
            },
          },
          {
            node: {
              conversationContext: {
                id: '2',
                name: 'Second context',
              },
              serviceName: null,
              id: '2',
              messagesRead: false,
              recentMessage: {
                id: '2',
                body: 'third recent message body',
                createdAt: '2020-01-16',
              },
            },
          },
        ],
        pageInfo: {
          startCursor: 'xxx',
          endCursor: 'xxx',
          hasNextPage: true,
        },
      },
    },
  },
});

const getFirstGroupFirstConversationMock = (participantType) => ({
  request: {
    query: conversationQuery,
    variables: {
      id: '1',
      first: 20,
      with: {
        participantUuid: '1',
        participantType,
      },
    },
  },
  result: {
    data: {
      conversation: {
        id: '1',
        conversationContext: {
          id: '1',
          name: 'First context',
        },
        messages: {
          edges: [
            {
              node: {
                author: {
                  uuid: '1',
                  name: 'Bruce Wayne',
                },
                body: 'Hello Peter, whats up?',
                createdAt: '2020.01.20',
                id: '1',
              },
            },
            {
              node: {
                author: {
                  uuid: '2',
                  name: 'Peter Parker',
                },
                body: 'Im fine, thanks Bruce!',
                createdAt: '2020.01.20',
                id: '2',
              },
            },
            {
              node: {
                author: {
                  uuid: '1',
                  name: 'Bruce Wayne',
                },
                body: 'Youre welcome',
                createdAt: '2020.01.20',
                id: '3',
              },
            },
          ],
          pageInfo: {
            startCursor: 'xxx',
            endCursor: 'xxx',
            hasNextPage: true,
          },
        },
        messagesRead: true,
        recentMessage: {
          id: '1',
          body: 'recent message body',
          createdAt: '2020-01-20',
        },
      },
      conversationGroup: {
        hasUnreadConversation: false,
        participant: {
          uuid: '1',
        },
      },
    },
  },
});

const usersQueryMock = {
  request: {
    query: recipientsQuery,
    variables: { perPage: 1000, filter: { nameCont: '' } },
  },
  result: {
    data: {
      conversationRecipients: {
        nodes: [
          {
            uuid: '10',
            name: 'Thor Lovely',
            recipientType: RECEIVER_TYPES.USER,
          },
          {
            uuid: '11',
            name: 'Tony Stark',
            recipientType: RECEIVER_TYPES.USER,
          },
          {
            uuid: '12',
            name: 'Wonder Woman',
            recipientType: RECEIVER_TYPES.USER,
          },
        ],
        nodesCount: 3,
        pagesCount: 1,
      },
    },
  },
};

const studentsQueryMock = {
  request: {
    query: recipientsQuery,
    variables: { perPage: 1000, filter: { nameCont: '' } },
  },
  result: {
    data: {
      conversationRecipients: {
        nodes: [
          {
            archivedAt: '',
            uuid: '10',
            name: 'Thor Lovely',
            recipientType: RECEIVER_TYPES.STUDENT,
            entity: {
              uuid: '1',
              name: 'Harvard',
            },
          },
          {
            archivedAt: '',
            uuid: '11',
            name: 'Tony Stark',
            recipientType: RECEIVER_TYPES.STUDENT,
            entity: {
              uuid: '1',
              name: 'Harvard',
            },
          },
          {
            archivedAt: '',
            uuid: '12',
            name: 'Wonder Woman',
            recipientType: RECEIVER_TYPES.STUDENT,
            entity: {
              uuid: '1',
              name: 'Harvard',
            },
          },
        ],
        nodesCount: 3,
        pagesCount: 1,
      },
    },
  },
};

const defaultMocks = [
  conversationGroupsMock,
  getFirstGroupConversationsMock(RECEIVER_TYPES.USER),
  getFirstGroupConversationsMock(RECEIVER_TYPES.STUDENT),
  getFirstGroupFirstConversationMock(RECEIVER_TYPES.USER),
  getFirstGroupFirstConversationMock(RECEIVER_TYPES.STUDENT),
];

const renderMessaging = (userType, mocks = []) => {
  const receiverTypeMock = userType === 'user' ? studentsQueryMock : usersQueryMock;

  return renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMocks, ...mocks, receiverTypeMock]}>
      <UserInfoProvider
        value={{
          userInfo: {
            uuid: '2',
          },
        }}>
        <NavigationContextProvider>
          <MessagingProvider refreshUser={jest.fn()} userInfo={{ uuid: '2' }}>
            <Messaging />
            <MessagingModal toggleModal={jest.fn()} />
          </MessagingProvider>
        </NavigationContextProvider>
      </UserInfoProvider>
    </MockedProvider>,
    {
      initialState: {
        session: {
          user: {
            type: userType,
          },
        },
      },
    }
  );
};

describe('Messaging', () => {
  describe('Student type', () => {
    it('displays conversation groups properly with recent message', async () => {
      const { getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        const groups = getAllByTestId(/conversation-group/);
        const recentMessageDates = getAllByTestId(/group-recent-message-date/);
        const recentMessageBodies = getAllByTestId(/group-recent-message-body/);

        expect(groups).toHaveLength(2);
        expect(groups[0]).toHaveTextContent('Bruce Wayne');
        expect(groups[1]).toHaveTextContent('Peter Parker');
        expect(recentMessageDates[0]).toHaveTextContent('Jan 20, 2020');
        expect(recentMessageDates[1]).toHaveTextContent('Jan 21, 2020');
        expect(recentMessageBodies[0]).toHaveTextContent('recent message body');
        expect(recentMessageBodies[1]).toHaveTextContent('second recent message body');
      });
    });

    it('displays conversation groups unread status properly', async () => {
      const { getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        const groups = getAllByTestId(/conversation-group/);

        expect(groups[0].classList.contains('hasNewMessage')).toBeFalsy();
        expect(groups[1].classList.contains('hasNewMessage')).toBeTruthy();
      });
    });

    it('selects first group by default and show its context', async () => {
      const { getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);

        expect(contexts).toHaveLength(2);
        expect(contexts[0]).toHaveTextContent('First context');
        expect(contexts[1]).toHaveTextContent('Second context');
      });
    });

    it('displays conversation context recent message properly', async () => {
      const { getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        const recentMessageDates = getAllByTestId(/conversation-recent-message-date/);
        const recentMessageBodies = getAllByTestId(/conversation-recent-message-body/);

        expect(recentMessageDates[0]).toHaveTextContent('Jan 15, 2020');
        expect(recentMessageDates[1]).toHaveTextContent('Jan 16, 2020');
        expect(recentMessageBodies[0]).toHaveTextContent('recent message body');
        expect(recentMessageBodies[1]).toHaveTextContent('third recent message body');
      });
    });

    it('displays conversation context unread status properly', async () => {
      const { getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);

        expect(contexts[0].classList.contains('hasNewMessage')).toBeFalsy();
        expect(contexts[1].classList.contains('hasNewMessage')).toBeTruthy();
      });
    });

    it('shows conversation messages properly', async () => {
      const { getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);
        fireEvent.click(contexts[0]);
      });

      await waitFor(() => {
        const messages = getAllByTestId(/conversation-message/);

        expect(messages).toHaveLength(3);
        expect(messages[0]).toHaveTextContent('Hello Peter, whats up?');
        expect(messages[1]).toHaveTextContent('Im fine, thanks Bruce!');
        expect(messages[2]).toHaveTextContent('Youre welcome');
      });
    });

    it('adds proper class to author messages', async () => {
      const { getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);
        fireEvent.click(contexts[0]);
      });

      await waitFor(() => {
        const messages = getAllByTestId(/conversation-message/);

        expect(messages).toHaveLength(3);
        expect(messages[0].classList.contains('isAuthor')).toBeFalsy();
        expect(messages[1].classList.contains('isAuthor')).toBeTruthy();
        expect(messages[2].classList.contains('isAuthor')).toBeFalsy();
      });
    });

    it('allows to send message', async () => {
      const sendMessageSpy = jest.fn();

      const sendMessageMock = {
        request: {
          query: sendMessageMutation,
          variables: { input: { conversationId: '1', body: 'Good bye!' } },
        },
        result() {
          sendMessageSpy();

          return {
            data: {
              sendMessage: {
                message: {
                  author: {
                    uuid: '2',
                    name: 'Peter Parker',
                  },
                  id: '4',
                  body: 'Good bye!',
                  createdAt: '2020-02-01',
                },
              },
            },
          };
        },
      };
      const { getAllByTestId, getByTestId } = renderMessaging('student', [sendMessageMock]);

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);
        fireEvent.click(contexts[0]);
      });

      await waitFor(() => {
        fireEvent.change(getByTestId(/messages-text-area/), { target: { value: 'Good bye!' } });
      });

      await waitFor(() => {
        fireEvent.click(getByTestId(/send-button/));
      });

      await waitFor(() => {
        expect(sendMessageSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('opens modal on create conversation click', async () => {
      const { getByTestId } = renderMessaging('student');

      await waitFor(() => {
        fireEvent.click(getByTestId(/create-conversation/));
      });

      await waitFor(() =>
        expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument()
      );
    });

    it('allows to select receiver', async () => {
      const { getByTestId, getAllByTestId } = renderMessaging('student');

      await waitFor(() => {
        fireEvent.click(getByTestId(/create-conversation/));
      });

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        const options = getAllByTestId(/option/);

        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('Thor Lovely');
        expect(options[1]).toHaveTextContent('Tony Stark');
        expect(options[2]).toHaveTextContent('Wonder Woman');
      });

      await waitFor(() => fireEvent.click(getAllByTestId(/option/)[1]));

      await waitFor(() => {
        expect(getByTestId(/selected-option/)).toHaveTextContent('Tony Stark');
      });
    });

    it('unlocks send message button only when message and receiver', async () => {
      renderMessaging('student');

      await waitFor(() => {
        fireEvent.click(screen.getByTestId(/create-conversation/));
      });

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        const options = screen.getAllByTestId(/option/);
        fireEvent.click(options[1]);
      });

      await waitFor(() => {
        expect(screen.getByTestId(/send-message-button/)).toHaveAttribute('disabled');
      });

      await waitFor(() => {
        fireEvent.change(screen.getByTestId(/new-conversation-text-area/), {
          target: { value: 'Hello Tony!' },
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId(/send-message-button/)).not.toHaveAttribute('disabled');
      });
    });

    it('creates general conversation with sending message properly', async () => {
      const findOrcreateConversationSpy = jest.fn();
      const sendMessageSpy = jest.fn();

      const findOrcreateConversationMock = {
        request: {
          query: findOrCreateConversationMutation,
          variables: {
            input: {
              receiverType: RECEIVER_TYPES.USER,
              receiverUuid: '11',
              type: CONVERSATION_TYPES.GENERAL,
            },
          },
        },
        result() {
          findOrcreateConversationSpy();

          return {
            data: {
              findOrCreateConversation: {
                conversation: {
                  id: '5',
                },
              },
            },
          };
        },
      };

      const sendMessageMock = {
        request: {
          query: sendMessageMutation,
          variables: { input: { conversationId: '5', body: 'Hello Tony!' } },
        },
        result() {
          sendMessageSpy();

          return {
            data: {
              sendMessage: {
                message: {
                  author: {
                    uuid: '2',
                    name: 'Peter Parker',
                  },
                  id: '5',
                  body: 'Hello Tony!',
                  createdAt: '2020-02-01',
                },
              },
            },
          };
        },
      };

      const groupRefetch = conversationGroupsMock;
      const conversationsRefetch = {
        request: {
          query: conversationsQuery,
          variables: {
            with: {
              participantUuid: '11',
              participantType: RECEIVER_TYPES.USER,
            },
          },
        },
        result: {
          data: {
            conversations: {
              edges: [],
              pageInfo: {
                startCursor: 'xxx',
                endCursor: 'xxx',
                hasNextPage: false,
              },
            },
          },
        },
      };

      const { getByTestId, getAllByTestId } = renderMessaging('student', [
        findOrcreateConversationMock,
        sendMessageMock,
        groupRefetch,
        conversationsRefetch,
      ]);

      await waitFor(() => {
        fireEvent.click(getByTestId(/create-conversation/));
      });

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        const options = getAllByTestId(/option/);
        fireEvent.click(options[1]);
      });

      await waitFor(() => {
        fireEvent.change(getByTestId(/new-conversation-text-area/), {
          target: { value: 'Hello Tony!' },
        });
      });

      await waitFor(() => fireEvent.click(getByTestId(/send-message-button/)));

      await waitFor(() => {
        expect(findOrcreateConversationSpy).toHaveBeenCalledTimes(1);
        expect(sendMessageSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('User type', () => {
    it('displays conversation groups properly with recent', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const groups = getAllByTestId(/conversation-group/);

        expect(groups).toHaveLength(2);
        expect(groups[0]).toHaveTextContent('Bruce Wayne');
        expect(groups[1]).toHaveTextContent('Peter Parker');
      });
    });

    it('displays conversation groups recent message properly', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const recentMessageDates = getAllByTestId(/group-recent-message-date/);
        const recentMessageBodies = getAllByTestId(/group-recent-message-body/);

        expect(recentMessageDates[0]).toHaveTextContent('Jan 20, 2020');
        expect(recentMessageDates[1]).toHaveTextContent('Jan 21, 2020');
        expect(recentMessageBodies[0]).toHaveTextContent('recent message body');
        expect(recentMessageBodies[1]).toHaveTextContent('second recent message body');
      });
    });

    it('displays conversation groups unread status properly', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const groups = getAllByTestId(/conversation-group/);

        expect(groups[0].classList.contains('hasNewMessage')).toBeFalsy();
        expect(groups[1].classList.contains('hasNewMessage')).toBeTruthy();
      });
    });

    it('selects first group by default and show its context', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);

        expect(contexts).toHaveLength(2);
        expect(contexts[0]).toHaveTextContent('First context');
        expect(contexts[1]).toHaveTextContent('Second context');
      });
    });

    it('displays conversation context recent message properly', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const recentMessageDates = getAllByTestId(/conversation-recent-message-date/);
        const recentMessageBodies = getAllByTestId(/conversation-recent-message-body/);

        expect(recentMessageDates[0]).toHaveTextContent('Jan 15, 2020');
        expect(recentMessageDates[1]).toHaveTextContent('Jan 16, 2020');
        expect(recentMessageBodies[0]).toHaveTextContent('recent message body');
        expect(recentMessageBodies[1]).toHaveTextContent('third recent message body');
      });
    });

    it('displays conversation context unread status properly', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);

        expect(contexts[0].classList.contains('hasNewMessage')).toBeFalsy();
        expect(contexts[1].classList.contains('hasNewMessage')).toBeTruthy();
      });
    });

    it('shows conversation messages properly', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);
        fireEvent.click(contexts[0]);
      });

      await waitFor(() => {
        const messages = getAllByTestId(/conversation-message/);

        expect(messages).toHaveLength(3);
        expect(messages[0]).toHaveTextContent('Hello Peter, whats up?');
        expect(messages[1]).toHaveTextContent('Im fine, thanks Bruce!');
        expect(messages[2]).toHaveTextContent('Youre welcome');
      });
    });

    it('adds proper class to author messages', async () => {
      const { getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);
        fireEvent.click(contexts[0]);
      });

      await waitFor(() => {
        const messages = getAllByTestId(/conversation-message/);

        expect(messages).toHaveLength(3);
        expect(messages[0].classList.contains('isAuthor')).toBeFalsy();
        expect(messages[1].classList.contains('isAuthor')).toBeTruthy();
        expect(messages[2].classList.contains('isAuthor')).toBeFalsy();
      });
    });

    it('allows to send message', async () => {
      const sendMessageSpy = jest.fn();

      const sendMessageMock = {
        request: {
          query: sendMessageMutation,
          variables: { input: { conversationId: '1', body: 'Good bye!' } },
        },
        result() {
          sendMessageSpy();

          return {
            data: {
              sendMessage: {
                message: {
                  author: {
                    uuid: '2',
                    name: 'Peter Parker',
                  },
                  id: '4',
                  body: 'Good bye!',
                  createdAt: '2020-02-01',
                },
              },
            },
          };
        },
      };
      const { getAllByTestId, getByTestId } = renderMessaging('user', [sendMessageMock]);

      await waitFor(() => {
        const contexts = getAllByTestId(/conversation-context/);
        fireEvent.click(contexts[0]);
      });

      await waitFor(() => {
        fireEvent.change(getByTestId(/messages-text-area/), { target: { value: 'Good bye!' } });
      });

      await waitFor(() => {
        fireEvent.click(getByTestId(/send-button/));
      });

      await waitFor(() => {
        expect(sendMessageSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('opens modal on create conversation click', async () => {
      const { getByTestId } = renderMessaging('user');

      await waitFor(() => {
        fireEvent.click(getByTestId(/create-conversation/));
      });

      await waitFor(() =>
        expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument()
      );
    });

    it('allows to select receiver', async () => {
      const { getByTestId, getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        fireEvent.click(getByTestId(/create-conversation/));
      });

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        const options = getAllByTestId(/option/);

        expect(options).toHaveLength(3);
        expect(options[0]).toHaveTextContent('Thor Lovely');
        expect(options[1]).toHaveTextContent('Tony Stark');
        expect(options[2]).toHaveTextContent('Wonder Woman');
      });

      await waitFor(() => {
        fireEvent.click(getAllByTestId(/option/)[1]);
      });

      await waitFor(() => {
        expect(getByTestId(/selected-option/)).toHaveTextContent('Tony Stark');
      });
    });

    it('unlocks send message button only when message and receiver', async () => {
      const { getByTestId, getAllByTestId } = renderMessaging('user');

      await waitFor(() => {
        fireEvent.click(getByTestId(/create-conversation/));
      });

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        const options = getAllByTestId(/option/);
        fireEvent.click(options[1]);
      });

      await waitFor(() => {
        expect(getByTestId(/send-message-button/)).toHaveAttribute('disabled');
      });

      await waitFor(() => {
        fireEvent.change(getByTestId(/new-conversation-text-area/), {
          target: { value: 'Hello Tony!' },
        });
      });

      await waitFor(() => {
        expect(getByTestId(/send-message-button/)).not.toHaveAttribute('disabled');
      });
    });

    it('creates general conversation with sending message properly', async () => {
      const findOrcreateConversationSpy = jest.fn();
      const sendMessageSpy = jest.fn();
      const findOrcreateConversationMock = {
        request: {
          query: findOrCreateConversationMutation,
          variables: {
            input: {
              receiverType: RECEIVER_TYPES.STUDENT,
              receiverUuid: '11',
              type: CONVERSATION_TYPES.GENERAL,
            },
          },
        },
        result() {
          findOrcreateConversationSpy();

          return {
            data: {
              findOrCreateConversation: {
                conversation: {
                  id: '5',
                },
              },
            },
          };
        },
      };

      const sendMessageMock = {
        request: {
          query: sendMessageMutation,
          variables: { input: { conversationId: '5', body: 'Hello Tony!' } },
        },
        result() {
          sendMessageSpy();

          return {
            data: {
              sendMessage: {
                message: {
                  author: {
                    uuid: '2',
                    name: 'Peter Parker',
                  },
                  id: '5',
                  body: 'Hello Tony!',
                  createdAt: '2020-02-01',
                },
              },
            },
          };
        },
      };

      const groupRefetch = conversationGroupsMock;
      const conversationsRefetch = {
        request: {
          query: conversationsQuery,
          variables: {
            with: {
              participantUuid: '11',
              participantType: RECEIVER_TYPES.STUDENT,
            },
          },
        },
        result: {
          data: {
            conversations: {
              edges: [],
              pageInfo: {
                startCursor: 'xxx',
                endCursor: 'xxx',
                hasNextPage: false,
              },
            },
          },
        },
      };

      renderMessaging('user', [
        findOrcreateConversationMock,
        sendMessageMock,
        groupRefetch,
        conversationsRefetch,
      ]);

      await waitFor(() => {
        fireEvent.click(screen.getByTestId(/create-conversation/));
      });

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        const options = screen.getAllByTestId(/option/);
        fireEvent.click(options[1]);
      });

      await waitFor(() => {
        fireEvent.change(screen.getByTestId(/new-conversation-text-area/), {
          target: { value: 'Hello Tony!' },
        });
      });

      await waitFor(() => fireEvent.click(screen.getByTestId(/send-message-button/)));

      await waitFor(() => {
        expect(findOrcreateConversationSpy).toHaveBeenCalledTimes(1);
        expect(sendMessageSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
