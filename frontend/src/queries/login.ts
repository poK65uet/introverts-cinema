import axios from 'axios';
import config from 'config';

export const login =  async (email: string, password: string): Promise<boolean> => {
  const response = await axios.post(`${config.apiEndpoint}/login`,{
    email: email,
    password: password
  })
  
  if (response.data.data.user == null) {
    return false;
  } else {
    return true;
  }
};

