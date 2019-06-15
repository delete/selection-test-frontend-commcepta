const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        :host {
            background-color: transparent;
            border: none;
            display: block;
            float: left;
            transition: all 275ms ease;
            cursor: pointer;
        }

        :host:focus {
            outline: none;
        }

        :host span {
            display: block;
            width: 26px;
            height: 4px;
            background: var(--light-blue);
            margin-bottom: 2px;
            border-radius: 1px;
            transition: all 275ms ease;
            outline: none;
        }

        :host([class="active"]) {
            transform: rotate(-45deg);
        }

        :host([class="active"]) .bar1 {
            transform: rotate(0deg) translateY(6px);
          }

        :host([class="active"]) .bar2 {
            opacity: 0;
          }

        :host([class="active"]) .bar3 {
            transform: rotate(-90deg) translateX(5px);
          }

        :host([class="active"]) span {
            background: var(--white) !important;
        }
    </style>

    <span class="bar1"></span>
    <span class="bar2"></span>
    <span class="bar3"></span>
`;

export class MenuButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));

    this.setAttribute("role", "button");
    this.addEventListener("click", this.toggleMenu);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.toggleMenu);
  }

  toggleMenu() {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      this.classList.add("active");
    }
  }
}
