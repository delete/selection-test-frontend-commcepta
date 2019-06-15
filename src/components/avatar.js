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
  <img class="avatar" src=""/>
`;

export class Avatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._src = null;
    this.$avatar = null;
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
    this.$avatar = this.shadowRoot.querySelector(".avatar");

    this.updateAvatar();
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this._src = newValue;
        break;
    }

    this.updateAvatar();
  }

  updateAvatar() {
    if (this.$avatar) {
      this.$avatar.setAttribute("src", this._src);
    }
  }
}
