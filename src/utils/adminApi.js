import {getAuth} from 'firebase/auth';

async function authFetch(url, options = {}) {
  const token = await getAuth().currentUser.getIdToken();
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}

export default authFetch;

// Throws the API's error message when a request didn't succeed
export async function requireOk(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed (${res.status})`);
  }
  return res;
}
