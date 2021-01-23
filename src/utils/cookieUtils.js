const oneWeekInSeconds = 60 * 60 * 24 * 7;

function setCookie(key, value, expireSeconds = oneWeekInSeconds) {
  document.cookie = `${key}=${encodeURIComponent(
    value
  )};max-age=${expireSeconds}`;
}

function getCookie(key) {
  const cookies = document.cookie.split('; ');

  const myCookie = cookies.find((cookie) => cookie.split('=')[0] === key);
  const cookieValue = myCookie?.split('=')[1];

  return cookieValue && decodeURIComponent(cookieValue);
}

function resetCookie(key) {
  setCookie(key, '', 0);
}

export {getCookie, resetCookie, setCookie};
