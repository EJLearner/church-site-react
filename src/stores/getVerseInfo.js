let memo = {};

const resetCache = () => {
  memo = {};
};

// FALLBACK: remove when /api/verse is stable
const _FALLBACK_KEY = '7cda29fcf90a3041dda97ad48c68824b';
const _FALLBACK_ASV_ID = '06125adad2d5898a-01';
const _fetchFromScriptureApi = (query, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      const parsed = JSON.parse(xhr.responseText);
      memo[query] = parsed.data?.passages;
      cb(memo[query]);
    }
  };
  xhr.open(
    'GET',
    `https://api.scripture.api.bible/v1/bibles/${_FALLBACK_ASV_ID}/search?query=${query}`,
  );
  xhr.setRequestHeader('api-key', _FALLBACK_KEY);
  xhr.send();
};
// END FALLBACK

const getVerseInfo = async (query, cb) => {
  if (memo[query]) {
    cb(memo[query]);
    return;
  }

  try {
    const response = await fetch(`/api/verse?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const json = await response.json();
    memo[query] = json.data?.passages;
    cb(memo[query]);
  } catch {
    _fetchFromScriptureApi(query, cb); // FALLBACK
  }
};

export {resetCache as _resetCache};

export default getVerseInfo;
