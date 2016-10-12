import FluxStore from './FluxStore';
import {Event, AppDispatcher} from '../dispatcher/AppDispatcher';
import MessageState from '../types/MessageState';
import {
    MarkMessageEvent, MarkMessagesEvent, RemoveMessagesEvent, RemoveMessageEvent, RequestMessagesEvent,
    SelectMessageEvent, SelectMessagesEvent, RequestUnreadMessagesEvent
} from "../actions/MessageAction";
import * as $ from 'jquery'
import Message from "../types/Message";
import {Endpoint} from "../endpoint/Endpoint"
import * as MessageActions from '../actions/MessageAction'

declare var SsEventSource: any;

class MessageStore extends FluxStore<MessageState> {

    constructor(dispatcher: Flux.Dispatcher<Event>) {

        const env = 'prod';// |'dev' | 'prod' | http://localhost:8000'
        const endpoint = new Endpoint(env);

        const sse = new SsEventSource(endpoint.sse(), MessageActions.requestUnreadMessages);

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

                const message: Message = payload as Message;

                $.ajax({
                    url: endpoint.query("/" + message.id),
                    method: "POST"
                }).done(function (messageType: string) {
                    console.debug("message with id: " + message.id + " was successfully marked: ", messageType);

                    message.type = messageType;

                    this.emitChange();
                }.bind(this)).fail(function (data, s) {
                    console.debug(data, s);
                });

                this.emitChange();
            } else if (action instanceof MarkMessagesEvent) {

                const {payload} = action;

                const messages = payload as number[];

                if (messages.length == 0) {
                    return;
                }

                $.ajax({
                    url: endpoint.query("/" + messages.join(",")),
                    method: "POST"
                }).done(function (messageType: string) {
                    console.debug("delete message with id: " + messages + " was successfully: ", messageType);
                    this.state.messages.filter((entry: Message)=> {
                        return messages.indexOf(entry.id) != -1;
                    }).forEach((entry: Message) => {
                        entry.type = messageType;
                    });

                    this.emitChange();
                }.bind(this)).fail(function (data, s) {
                    console.debug(data, s);
                });

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

                if (payload.length == 0) {
                    return;
                }

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
            } else if (action instanceof RequestUnreadMessagesEvent) {
                const {payload} = action;

                $.ajax({
                    url: endpoint.type("UNREAD"),
                }).done(function (entries: Message[]) {
                    console.debug("got payload from server", entries.length);

                    this.emitUpdate(entries.length);
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