import FluxStore from './FluxStore';
import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import MessageState from '../types/MessageState';
import {
    MarkMessageEvent, MarkMessagesEvent, RemoveMessagesEvent, RemoveMessageEvent, RequestMessagesEvent,
    SelectMessageEvent, SelectMessagesEvent
} from "../actions/MessageAction";
import * as $ from 'jquery'
import Message from "../types/Message";
import {Endpoint} from "../endpoint/Endpoint"

class MessageStore extends FluxStore<MessageState> {

    constructor(dispatcher: Flux.Dispatcher<Event>) {

        //const endpoint = new Endpoint('dev');
        const endpoint = new Endpoint('http://localhost:8000');

        const onDispatch = (action: Event) => {

            if (action instanceof SelectMessageEvent) {
                const {payload} = action;
                const message: Message = payload as Message;

                message.checked = !message.checked;

                this.emitChange();
            } else if (action instanceof SelectMessagesEvent) {
                const {payload} = action;

                this.state.messages.forEach(message => {
                    message.checked = payload;
                });

                this.emitChange();
            } else if (action instanceof MarkMessageEvent) {
                const {payload} = action;

                this.state.messages = [];

                this.emitChange();
            } else if (action instanceof MarkMessagesEvent) {
                const {payload} = action;

                this.state.messages = [];

                this.emitChange();
            } else if (action instanceof RemoveMessageEvent) {
                const {payload} = action;

                const message: Message = payload as Message;

                $.ajax({
                    url: endpoint.query("/" + message.id),
                    method: "DELETE"
                }).done(function (success: boolean) {

                    console.debug("delete message with id: " + message.id + " was successfully: ", success);
                    this.state.messages = this.state.messages.filter((entry: Message)=> {
                        return entry.id !== message.id
                    });

                    this.emitChange();
                }.bind(this)).fail(function (data, s) {
                    console.debug(data, s);
                });

                this.emitChange();
            } else if (action instanceof RemoveMessagesEvent) {

                const {payload} = action;

                $.ajax({
                    url: endpoint.query("/" + payload.join(",")),
                    method: "DELETE"
                }).done(function (success: boolean) {

                    console.debug("delete message with id: " + payload + " was successfully: ", success);

                    this.state.messages = this.state.messages.filter((entry: Message)=> {
                        return !entry.checked;
                    });

                    this.emitChange();
                }.bind(this)).fail(function (data, s) {
                    console.debug(data, s);
                });

                this.emitChange();
            } else if (action instanceof RequestMessagesEvent) {
                const {payload} = action;

                $.ajax({
                    url: endpoint.query(),
                }).done(function (entries: Message[]) {

                    console.debug("got payload from server", entries);
                    this.state.messages = entries;
                    this.emitChange();
                }.bind(this)).fail(function (data, s) {
                    console.debug(data, s);
                });
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