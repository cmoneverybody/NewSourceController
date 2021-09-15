import type {
  IObserversControllerOptions,
  TObserversCallback
} from "./_scrollController/ObserversController";

import type { TObserverPosition } from "./_scrollController/ObserversController";

import type { IEdgeItem } from "./_scrollController/Calculator";

import { ItemsSizesController } from "./_scrollController/ItemsSizeController";

import { ObserversController } from "./_scrollController/ObserversController";

import { Calculator } from "./_scrollController/Calculator";
import type { IVirtualScrollCollection } from "../Collection";

export interface IScrollControllerResult {
  saveAndRestoreScroll?: boolean;
}

export interface IScrollControllerOptions extends IObserversControllerOptions {
  segmentSize: number;
  collection: IVirtualScrollCollection;
  scrollTop: number;
  viewPortSize: number;
  itemsContainer: HTMLElement;
  itemsQuerySelector: string;
}

export type TItemKey = string;

// Предназначен для управления скроллом и обеспечивает:
// - генерацию событий о достижении границ контента (работа с триггерами);
// - управление виртуальным скроллом и установка рассчитанных индексов;
// - скролл к записи / к границе (при необходимости - пересчёт virtualScroll);
// - сохранение / восстановление позиции скролла.
export class ScrollController {
  _itemsSizesController: ItemsSizesController | null = null;
  _observersController: ObserversController;
  _observersCallback: TObserversCallback;
  _calculator: Calculator;
  _edgeItem: IEdgeItem | null = null;

  constructor(options: IScrollControllerOptions) {
    this._observersCallback = options.observersCallback;
    this._observersCallbackFn = this._observersCallbackFn.bind(this);

    this._observersController = new ObserversController({
      listContainer: options.listContainer,
      triggersQuerySelector: options.triggersQuerySelector,
      triggersVisibility: options.triggersVisibility,
      observersCallback: options.observersCallback
    });

    this._calculator = new Calculator({
      segmentSize: options.segmentSize,
      itemsSizes: [],
      collection: options.collection
    });
  }

  onViewportResize(newViewPortSize: number) {
    // todo описать, кто и что должен сделать при ресайзе
    this._observersController.updateTriggersOffset();
  }

  onViewResize(newViewSize: number) {
    // todo описать, кто и что должен сделать при ресайзе
    this._observersController.updateTriggersOffset();
  }

  onAddItems(position: number, count: number): IScrollControllerResult {
    // При изменении коллекции новые размеры будут известны только после перерисовки, а значит и пересчитывать их надо тоже после перерисовки,
    // т.е. в afterUpdate надо звать метод this._itemsSizesController.updateItemsSizes();
    if (this._itemsSizesController) {
      this._itemsSizesController.onAddItems(position, count);
    }
    this._calculator.updateRangeByAdd(
      this._observersController.getTriggersOffset()
    );
    return {
      saveAndRestoreScroll: true
    };
  }

  onRemoveItems(position: number, count: number): IScrollControllerResult {
    // При изменении коллекции новые размеры будут известны только после перерисовки, а значит и пересчитывать их надо тоже после перерисовки,
    // т.е. в afterUpdate надо звать метод this._itemsSizesController.updateItemsSizes();
    if (this._itemsSizesController) {
      this._itemsSizesController.onRemoveItems(position, count);
    }
    this._calculator.updateRangeByRemove(
      this._observersController.getTriggersOffset()
    );
    return {
      saveAndRestoreScroll: true
    };
  }

  onMoveItems(
    addPosition: number,
    addCount: number,
    removePosition: number,
    removeCount: number
  ): IScrollControllerResult {
    // add code
    return {
      saveAndRestoreScroll: true
    };
  }

  onResetItems(count: number): IScrollControllerResult {
    this._calculator.updateRangeByReset(
      this._observersController.getTriggersOffset()
    );
    if (this._itemsSizesController) {
      this._itemsSizesController.onResetItems(0, count);
    }
    return {
      saveAndRestoreScroll: true
    };
  }

  // это вызывается только когда скроллят кликом в скроллбар (в остальных случаях работает через триггеры-обсерверы)
  onChangeScrollPosition(position: number) {
    //add code
    this._calculator.shiftRangeToScrollPosition(
      this._observersController.getTriggersOffset()
    );
  }

  scrollToItem(key: string): Promise<void> {
    // вроде как можно реализовать через сохранение edgeItem и последующий вызов restoreScroll
    return Promise.resolve();
  }

  scrollTo(): Promise<TItemKey> {
    // кейсы:
    // 1. pageDown/pageUp
    // 2. home/end
    // их вроде как можно реализовать через сохранение edgeItem и последующий вызов restoreScroll

    return Promise.resolve("10");
  }

  saveScroll() {
    this._edgeItem = this._calculator.getEdgeItem();
  }

  isNeedRestoreScroll(): boolean {
    return !!this._edgeItem;
  }

  restoreScroll() {
    const newScrollTop = this._calculator.getScrollTopByEdgeItem(
      this._edgeItem as IEdgeItem
    );
    this._edgeItem = null;
    // todo как здесь выстроить канал общения со scrollContainer?
    // this._notify('doScroll', [newScrollTop]);
  }

  setItemsContainer(
    newItemsContainer: HTMLElement,
    itemsQuerySelector: string
  ) {
    if (!this._itemsSizesController) {
      this._itemsSizesController = new ItemsSizesController({
        itemsContainer: newItemsContainer,
        itemsQuerySelector: itemsQuerySelector,
        virtualRange: this._calculator.getVirtualRange()
      });
    }
    this._itemsSizesController.setItemsContainer(
      newItemsContainer,
      this._calculator.getVirtualRange()
    );
    this._calculator.setSizes(this._itemsSizesController.getSizes());
  }

  setListContainer(newListContainer: HTMLElement) {
    this._observersController.setListContainer(newListContainer);
  }

  private _observersCallbackFn(position: TObserverPosition): void {
    const direction = position === "top" ? "up" : "down";
    // Либо сдвигаем диапазон виртуального скролла
    if (this._calculator.hasItemsInDirection(direction)) {
      this._calculator.shiftRangeInDirection(
        direction,
        this._observersController.getTriggersOffset()
      );
    } else {
      // Либо вызываем внешний обработчик обсервера (для догрузки данных)
      this._observersCallback(position);
    }
  }
}
