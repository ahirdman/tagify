import { useEffect } from 'react';
import { Button, Loader } from '../../atoms';

interface Props {
  autoConnect: boolean;
}

const ConnectScreen = ({ autoConnect }: Props) => {
  useEffect(() => {
    if (autoConnect) {
      console.log('removed redirect');
    }
  }, [autoConnect]);

  if (autoConnect) {
    return (
      <div>
        <Button
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
