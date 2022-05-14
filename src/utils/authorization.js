import {environment} from '../environments/development';

const Authorization = {
  headers: {
    Authorization: environment.token,
  },
};

export default Authorization;
