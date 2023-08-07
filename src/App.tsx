import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './context/types';
import { setUserInfo } from './context/actions';

interface UserInfo {
  ip: string;
  region: string;
  city: string;
  country: string;
  browser: string;
  os: string;
  resolution: string;
  deviceType: string;
}

const App: React.FC = () => {


  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
      }
    };

    const handleKeyDownSecond = (event: KeyboardEvent) => {
      if (event.key === 'F12') {
        event.preventDefault();
      }
    };
    const handleKeyDownThird = (event: KeyboardEvent) => {
      if (event.key === 'F') {
        event.preventDefault();
      }
    };

    const handleKeyDownFourth = (event: KeyboardEvent) => {
      if (event.key === 'CTRL') {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDownSecond);
    document.addEventListener('keydown', handleKeyDownThird);
    document.addEventListener('keydown', handleKeyDownFourth);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleKeyDownSecond);
      document.removeEventListener('keydown', handleKeyDownThird);
      document.removeEventListener('keydown', handleKeyDownFourth);
    };
  }, []);

  const userInfo = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        const locationData = await locationResponse.json();

        const newUserInfo: UserInfo = {
          ip,
          region: locationData.region,
          city: locationData.city,
          country: locationData.country_name,
          browser: navigator.userAgent,
          os: navigator.platform,
          resolution: `${window.screen.width}x${window.screen.height}`,
          deviceType: getDeviceType(),
        };

        dispatch(setUserInfo(newUserInfo));
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const getCurrentTime = (): string => {
    const date = new Date();
    return date.toLocaleTimeString();
  };

  const getDeviceType = (): string => {
    const userAgent = navigator.userAgent;
    if (/mobile/i.test(userAgent)) {
      return 'Mobile';
    } else if (/tablet/i.test(userAgent)) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  };

  return (
    <div className='action_display'>
      <h1 className='first_content'>User Information</h1>
      {userInfo ? (
        <div className='action_display_info'>
          <p><span>IP Address:</span> {userInfo.ip}</p>
          <p><span>City:</span> {userInfo.city}</p>
          <p><span>Country:</span>  {userInfo.country}</p>
          <p><span>Browser:</span> {userInfo.browser}</p>
          <p><span>Operating System:</span> {userInfo.os}</p>
          <p><span>Resolution:</span> {userInfo.resolution}</p>
          <p><span>Device Type:</span> {userInfo.deviceType}</p>
          <p><span>Current Time:</span> {getCurrentTime()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
