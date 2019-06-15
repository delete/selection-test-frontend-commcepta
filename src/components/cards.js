import data from "../assets/dados.json";

const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(386px, 1fr));
            grid-gap: 30px;
            margin: 0;
            padding: 0;
        }

        c-card[aria-selected="true"] .card {
            background-color: #002B50;
        }

        .container {
          margin-top: 30px;
          padding: 30px;
        }

        @media screen and (min-width: 1440px) {
          .container {
            max-width: var(--container-width);
            margin: var(--container-margin);
            margin-top: 30px;
            padding: 0;
          }
        }
    </style>
    <section class="container">
      <ul role="listbox" tabindex="0" class="cards"></ul>
    </section>
`;

export class Cards extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._list = data;
    this._previousSelectedCard = null;
  }

  selectCard(e) {
    const cardId = e.detail;
    this.chandeCardSelectState(`${cardId}`, true);

    this._previousSelectedCard &&
      this.chandeCardSelectState(this._previousSelectedCard, false);

    this._previousSelectedCard = cardId;
  }

  chandeCardSelectState(id, state) {
    this.$card = this.shadowRoot.getElementById(id);
    this.$card.setAttribute("aria-selected", state);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
    this.$cardsContainer = this.shadowRoot.querySelector(".cards");

    this.render();
  }

  render() {
    this._list.forEach(item => {
      let $item = document.createElement("c-card");
      $item.id = item.id;
      $item.title = item.nome;
      $item.subtitle = item.cargo;
      $item.imgUrl = require(`../assets/img/${item.foto}`);
      $item.addEventListener("onSelectCard", this.selectCard.bind(this));

      this.$cardsContainer.appendChild($item);
    });
  }
}
