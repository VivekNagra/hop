import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@shangrila-cargo/constant';
import Cookie from 'js-cookie';

interface TokenDetails {
  name?: string;
  role?: string;
  [key: string]: string | number | undefined;
}

const getToken = (
  token_name:
    | typeof ACCESS_TOKEN_KEY
    | typeof REFRESH_TOKEN_KEY = ACCESS_TOKEN_KEY,
): string | undefined => {
  return Cookie.get(token_name);
};

const setToken = ({
  key,
  value,
}: {
  key: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY;
  value: string;
}): void => {
  Cookie.set(key, value);
};

const getTokenDetails = (token_data?: string): TokenDetails => {
  try {
    const token = token_data || getToken();
    if (!token) return {};

    // Check for correct token format
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return {}; // Return empty object if token format is invalid
    }

    // Decode and parse the payload
    const decodedPayload = JSON.parse(
      window.atob(tokenParts[1]),
    ) as TokenDetails;

    return decodedPayload;
  } catch {
    return {}; // Return empty object in case of any error
  }
};

const logout = (): void => {
  Cookie.remove(ACCESS_TOKEN_KEY);
  Cookie.remove(REFRESH_TOKEN_KEY);
};

const TokenService = {
  getToken,
  setToken,
  getTokenDetails,
  logout,
};

export { TokenService };
