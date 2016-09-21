import * as React from "react";
import * as ReactDOM from "react-dom";

import { Header } from "./components/Header";

ReactDOM.render(
    <Header compiler="TypeScript" framework="React" />,
    document.getElementById("container")
);