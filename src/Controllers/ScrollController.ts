import {
  IItemsSizesControllerOptions,
  ItemsSizesController
} from "./_scrollController/ItemsSizeController";
import {
  IObserversControllerOptions,
  ObserversController
} from "./_scrollController/ObserversController";

export interface IScrollControllerOptions
  extends IItemsSizesControllerOptions,
    IObserversControllerOptions {
  scrollTop: number;
  viewPortSize: number;
}

// Предназначен для управления скроллом и обеспечивает:
// - генерацию событий о достижении границ контента (работа с триггерами);
// - управление виртуальным скроллом и установка рассчитанных индексов;
// - скролл к записи / к границе (при необходимости - пересчёт virtualScroll);
// - сохранение / восстановление позиции скролла.
export class ScrollController {
  _itemsSizesController: ItemsSizesController;
  _observersController: ObserversController;

  constructor(options: IScrollControllerOptions) {
    this._itemsSizesController = new ItemsSizesController({
      itemsContainer: options.itemsContainer,
      itemsQuerySelector: options.itemsQuerySelector
    });

    this._observersController = new ObserversController({
      listContainer: options.listContainer,
      triggersQuerySelector: options.triggersQuerySelector,
      triggersVisibility: options.triggersVisibility,
      observersCallback: options.observersCallback
    });
  }
}
