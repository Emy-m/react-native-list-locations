import {environment} from '../environment/development';

const Authorization = {
  headers: {
    Authorization: environment.token,
  },
};

export default Authorization;
