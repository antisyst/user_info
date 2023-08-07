export interface UserInfo {
    ip: string;
    region: string;
    city: string;
    country: string;
    browser: string;
    os: string;
    resolution: string;
    deviceType: string;
  }
  
  export interface RootState {
    userInfo: UserInfo | null;
  }
  