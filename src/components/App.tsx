import * as React from "react";
import MessageState from "../types/MessageState";
import {Header} from "./Header";
import {ActionBar} from "./ActionBar";
import MessagesStore from "../stores/MessageStore"

class App extends React.Component<{}, any> {

    private onChange = () => {
        alert("onChange");
        // this.setState(this.getStateFromStores());
    };

    public componentWillMount() {
        MessagesStore.addChangeListener(this.onChange);
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
            </div>
        )
    }
}

export default App;