import {TypedEvent, AppDispatcher} from '../dispatcher/AppDispatcher';


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

export function markMessage(message: any) {
    AppDispatcher.dispatch(new MarkMessageEvent(message));
}

export function markMessages(messages: any[]) {
    AppDispatcher.dispatch(new MarkMessageEvent(messages));
}

export function removeMessage(message: any) {
    AppDispatcher.dispatch(new RemoveMessageEvent(message));
}

export function removeMessages(messages: any[]) {
    AppDispatcher.dispatch(new RemoveMessageEvent(messages));
}

export function requestMessages() {
    AppDispatcher.dispatch(new RequestMessagesEvent(null));
}