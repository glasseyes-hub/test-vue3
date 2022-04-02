export default {
  methods: {
    useFetch,
  },
};

async function useFetch(url, options = {}) {
  try {
    const res = options.cache
      ? await cachedFetch(url, options.cache)
      : await fetch(url, options);

    return res.json();
  } catch (e) {
    throw new Error(
      `Ошибка при обращении к удаленному серверу по адресу: ${url}. ${e}`
    );
  }
}

async function cachedFetch(url, cacheName = "v1") {
  const cache = await caches.open(cacheName);
  const res = (await caches.match(url)) ?? (await fetch(url));

  if (res.ok) await cache.put(url, res.clone());

  return res;
}
