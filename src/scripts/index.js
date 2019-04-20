import "../styles/style.sass";

import Model from "./model";
import View from "./view";
import Controller from "./controller";
import "./pag";

const view = new View();
const model = new Model();

new Controller(model, view);
