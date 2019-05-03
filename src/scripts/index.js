import "../styles/style.sass";

import Model from "./model";
import View from "./view";
import Controller from "./controller";
import "./pag";
import Routing from "./routing";

const view = new View();
const model = new Model();
const routing = new Routing();

new Controller(model, view, routing);

routing.checkRedirect(window.location.search);
