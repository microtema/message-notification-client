import * as React from "react";
import * as MessageActions from '../actions/MessageAction'

interface StateProps {
    countUnreaded: number, active: boolean, searchTerm: string
}

export class ActionBar extends React.Component<{}, StateProps> {

    constructor(props: any) {
        super(props);
        this.state = {countUnreaded: 0, active: false, searchTerm: ''}
    }

    static propTypes: React.ValidationMap<StateProps> = {
        searchTerm: React.PropTypes.string.isRequired
    };

    private handleChange = (event: React.MouseEvent) => {

        this.state.searchTerm = (event.target as HTMLInputElement).value;

        MessageActions.searchMessages(this.state.searchTerm);
    };

    private onSubmit = (event: React.FormEvent)=> {
        event.preventDefault();

        if (!this.state.searchTerm) {
            return;
        }
        MessageActions.searchMessages(this.state.searchTerm);
    };


    private requestAll() {
        MessageActions.requestMessages();
    };

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left" role="search">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for..."
                                       onChange={this.handleChange}/>
                                <span className="input-group-btn">
                    <button className="btn btn-default" type="button" onClick={ this.onSubmit}>Go</button>
                </span>
                            </div>
                        </form>
                        <ul className="nav navbar-nav navbar-right">

                            <li className={this.state.active ? 'active': ''}
                                title={this.state.countUnreaded > 0 ? 'You have '+this.state.countUnreaded + ' unread notifications': 'You have no unread notification'}>
                                <a onClick={this.requestAll} className="navbar-brand" href="#">
                                <span className="glyphicon glyphicon-bell"
                                      aria-hidden="true"></span>
                                </a>
                            </li>
                            <li className={this.state.active ? 'active': ''}
                                title={this.state.countUnreaded > 0 ? 'You have '+this.state.countUnreaded + ' unread notification': 'You have no unread notification'}>
                                <a onClick={this.requestAll}
                                   className="navbar-brand"
                                   href="#">{this.state.countUnreaded}</a></li>
                            <li className={this.state.active ? 'active': ''} title="Reload"><a onClick={this.requestAll}
                                                                                               className="navbar-brand"
                                                                                               href="#"><span
                                className="glyphicon glyphicon-retweet" aria-hidden="true"></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}