import * as React from 'react';

interface NotificationBarContextType {
  Show: Boolean;
  Message: string;
  showBar?: () => void;
}

interface showBarType {
  msg:string;
  status:string;
}

// Global sequence number, incremented every time a query is run
export const NotificationBarContext = React.createContext<NotificationBarContextType | null>(null);

const NotificationBarProvider: React.FC<React.ReactNode> = ({ children }: any) => {
  const [Show, setShow] = React.useState<boolean>(false);
  const [Message, setMessage] = React.useState<string>('');
  const [Status, setStatus] = React.useState<string>('');


  const showBar = (msg, status) => {
    setMessage(msg)
    setStatus(status)
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };


  return <NotificationBarContext.Provider value={{ Show,Status, Message, showBar, setMessage }}>{children}</NotificationBarContext.Provider>;
};

export default NotificationBarProvider;