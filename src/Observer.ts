export class Observer {
  _observersCallback: Function;
  constructor(options: { observersCallback: Function }) {
    this._observersCallback = options.observersCallback;
  }
}
