export default {
  methods: {
    useFetch,
  },
};

async function useFetch(url, options) {
  const res = await fetch(url, options);
  const response = await res.json();

  return response;
}
