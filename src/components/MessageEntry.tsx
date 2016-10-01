import * as React from "react";
import Message from "../types/Message";
import * as moment from 'moment'
import * as MessageActions from '../actions/MessageAction';

interface Props {
    data: Message,
    index: number
}

export class MessageEntry extends React.Component<Props, any> {

    private checkEntry = (event: React.MouseEvent) => {

        MessageActions.selectMessage(this.props.data);
    };

    private markEntry = (event: React.MouseEvent) => {

        alert("markEntry");
    };

    private deleteEntry = (event: React.MouseEvent) => {

        MessageActions.removeMessage(this.props.data);
    };

    render() {
        return (
            <tr >
                <td className={this.props.data.type == 'UNREAD' ? 'danger index' : 'active index'}>
                    <small>{this.props.index + 1}</small>
                </td>
                <td className="text-left description">
                    <div className="paragraphs">
                        <div className="row">
                            <div className="span4">
                                <div className="clearfix content-heading">
                                    <img className="pull-left img-responsive" src={this.props.data.image}/>
                                    <p><strong>{this.props.data.title}</strong> <span className="date"><small>{(moment(this.props.data.pubDate)).format('LLLL')}
                                </small></span></p>
                                    <p>{this.props.data.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="dropdown-toggle" title="Select notification">
                    <a href="#" onClick={this.checkEntry}><span
                        className={this.props.data.checked ? 'glyphicon glyphicon-check': 'glyphicon glyphicon-unchecked'}
                        aria-hidden="true"></span></a>
                </td>
                <td className="action" title={this.props.data.type == 'UNREAD' ? 'Mark notification as read' : ''}>
                    <a href="#" onClick={this.markEntry}><span className="glyphicon glyphicon-bookmark"
                                                               aria-hidden="true"></span></a>
                </td>
                <td className="action" title="Delete notification">
                    <a href="#" onClick={this.deleteEntry}><span className="glyphicon glyphicon-remove"
                                                                 aria-hidden="true"></span></a>
                </td>
            </tr>
        );

    }
}
;