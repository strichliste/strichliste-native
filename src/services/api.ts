const API_URL = "https://demo.strichliste.org/api/";

export async function fetchJson(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  return fetch(`${API_URL}${endpoint}`, options).then(async res => res.json());
}

export async function post(endpoint: string, params: any): Promise<any> {
  const options: RequestInit = {
    mode: "cors",
    method: "POST",
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json; charset=utf-8" }
  };
  return fetch(`${API_URL}${endpoint}`, options).then(async res => res.json());
}

export async function get(endpoint: string): Promise<any> {
  return fetch(`${API_URL}${endpoint}`).then(async res => res.json());
}

export async function restDelete(endpoint: string): Promise<any> {
  return fetch(`${API_URL}${endpoint}`, {
    method: "delete"
  }).then(async res => res.json());
}
