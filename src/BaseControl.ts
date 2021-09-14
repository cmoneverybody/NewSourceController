import { ScrollController } from "./Controllers/ScrollController";
import type {
  TObserversCallback,
  TObserverPosition
} from "./Controllers/_scrollController/ObserversController";

const TRIGGERS_QUERY_SELECTOR = ".trigger";
const ITEMS_QUERY_SELECTOR = ".item";

export default class BaseControl {
  _scrollController: ScrollController;
  _itemsContainer: HTMLElement;
  _listContainer: HTMLElement;
  _scrollTop: number = 0;
  _viewPortSize: number = 0;
  _observersCallback: TObserversCallback;

  constructor() {
    this._itemsContainer = document.querySelector(
      ".itemsContainer"
    ) as HTMLElement;

    this._listContainer = document.querySelector(
      ".listContainer"
    ) as HTMLElement;

    this._viewPortSize = (document.querySelector(
      ".scrollContainer"
    ) as HTMLElement).offsetHeight;

    this._observersCallback = this._observersCallbackFn.bind(this);

    this._scrollController = new ScrollController({
      itemsContainer: this._itemsContainer,
      listContainer: this._listContainer,
      scrollTop: this._scrollTop,
      viewPortSize: this._viewPortSize,
      triggersQuerySelector: TRIGGERS_QUERY_SELECTOR,
      itemsQuerySelector: ITEMS_QUERY_SELECTOR,
      observersCallback: this._observersCallback,
      triggersVisibility: {
        top: false,
        bottom: false
      }
    });
  }

  private _observersCallbackFn(position: TObserverPosition) {
    console.log("observersCallback", position);
  }
}
