import * as React from "react";

export interface HeaderProps { compiler: string; framework: string; }

export class Header extends React.Component<{}, any> {
    render() {
        return <h1>Notification Center</h1>;
    }
}