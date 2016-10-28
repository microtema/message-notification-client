import {EventEmitter} from 'events';
import {Event} from '../dispatcher/AppDispatcher';
import * as Flux from "flux";
import {RequestUnreadMessagesEvent} from "../actions/MessageAction";

const CHANGE_EVENT = 'change';
const UPDATE_EVENT = 'update';

class FluxStore<TState> {
    private changed: boolean;
    private emitter: EventEmitter;
    private dispatchToken: string;
    private dispatcher: Flux.Dispatcher<Event>;
    private cleanStateFn: () => TState;
    protected state: TState;

    constructor(dispatcher: Flux.Dispatcher<Event>, public onDispatch: (action: Event) => void, cleanStateFn: () => TState) {
        this.emitter = new EventEmitter();
        this.changed = false;
        this.dispatcher = dispatcher;
        this.dispatchToken = dispatcher.register(payload => {
            this.invokeOnDispatch(payload);
        });

        this.cleanStateFn = cleanStateFn;
        this.state = this.cleanStateFn();
    }

    /**
     * Is idempotent per dispatched event
     */
    emitChange() {
        this.changed = true;
        this.emitter.emit(CHANGE_EVENT);

        setTimeout(()=> {
            this.dispatchUpdate();
        }, 300);
    }

    dispatchUpdate() {
        this.dispatcher.dispatch(new RequestUnreadMessagesEvent(null));
    }

    emitUpdate(data: any) {
        this.changed = true;
        this.emitter.emit(UPDATE_EVENT, data);
    }

    hasChanged() {
        return this.changed;
    }

    addChangeListener(callback: () => void) {
        this.emitter.on(CHANGE_EVENT, callback);
    }

    addUpdateListener(callback: (count: number) => void) {
        this.emitter.on(UPDATE_EVENT, callback);
    }

    removeChangeListener(callback: () => void) {
        this.emitter.removeListener(CHANGE_EVENT, callback);
    }

    removeUpdateListener(callback: (count: number) => void) {
        this.emitter.removeListener(UPDATE_EVENT, callback);
    }

    protected cleanState() {
        this.changed = false;
        this.state = this.cleanStateFn();
    }

    private invokeOnDispatch(payload: Event) {
        this.changed = false;
        this.onDispatch(payload);
        if (this.changed) {
            this.emitter.emit(CHANGE_EVENT);
        }
    }
}

export default FluxStore;