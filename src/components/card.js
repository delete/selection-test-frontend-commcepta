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
            transition: background .3s;;
        }

        .card:hover,
        .card:focus,
        .card[aria-selected="true"] {
            background-color: #002B50;
        }

        .card:hover .card__title,
        .card:hover .card__subtitle,
        .card:focus .card__title,
        .card:focus .card__subtitle,
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
            font-size: 1.4rem;
            transition: color .5s;
        }

        .card__subtitle {
            color: #707070;
            display: block;
            font-size: 1rem;
            transition: color .5s;
        }
    </style>
    <li class="card" aria-selected="false" tabindex="0">
        <div class="card__avatar">
          <c-avatar></c-avatar>
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

    this._title = null;
    this._subtitle = null;
    this._image = null;
    this._id = null;
    this._ariaSelected = null;
    this._yearsold = null;

    this.$card = null;
    this.$cardAvatar = null;
    this.$avatar = null;
    this.$title = null;
    this.$subtitle = null;

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
    this.$card = this.shadowRoot.querySelector(".card");
    this.$cardAvatar = this.shadowRoot.querySelector(".card__avatar");
    this.$avatar = this.shadowRoot.querySelector("c-avatar");
    this.$title = this.shadowRoot.querySelector(".card__title");
    this.$subtitle = this.shadowRoot.querySelector(".card__subtitle");

    this.addEventListener("click", this.handleOnClick);

    if (this.hasAttribute("aria-selected")) {
      this.$card.setAttribute(
        "aria-selected",
        this.getAttribute("aria-selected")
      );
    }

    this.updateCard();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleOnClick);
  }

  updateCard() {
    if (this.$title) {
      this.$title.innerHTML = this._title;
      this.$subtitle.innerHTML = this._subtitle;
      this.$avatar.setAttribute("src", this._image);
      this._id && this.$cardAvatar.setAttribute("data-number", this._id);
    }
  }

  handleOnClick(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("onSelectCard", { detail: this.id, composed: true })
    );
  }

  static get observedAttributes() {
    return ["aria-selected", "title", "subtitle", "image", "id", "yearsold"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "aria-selected":
        if (this.$card) this.$card.setAttribute("aria-selected", newValue);
        break;

      case "title":
        this._title = newValue;
        break;

      case "subtitle":
        this._subtitle = newValue;
        break;

      case "id":
        this._id = newValue;
        break;

      case "image":
        this._image = newValue;
        break;

      case "yearsold":
        this._yearsold = newValue;
        break;
    }

    this.updateCard();
  }
}
