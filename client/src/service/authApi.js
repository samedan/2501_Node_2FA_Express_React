import api from "./api";

// REGISTER
export const register = async (username, password) => {
  // POST @backendUrl/api/auth/register
  return await api.post("/auth/register", {
    username,
    password,
  });
};

// LOGIN
export const loginUser = async (username, password) => {
  // POST @backendUrl/api/auth/login
  return await api.post(
    "/auth/login",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

// AuthStatus
export const authStatus = async () => {
  // GET @backendUrl/api/auth/status
  return await api.get("/auth/status", {
    withCredentials: true,
  });
};

// Logout
export const logoutUser = async () => {
  // POST @backendUrl/api/auth/logout
  return await api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

// 2FA Setup
export const setup2FA = async () => {
  // POST @backendUrl/api/auth/2fa/setup
  return await api.post(
    "/auth/2fa/setup",
    {},
    {
      withCredentials: true,
    }
  );
};

// 2FA Verify
export const verify2FA = async (token) => {
  // POST @backendUrl/api/auth/2fa/verify
  return await api.post(
    "/auth/2fa/verify",
    { token },
    {
      withCredentials: true,
    }
  );
};

// 2FA Reset
export const reset2FA = async () => {
  // POST @backendUrl/api/auth/2fa/reset
  return await api.post(
    "/auth/2fa/reset",
    {},
    {
      withCredentials: true,
    }
  );
};
