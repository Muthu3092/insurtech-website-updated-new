import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://endpoint.afinity.ai";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const TOKEN_KEY = "afinity_token";
const USER_KEY = "afinity_user";

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getUser: () => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setSession: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

api.interceptors.request.use((config) => {
  const t = auth.getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // token expired - clear
      auth.clear();
    }
    return Promise.reject(err);
  }
);

// ----- Endpoints -----
export const endpoints = {
  products: () => api.get("/api/products"),
  health: () => api.get("/api/health"),
  signup: (payload) => api.post("/api/auth/signup", payload),
  login: (email, password) => api.post("/api/auth/login", { email, password }),
  me: () => api.get("/api/auth/me"),
};
