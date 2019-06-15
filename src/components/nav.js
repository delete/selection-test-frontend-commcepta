const spaceBoxImg = require("../assets/img/space_box.png");

const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        .nav {
            align-items: center;
            display: flex;
            height: 100%;
            padding: 0 30px;
        }

        .nav__logo {
            height: 50px;
        }

        @media screen and (min-width: 1440px) {
            .nav {
                max-width: var(--container-width);
                margin: var(--container-margin);
                padding: 0;
            }

            .nav__logo {
                height: 70px;
            }
        }

    </style>
    <nav class="nav">
        <img class="nav__logo" src="${spaceBoxImg}">
    </nav>
`;

export class Nav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
  }
}
