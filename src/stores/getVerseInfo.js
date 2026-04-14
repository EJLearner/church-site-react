let memo = {};

const resetCache = () => {
  memo = {};
};

const getVerseInfo = async (query) => {
  if (memo[query]) {
    return memo[query];
  }

  try {
    const response = await fetch(`/api/verse?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`API returned ${response.status}`);
    const json = await response.json();
    memo[query] = json.data?.passages;

    return memo[query];
  } catch {
    return null;
  }
};

export {resetCache as _resetCache};

export default getVerseInfo;
