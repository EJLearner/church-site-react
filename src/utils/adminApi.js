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
