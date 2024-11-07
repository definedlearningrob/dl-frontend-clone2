import PropTypes from 'prop-types';
import { useEffect } from 'react';

import Message from '@shared/components/Messaging/MainPanel/Messages/Message/Message';
import SharedInfiniteScrollContainer from '@shared/components/InfiniteScrollContainer/InfiniteScrollContainer';
import { TeamMessage } from '@shared/components/Messaging/MainPanel';

MessagingMainPanelMessages.propTypes = {
  fetchMore: PropTypes.func,
  isTeam: PropTypes.bool,
  messages: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          author: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
          }),
          body: PropTypes.string,
        }),
      })
    ),
    pageInfo: PropTypes.shape({
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
    }),
  }),
  messagesEndRef: PropTypes.object,
  ownerUuid: PropTypes.string,
};

function MessagingMainPanelMessages({ messages, fetchMore, messagesEndRef, isTeam, ownerUuid }) {
  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messagesEndRef]);

  const fetchMoreResults = () =>
    fetchMore({
      variables: { after: messages.pageInfo.endCursor },
    });

  const MessageComponent = isTeam ? TeamMessage : Message;

  return (
    <SharedInfiniteScrollContainer
      fetchMore={fetchMoreResults}
      hasNextPage={messages.pageInfo.hasNextPage}
      reverse={true}>
      <div ref={messagesEndRef} />
      {messages.edges.map(({ node }) => (
        <MessageComponent key={node.id} message={node} ownerUuid={ownerUuid} />
      ))}
    </SharedInfiniteScrollContainer>
  );
}

export default MessagingMainPanelMessages;
