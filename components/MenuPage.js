export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);
    (async () => {
      const request = await fetch("./MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    })();
  }
  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("menuchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    console.log("Render");
    this.root.querySelector("#menu").innerHTML = "";
    if (app.store.menu) {
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");

        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class="category"></ul>
        `;
        this.root.querySelector("#menu").appendChild(liCategory);

        category.products.forEach((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
