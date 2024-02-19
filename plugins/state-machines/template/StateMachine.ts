import { ok } from "assert";

export default class StateMachine<T> {

    currentState: string;
    states: { [key: string]: Function };

    constructor (states: { [key: string]: Function }) {
        ok(states["start"], "State machine must have a start state")

        this.states = states;
        this.currentState = "start";
    }

    nextState (state: string) {
        this.currentState = state;
    }

    async run (args: T) {
        if (!this.currentState) return this;

        const newState = await this[this.currentState](args);
        
        if (newState && newState !== this.currentState) {
            this.nextState(newState);
        }

        return this;
    }

}