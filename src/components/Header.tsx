import * as React from "react";

export interface HeaderProps { compiler: string; framework: string; }

export class Header extends React.Component<HeaderProps, {}> {
    render() {
        return <h1>Wellcome to E2OPEn Notification Center build with {this.props.compiler} and {this.props.framework}!</h1>;
    }
}