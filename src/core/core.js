import { Card } from "../components/card";
import { Cards } from "../components/cards";
import { Avatar } from "../components/avatar";
import { Header } from "../components/header";
import { Nav } from "../components/nav";
import { Menu } from "../components/menu";
import { MenuButton } from "../components/menu-button";

const components = [
  {
    tagName: "c-card",
    component: Card
  },
  {
    tagName: "c-cards",
    component: Cards
  },
  {
    tagName: "c-avatar",
    component: Avatar
  },
  {
    tagName: "c-header",
    component: Header
  },
  {
    tagName: "c-nav",
    component: Nav
  },
  {
    tagName: "c-menu",
    component: Menu
  },
  {
    tagName: "c-menu-button",
    component: MenuButton
  }
];

class ComponentRegistry {
  static register(components) {
    components.forEach(component => {
      window.customElements.define(component.tagName, component.component);
    });
  }
}

class Core {
  init() {
    ComponentRegistry.register(components);
  }
}

export default new Core();
