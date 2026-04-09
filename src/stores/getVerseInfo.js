let memo = {};

const resetCache = () => {
  memo = {};
};

const getVerseInfo = async (query, cb) => {
  if (memo[query]) {
    cb(memo[query]);
    return;
  }

  try {
    const response = await fetch(`/api/verse?q=${encodeURIComponent(query)}`);
    const json = await response.json();
    memo[query] = json.data?.passages;
    cb(memo[query]);
  } catch {
    cb(null);
  }
};

export {resetCache as _resetCache};

export default getVerseInfo;
