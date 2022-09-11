import * as React from 'react';
import { AuthButton, Loader } from '../../atoms';

interface Props {
  autoConnect: boolean;
}

const ConnectScreen = ({ autoConnect }: Props) => {
  React.useEffect(() => {
    if (autoConnect) {
      console.log('removed redirect');
    }
  }, [autoConnect]);

  if (autoConnect) {
    return (
      <div>
        <AuthButton
          title="CONNECT TO SPOTIFY"
          onClick={() => console.log('removed redirect')}
          backgroundColor="#1bd760"
        />
        Connecting...
      </div>
    );
  } else {
    return (
      <div>
        <Loader />
        Connecting...
      </div>
    );
  }
};

export default ConnectScreen;
