import FluxStore from './FluxStore';
import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import MessageState from '../types/MessageState';
import {
    MarkMessageEvent, MarkMessagesEvent, RemoveMessagesEvent, RemoveMessageEvent,
    SearchMessagesEvent, RequestMessagesEvent
} from "../actions/MessageAction";

class MessageStore extends FluxStore<MessageState> {
    constructor(dispatcher: Flux.Dispatcher<Event>) {
        const onDispatch = (action: Event) => {

            if (action instanceof MarkMessageEvent) {
                const {payload} = action;
                this.state.messages = [];
                this.emitChange();
            } else if (action instanceof MarkMessagesEvent) {
                const {payload} = action;
                this.state.messages = [];
                this.emitChange();
            } else if (action instanceof RemoveMessageEvent) {
                const {payload} = action;
                this.state.messages = [];
                this.emitChange();
            } else if (action instanceof RemoveMessagesEvent) {
                const {payload} = action;
                this.state.messages = [];
                this.emitChange();
            } else if (action instanceof SearchMessagesEvent) {
                const {payload} = action;

                this.state.messages = this.state.messages.filter(m => {

                    for (var p in m) {
                        if (m[p] === payload) {
                            return true;
                        }
                    }

                    return false;
                });

                alert(payload);

                this.emitChange();
            }else if (action instanceof RequestMessagesEvent) {
                const {payload} = action;
                this.state.messages = []; //get messages from server than fire event
                this.emitChange();
            }
        };
        super(dispatcher, onDispatch, () => ({
            messages: [{}]
        }));
    }

    getState() {
        return this.state
    }
}

const messageStoreInstance = new MessageStore(AppDispatcher);
export default messageStoreInstance;