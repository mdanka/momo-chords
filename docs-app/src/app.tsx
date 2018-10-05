import "es6-shim";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "./components/AppContainer";

const appElement = document.getElementById("app");

if (appElement != null) {
    ReactDOM.render(<AppContainer />, appElement);
}
