import {TypedEvent, AppDispatcher} from '../dispatcher/AppDispatcher';
import Message from "../types/Message";


export class SelectMessageEvent extends TypedEvent<Message> {
}
export class SelectMessagesEvent extends TypedEvent<any> {
}
export class MarkMessageEvent extends TypedEvent<any> {
}
export class MarkMessagesEvent extends TypedEvent<any[]> {
}
export class RemoveMessageEvent extends TypedEvent<any> {
}
export class RemoveMessagesEvent extends TypedEvent<any[]> {
}
export class RequestMessagesEvent extends TypedEvent<string> {
}
export class RequestUnreadMessagesEvent extends TypedEvent<any> {
}

export function selectMessage(message: Message) {
    AppDispatcher.dispatch(new SelectMessageEvent(message));
}

export function selectMessages(message: boolean) {
    AppDispatcher.dispatch(new SelectMessagesEvent(message));
}

export function markMessage(message: Message) {
    AppDispatcher.dispatch(new MarkMessageEvent(message));
}

export function markMessages(messages: number[]) {
    AppDispatcher.dispatch(new MarkMessagesEvent(messages));
}

export function removeMessage(message: Message) {
    AppDispatcher.dispatch(new RemoveMessageEvent(message));
}

export function removeMessages(messages: number[]) {
    AppDispatcher.dispatch(new RemoveMessagesEvent(messages));
}

export function requestMessages() {
   AppDispatcher.dispatch(new RequestMessagesEvent(null));
}

export function requestUnreadMessages() {
   AppDispatcher.dispatch(new RequestUnreadMessagesEvent(null));
}