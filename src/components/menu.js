const templateCards = document.createElement("template");
templateCards.innerHTML = `
    <style>
        .links {
            align-items: center;
            background: var(--background-gradient);
            display: none;
            list-style: none;
            left: 0;
            margin: 0;
            padding: 0;
            position: absolute;
            right: 0;
            top: 118px;
            transition: transform 275ms ease;
            transform: translate3d(0, -200%, 0);
            will-change: transform;
            z-index: 1;
        }

        c-menu-button.active ~ .links{
            display: block;
            transform: translate3d(0, 0px, 0);
        }

        .links a {
            color: var(--white);
            font-size: 24px;
            text-decoration: none;
        }

        .links a:focus {
            color: var(--light-blue);
        }

        .links > li {
            cursor: pointer;
            margin-bottom: 30px;
            text-align:center;
        }

        @media screen and (min-width: 768px) {
            .links {
                background: transparent;
                display: flex;
                position: relative;
                top: 0;
                transform: translate3d(0, 0, 0);
            }

            c-menu-button {
                display: none;
            }

            .links > li {
                cursor: pointer;
                margin-bottom: 0;
                text-align:center;
            }

            .links > li:not(:last-child) {
                margin-right: 54px;
            }
        }

    </style>
    <c-menu-button id="menu_button"></c-menu-button>

    <ul class="links">
        <li><a href="#">Empresa</a></li>
        <li><a href="#">Serviço</a></li>
        <li><a href="#">Contato</a></li>
    </ul>
`;

export class Menu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(templateCards.content.cloneNode(true));
  }
}
