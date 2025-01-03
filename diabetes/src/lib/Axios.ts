import { API_URL } from '@shangrila-cargo/constant/ApiConstant';
import { TokenService } from '@shangrila-cargo/utils/TokenService';
import axios, { AxiosError, AxiosResponse } from 'axios';

// Refresh token implmentation afer API from BE (Returns response token)
// const refreshAuthToken = async (token: string) => {
//   return Promise.resolve(token);
// };

const httpClient = axios.create({
  baseURL: API_URL,
});

// interface FailedRequest {
//   response: {
//     config: AxiosRequestConfig;
//   };
// }

// const refreshAuth = async (failedRequest: FailedRequest): Promise<void> => {
//   const refreshToken = TokenService.getToken('refresh_token');

//   if (!refreshToken) {
//     TokenService.logout();
//     return Promise.reject(new Error('No refresh Token'));
//   }

//   try {
//     // get response access token
//     const token = await refreshAuthToken('TOKEN');
//     TokenService.setToken({
//       key: 'access_token',
//       value: token,
//     });
//     if (failedRequest.response.config.headers) {
//       failedRequest.response.config.headers['Authorization'] =
//         `Bearer ${token}`;
//     }
//     return Promise.resolve();
//   } catch (error) {
//     TokenService.logout();
//     return Promise.reject(error);
//   }
// };

// createAuthRefreshInterceptor(httpClient, refreshAuth);

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = TokenService.getToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // If a 401 error is returned, log the user out
      TokenService.logout();
    }
    return Promise.reject(error);
  },
);

export { httpClient };
