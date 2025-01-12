const Router = {
  init: function () {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        this.go(url);
      });
    });

    window.addEventListener("popstate", (event) => {
      console.log(event);

      this.go(event.state.route, false);
    });

    this.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    const basePath = "/coffee-masters";
    if (route.startsWith(basePath)) {
      route = route.substring(basePath.length);
    }
    console.log(`Going to ${route}`);
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    console.log(route);
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        pageElement.textContent = "Menu";

        break;
      case "/order":
        pageElement = document.createElement("order-page");
        pageElement.textContent = "Your Order";
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          pageElement.textContent = "Details";
          pageElement.dataset.id = route.substring(route.lastIndexOf("-") + 1);
        }
        break;
    }
    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
    } else {
      document.querySelector("main").innerHTML = "404";
    }
    window.scrollX = 0;
  },
};

export default Router;
