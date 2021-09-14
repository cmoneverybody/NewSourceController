import { Observer } from "./_otherMockedLibs";

export interface ITriggersVisibility {
  top: boolean;
  bottom: boolean;
}

export interface ITriggersOffset {
  top: number;
  bottom: number;
}

export type TObserverPosition = "top" | "bottom";

export type TObserversCallback = (position: TObserverPosition) => void;

export interface IObserversControllerOptions {
  listContainer: HTMLElement;
  triggersQuerySelector: string;
  triggersVisibility: ITriggersVisibility;
  observersCallback: TObserversCallback;
}

// Предназначен для управления обсерверами, срабатывающими при достижении границ контента списочного контрола.
export class ObserversController {
  _listContainer: HTMLElement;
  _triggers: HTMLElement[] = [];
  _triggersQuerySelector: string;
  _triggersVisibility: ITriggersVisibility;
  _triggersOffset: ITriggersOffset = {
    top: 0,
    bottom: 0
  };
  _observers: Observer[] = [];
  _observersCallback: TObserversCallback;

  constructor(options: IObserversControllerOptions) {
    this._listContainer = options.listContainer;
    this._triggersQuerySelector = options.triggersQuerySelector;
    this._triggersVisibility = options.triggersVisibility;
    this._observersCallback = options.observersCallback;

    this._updateTriggers();
    // add to here calc and recalc offset
  }

  public setListContainer(newListContainer: HTMLElement) {
    this._listContainer = newListContainer;
    this._updateTriggers();
  }

  public setTriggersQuerySelector(newTriggersQuerySelector: string) {
    this._triggersQuerySelector = newTriggersQuerySelector;
    this._updateTriggers();
  }

  _updateTriggers() {
    this._observers = [];

    this._triggers = Array.from(
      this._listContainer.querySelectorAll(this._triggersQuerySelector)
    );

    this._triggers.forEach((trigger) => {
      const position = trigger.getAttribute("position") as TObserverPosition;
      const observer = new Observer({
        observersCallback: () => {
          this._observersCallback(position);
        }
      });
      this._observers.push(observer);
    });
  }
}
