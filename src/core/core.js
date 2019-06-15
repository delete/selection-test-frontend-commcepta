import { Card } from "../components/card";
import { Cards } from "../components/cards";
import { Avatar } from "../components/avatar";
import { Header } from "../components/header";
import { Nav } from "../components/nav";
import { Menu } from "../components/menu";
import { MenuButton } from "../components/menu-button";

const components = [
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
