const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        :host {
            width: 100%;
            height: 120px;
            background: var(--background-gradient);
        }
    </style>
    <slot name="nav"></slot>
`;

export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
  }
}
