export default {
  methods: {
    useFetch,
  },
};

async function useFetch(url, options) {
  try {
    const res = await fetch(url, options);
    const response = await res.json();

    return response;
  } catch (e) {
    throw new Error(
      `Ошибка при обращении к удаленному серверу по адресу: ${url}. ${e}`
    );
  }
}
