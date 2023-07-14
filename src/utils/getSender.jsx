export const getSender = (user, users) => {
  return users[0]?._id === user?._id ? users[1]?.name : users[0]?.name;
};

export const getPic = (user, users) => {
  return users[0]?._id === user?._id ? users[1]?.pic : users[0]?.pic;
};

export const getSenderInfo = (user, users) => {
  return users[0]?._id === user?._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender?._id === m?.sender?._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    messages[i]?.id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  console.log(messages[messages.length - 1]?.sender?._id);
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1]?.sender?._id !== userId &&
    messages[messages.length - 1]?.sender?._id
  );
};
