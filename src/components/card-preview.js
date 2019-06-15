const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        .card {
            align-items: center;
            background-color: #F0F1EF;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            font-family: Arial;
            height: auto;
            max-width: 100%;
            padding: 30px 32px;
            transition: background .3s;
            flex-wrap: wrap;
        }

        .card__avatar {
            position: relative;
            margin-right: 30px;
        }

        dl {
          display: flex;
        }

        dt {
          display: block;
          font-size: 20px;
          text-transform: uppercase;
          color: #707070;
          margin-bottom: 17px;
          margin-right: 16px;
          text-align: right;
        }

        dd {
          color: #092432;
          display: block;
          font-size: 24px;
          margin: 0;
          margin-bottom: 10px;
        }

        @media screen and (max-width: 768px) {
          .card {
            justify-content: center;
          }
        }


    </style>
    <li class="card" aria-selected="false" tabindex="0">
        <div class="card__avatar">
          <c-avatar></c-avatar>
        </div>

        <dl>
          <div>
            <dt>Nome:</dt>
            <dt>Cargo:</dt>
            <dt>Idade:</dt>
            </div>
          <div>
            <dd class="card__title"></dd>
            <dd class="card__subtitle"></dd>
            <dd class="card__info"></dd>
          </div>
        </dl>
    </li>
`;

export class CardPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._title = null;
    this._subtitle = null;
    this._image = null;
    this._id = null;
    this._yearsold = null;

    this.$card = null;
    this.$cardAvatar = null;
    this.$avatar = null;
    this.$title = null;
    this.$subtitle = null;
    this.info = null;
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
    this.$card = this.shadowRoot.querySelector(".card");
    this.$cardAvatar = this.shadowRoot.querySelector(".card__avatar");
    this.$avatar = this.shadowRoot.querySelector("c-avatar");
    this.$title = this.shadowRoot.querySelector(".card__title");
    this.$subtitle = this.shadowRoot.querySelector(".card__subtitle");
    this.info = this.shadowRoot.querySelector(".card__info");

    this.updateCard();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleOnClick);
  }

  updateCard() {
    if (this.$title) {
      this.$title.innerHTML = this._title;
      this.$subtitle.innerHTML = this._subtitle;
      this.info.innerHTML = this._yearsold;
      this.$avatar.setAttribute("src", this._image);
      this._id && this.$cardAvatar.setAttribute("data-number", this._id);
    }
  }

  static get observedAttributes() {
    return ["aria-selected", "title", "subtitle", "image", "id", "yearsold"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
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
