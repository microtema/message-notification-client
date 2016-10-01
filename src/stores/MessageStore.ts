import FluxStore from './FluxStore';
import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import MessageState from '../types/MessageState';
import {
    MarkMessageEvent, MarkMessagesEvent, RemoveMessagesEvent, RemoveMessageEvent, RequestMessagesEvent
} from "../actions/MessageAction";
import * as $ from 'jquery'
import Message from "../types/Message";

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
            } else if (action instanceof RequestMessagesEvent) {
                const {payload} = action;

                $.get('/rest/data.json', function (entries: Message[]) {
                    this.state.messages = entries;
                    this.emitChange();
                }.bind(this));
            }
        };
        super(dispatcher, onDispatch, () => ({
            messages: []
        }));
    }

    getState() {
        return this.state;
    }
}

const messageStoreInstance = new MessageStore(AppDispatcher);
export default messageStoreInstance;