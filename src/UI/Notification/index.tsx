import React from 'react';

interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
