import { LoginFormData } from "./types/LoginUser";
import RegisterFormData from "./types/RegisterUser";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function registerUser(formData: RegisterFormData) {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    // In every post request, include http cookie along with the request. And
    // also set the cookie that is returned back by the server on the broswer
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
}

export async function loginUser(formData: LoginFormData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
}

export async function validateToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
}

export async function signOut() {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error during signOut");
  }
}
