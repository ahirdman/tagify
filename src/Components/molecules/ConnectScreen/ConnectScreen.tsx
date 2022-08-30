import * as React from 'react';
import { AuthButton } from '../../atoms';
import './ConnectScreen.scss';

interface Props {
  autoConnect: boolean;
}

const ConnectScreen = ({ autoConnect }: Props) => {
  React.useEffect(() => {
    if (autoConnect) {
      console.log('removed redirect');
    }
  }, [autoConnect]);

  return (
    <div>
      {!autoConnect && (
        <AuthButton
          title="CONNECT TO SPOTIFY"
          onClick={() => console.log('removed redirect')}
          backgroundColor="#1bd760"
        />
      )}
      Connecting...
    </div>
  );
};

export default ConnectScreen;
