const templateCards = document.createElement("template");
templateCards.innerHTML = `
  <style>
    .avatar {
      border-radius: 50%;
      height: 140px;
      position: relative;
      width: 140px;
    }
  </style>
  <img class="avatar"/>
`;

export class Avatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._src = this.src;
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
    this.$avatar = this.shadowRoot.querySelector(".avatar");

    this.$avatar.setAttribute("src", this._src);
  }

  static get observedAttributes() {
    return ["src"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this._src = newValue;
  }
}
