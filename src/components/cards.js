import data from "../assets/dados.json";

const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        :host {
          --gap: 30px;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(386px, 1fr));
            grid-gap: var(--gap);
            margin: 0;
            padding: 0;
            margin-top: var(--gap);
        }

        c-card[aria-selected="true"] .card {
            background-color: #002B50;
        }

        .container {
          margin-top: var(--gap);
          padding: var(--gap);
        }

        @media screen and (min-width: 1440px) {
          .container {
            max-width: var(--container-width);
            margin: var(--container-margin);
            margin-top: var(--gap);
            padding: 0;
          }
        }
    </style>
    <section class="container">
      <c-card class="js-card-info"></c-card>
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
    this.showCardInfo(e.target);
  }

  showCardInfo(card) {
    this.$cardInfo = this.shadowRoot.querySelector(".js-card-info");

    this.$cardInfo.setAttribute("title", card.getAttribute("title"));
    this.$cardInfo.setAttribute("subtitle", card.getAttribute("subtitle"));
    this.$cardInfo.setAttribute("image", card.getAttribute("image"));
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
    this._list.forEach((item, index) => {
      let $item = document.createElement("c-card");
      $item.setAttribute("id", item.id);
      $item.setAttribute("title", item.nome);
      $item.setAttribute("subtitle", item.cargo);
      $item.setAttribute("image", require(`../assets/img/${item.foto}`));
      $item.addEventListener("onSelectCard", this.selectCard.bind(this));

      // Set a default selected card, to fill the main detail card
      if (index === 0) {
        $item.setAttribute("aria-selected", "true");
        this._previousSelectedCard = item.id;
        this.showCardInfo($item);
      }

      this.$cardsContainer.appendChild($item);
    });
  }
}
