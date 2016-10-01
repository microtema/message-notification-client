import * as React from "react";
import Message from "../types/Message";
import {MessageEntry} from "./MessageEntry";

interface StateProps {
    checked: boolean
}

interface Props {
    messages: Message[]
}

export class Messages extends React.Component<Props, StateProps> {

    constructor(props: any) {
        super(props);
        this.state = {checked: false}
    }

    private checkEntries = (event: React.MouseEvent) => {

        alert("checkEntries");
        this.state.checked = !this.state.checked;
    };

    private markCheckedEntries = (event: React.MouseEvent) => {

        alert("markCheckedEntries");
    };

    private deleteCheckedEntries = (event: React.MouseEvent) => {

        alert("deleteCheckedEntries");
    };


    render() {

        const { messages} = this.props;

        return (
            <table className="table table-hover message-motification-table">
                <thead>
                <tr>
                    <th className="index">#</th>
                    <th className="text-left">Display user notifications</th>
                    <th className="dropdown-toggle" title="Select/Unselect all notifications">
                        <a href="#" onClick={this.checkEntries}><span
                            className={this.state.checked ? 'glyphicon glyphicon-check': 'glyphicon glyphicon-unchecked'}
                            aria-hidden="true"></span></a>
                    </th>
                    <th className="action" title="Mark all selected notifications as read"><a href="#"
                                                                                              onClick={this.markCheckedEntries}><span
                        className="glyphicon glyphicon-bookmark" aria-hidden="true"></span></a></th>
                    <th className="action" title="Delete all selected notifications"><a href="#"
                                                                                        onClick={this.deleteCheckedEntries}><span
                        className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></th>
                </tr>
                </thead>
                <tbody>
                { messages.map((g, index) => <MessageEntry key={ index } index={ index} data={g} />) }
                </tbody>
            </table>
        );
    }
}