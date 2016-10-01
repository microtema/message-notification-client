import * as React from "react";
import MessageState from "../types/MessageState";
import {Header} from "./Header";
import {ActionBar} from "./ActionBar";
import MessagesStore from "../stores/MessageStore"
import * as MessageActions from '../actions/MessageAction'
import {Messages} from "./Messages";
import Message from "../types/Message";

interface StateProps {
    messages: Message[]
}

class App extends React.Component<{}, StateProps> {

    constructor(props: any) {
        super(props);
        this.state = {messages: []}
    }

    private onChange = () => {

        this.setState(this.getStateFromStores());
    };

    public componentWillMount() {
        MessagesStore.addChangeListener(this.onChange);
    }

    public componentDidMount() {
        MessageActions.requestMessages();
    }

    public componentWillUnmount() {
        MessagesStore.removeChangeListener(this.onChange);
    }

    private getStateFromStores() {
        return MessagesStore.getState();
    }

    render() {
        return (
            <div className="container message-motification-container">
                <Header />
                <ActionBar />
                <Messages messages={this.state.messages}/>
            </div>
        )
    }
}

export default App;