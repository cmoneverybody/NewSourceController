import type { IVirtualScrollCollection } from "../../Collection";

import type { TItemsSizes } from "./ItemsSizeController";
import type { ITriggersOffset } from "./ObserversController";

import { calculateVirtualRange } from "./VirtualScrollUtil";

export interface ICalculatorOptions {
  segmentSize: number;
  collection: IVirtualScrollCollection;
  itemsSizes: TItemsSizes;
}

export interface IVirtualRange {
  start: number;
  stop: number;
}

export interface IVirtualPlaceholders {
  top: 0;
  bottom: 0;
}

export interface IEdgeItem {
  key: string;
  border: "top" | "bottom";
  borderDistance: number;
}

export type TDirection = "up" | "down";

// Класс осуществляет:
// - сбор, хранение и актуализация любых параметров скролла: scrollTop, размер viewPort, размеры элементов, размер контента;
// - применение индексов виртуального скролла на модель;
// - вычисление размеров виртуальных плейсхолдеров.
export class Calculator {
  _virtualRange: IVirtualRange = {
    start: 0,
    stop: 0
  };
  _scrollTop: number = 0;
  _segmentSize: number = 0;
  _placeholders: IVirtualPlaceholders = {
    top: 0,
    bottom: 0
  };
  _itemsSizes: TItemsSizes = [];
  _collection: IVirtualScrollCollection;

  constructor(options: ICalculatorOptions) {
    this._segmentSize = options.segmentSize;
    this._itemsSizes = options.itemsSizes;
    this._collection = options.collection;
    this._updateVirtualRange();
  }

  public setSizes(newItemsSizes: TItemsSizes) {
    this._itemsSizes = newItemsSizes;
  }

  // Вместо canScrollToItem - вызывается в scrollController для проверки вхождения элемента в virtualRange
  public isItemInVirtualRange(index: number): boolean {
    // todo add code
    return true;
  }

  // Метод испольузется для определения элемента, который нужно отображать в мастере как "активный".
  public getActiveElementIndex(): number {
    // todo add code
    return 0;
  }

  // Для понимания, пересчитывать диапазон или отдавать управление в загрузчик элементов
  // >> вместо isRangeOnEdge
  public hasItemsInDirection(direction: TDirection): boolean {
    // add code
    return true;
  }

  public shiftRangeInDirection(
    direction: TDirection,
    triggersOffset: ITriggersOffset
  ) {
    // add code
    const newVirtualRange = calculateVirtualRange({
      currentVirtualRange: this._virtualRange,
      segmentSize: this._segmentSize
    });
    this._virtualRange = newVirtualRange;
    this._collection.setIndexes(newVirtualRange.start, newVirtualRange.stop);
  }

  public updateRangeByRemove(triggersOffset: ITriggersOffset) {
    // add code and arguments
    const newVirtualRange = calculateVirtualRange({
      currentVirtualRange: this._virtualRange,
      segmentSize: this._segmentSize
    });
    this._virtualRange = newVirtualRange;
    this._collection.setIndexes(newVirtualRange.start, newVirtualRange.stop);
  }

  public updateRangeByAdd(triggersOffset: ITriggersOffset) {
    // add code and arguments
    const newVirtualRange = calculateVirtualRange({
      currentVirtualRange: this._virtualRange,
      segmentSize: this._segmentSize
    });
    this._virtualRange = newVirtualRange;
    this._collection.setIndexes(newVirtualRange.start, newVirtualRange.stop);
  }

  public updateRangeByReset(triggersOffset: ITriggersOffset) {
    // add code and arguments
    const newVirtualRange = calculateVirtualRange({
      currentVirtualRange: this._virtualRange,
      segmentSize: this._segmentSize
    });
    this._virtualRange = newVirtualRange;
    this._collection.setIndexes(newVirtualRange.start, newVirtualRange.stop);
  }

  public updateRangeByIndex(triggersOffset: ITriggersOffset) {
    // add code and arguments
    const newVirtualRange = calculateVirtualRange({
      currentVirtualRange: this._virtualRange,
      segmentSize: this._segmentSize
    });
    this._virtualRange = newVirtualRange;
    this._collection.setIndexes(newVirtualRange.start, newVirtualRange.stop);
  }

  public shiftRangeToScrollPosition(triggersOffset: ITriggersOffset) {
    // add code and arguments
    const newVirtualRange = calculateVirtualRange({
      currentVirtualRange: this._virtualRange,
      segmentSize: this._segmentSize
    });
    this._virtualRange = newVirtualRange;
    this._collection.setIndexes(newVirtualRange.start, newVirtualRange.stop);
  }

  public getEdgeItem(): IEdgeItem {
    // add code
    return {
      key: "0",
      border: "top",
      borderDistance: 0
    };
  }

  public getScrollTopByEdgeItem(edgeItem: IEdgeItem) {
    // add code
    return 0;
  }

  public getVirtualRange(): IVirtualRange {
    return this._virtualRange;
  }

  private _updateVirtualRange() {
    this._virtualRange = calculateVirtualRange({
      currentVirtualRange: this._virtualRange,
      segmentSize: this._segmentSize
    });
    // add code apply to collection
  }
}
