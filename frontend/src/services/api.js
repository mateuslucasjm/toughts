const BASE = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function removeToken() {
  localStorage.removeItem("token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, opts = {}) {
  const headers = { "Content-Type": "application/json", ...authHeaders(), ...opts.headers };
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro na requisicao");
  return data;
}

/* AUTH */
export function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(name, email, password, confirmpassword) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, confirmpassword }),
  });
}

export function logout() {
  return request("/auth/logout", { method: "POST" });
}

/* TOUGHTS */
export function getToughts(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`/toughts${qs ? "?" + qs : ""}`);
}

export function dashboard() {
  return request("/toughts/dashboard");
}

export function createTought(title) {
  return request("/toughts", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function updateTought(id, title) {
  return request(`/toughts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
  });
}

export function removeTought(id) {
  return request(`/toughts/${id}`, { method: "DELETE" });
}

export function getToughtById(id) {
  return request(`/toughts/${id}`);
}

export { getToken, setToken, removeToken };
