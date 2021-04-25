// 对于用户操作的接口管理
import axios from '../axios';

export default {
  login(params) {
    return axios.post('/passport/login', params)
      .then((res) => res)
      .catch((err) => Promise.reject(err));
  },
};
