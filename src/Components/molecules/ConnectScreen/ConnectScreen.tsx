import * as React from 'react';
import { handleLogIn } from '@utils/modules/modules';
import { AuthButton } from '@components/atoms';
import './ConnectScreen.scss';

interface IConnectScreenProps {
  autoConnect: boolean;
}

const ConnectScreen = ({ autoConnect }: IConnectScreenProps) => {
  React.useEffect(() => {
    if (autoConnect) {
      handleLogIn();
    }
  }, [autoConnect]);

  return (
    <div>
      {!autoConnect && (
        <AuthButton
          title="CONNECT TO SPOTIFY"
          onClick={handleLogIn}
          backgroundColor="#1bd760"
        />
      )}
      Connecting...
    </div>
  );
};

export default ConnectScreen;
