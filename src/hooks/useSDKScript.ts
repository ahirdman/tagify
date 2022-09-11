import * as React from 'react';

const useSDKScript = () => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('id', 'spotPlayer');
    script.src = process.env.REACT_APP_SDKURL as string;
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      setReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return ready;
};

export default useSDKScript;
