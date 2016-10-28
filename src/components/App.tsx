import * as React from "react";
import {Header} from "./Header";
import {ActionBar} from "./ActionBar";
import {Messages} from "./Messages";
interface StateProps {
    filterText: string
}

class App extends React.Component<{}, StateProps> {

    constructor(props: any) {
        super(props);
        this.state = {filterText: ''};
    }


    private handleChange = (searchTerm: string) => {

        this.setState({filterText: searchTerm});
    };

    render() {
        return (
            <div className="container message-motification-container">
                <Header />
                <ActionBar onSearch={this.handleChange}/>
                <Messages filterText={this.state.filterText}/>
            </div>
        )
    }
}

export default App;