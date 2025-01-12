const API = {
  url: `${window.location.origin}${window.location.pathname}data/menu.json`,
  fetchMenu: async () => {
    const result = await fetch(API.url);
    return await result.json();
  },
};

export default API;
