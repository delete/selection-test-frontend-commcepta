const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        .card {
            align-items: center;
            background-color: #F0F1EF;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            font-family: Arial;
            height: 200px;
            max-width: 100%;
            padding: 30px 32px;
            transition: background .5s;
        }

        .card:hover,
        .card:focus,
        .card[aria-selected="true"] {
            background-color: #002B50;
        }

        .card:hover .card__title,
        .card:hover .card__subtitle,
        .card[aria-selected="true"] .card__title,
        .card[aria-selected="true"] .card__subtitle {
            color: var(--white);
        }

        .card__avatar {
            position: relative;
            margin-right: 20px;
        }

        .card__avatar::before {
            align-items: center;
            background-color: #4DD2D2;
            border-radius: 50%;
            content: attr(data-number);
            display: flex;
            font-size: 24px;
            justify-content: center;
            height: 40px;
            position:absolute;
            padding: 3px;
            right: -6px;
            top: -6px;
            width: 40px;
            z-index: 1;
        }

        .card__title {
            color: #092432;
            display: block;
            font-size: 24px;
            transition: color .5s;
        }

        .card__subtitle {
            color: #707070;
            display: block;
            font-size: 20px;
            transition: color .5s;
        }
    </style>
    <li class="card" aria-selected="false">
        <div class="card__avatar" data-number="0">
        </div>
        <div>
            <span class="card__title"></span>
            <span class="card__subtitle"></span>
        </div>
    </li>
`;

export class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
    this.$card = this.shadowRoot.querySelector(".card");
    this.$cardAvatar = this.shadowRoot.querySelector(".card__avatar");
    this.$avatar = this.shadowRoot.querySelector("c-avatar");
    this.$title = this.shadowRoot.querySelector(".card__title");
    this.$subtitle = this.shadowRoot.querySelector(".card__subtitle");

    this.addAvatar();
    this.$title.innerHTML = this.title;
    this.$subtitle.innerHTML = this.subtitle;
    this.$cardAvatar.setAttribute("data-number", this.id);

    this.$card.addEventListener("click", e => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("onSelectCard", { detail: this.id }));
    });

    if (!this.hasAttribute("aria-selected")) {
      this.setAttribute("aria-selected", "false");
    }
  }

  static get observedAttributes() {
    return ["aria-selected"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "aria-selected":
        this.$card.setAttribute("aria-selected", newValue);
    }
  }

  addAvatar() {
    const templateCards = document.createElement("template");
    templateCards.innerHTML = `
        <c-avatar src="${this.imgUrl}"></c-avatar>
    `;
    this.$cardAvatar.appendChild(templateCards.content.cloneNode(true));
  }
}
