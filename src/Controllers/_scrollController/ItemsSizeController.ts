import { IVirtualRange } from "./Calculator";

export interface IItemsSizesControllerOptions {
  itemsContainer: HTMLElement;
  itemsQuerySelector: string;
  virtualRange: IVirtualRange;
}

export interface IItemSize {
  height: number;
  offsetTop: number;
}

export type TItemsSizes = IItemSize[];

// Предназначен для получения, хранения и актуализации размеров записей.
export class ItemsSizesController {
  _itemsQuerySelector: string;
  _itemsContainer: HTMLElement;
  _itemsSizes: TItemsSizes = [];

  constructor(options: IItemsSizesControllerOptions) {
    this._itemsContainer = options.itemsContainer;
    this._itemsQuerySelector = options.itemsQuerySelector;
    this._updateItemsSizes(options.virtualRange);
  }

  public setItemsContainer(
    newItemsContainer: HTMLElement,
    virtualRange: IVirtualRange
  ): void {
    this._itemsContainer = newItemsContainer;
    this._updateItemsSizes(virtualRange);
  }

  public setItemsQuerySelector(
    newItemsQuerySelector: string,
    virtualRange: IVirtualRange
  ): void {
    this._itemsQuerySelector = newItemsQuerySelector;
    this._updateItemsSizes(virtualRange);
  }

  public updateItemsSizes(virtualRange: IVirtualRange) {
    this._updateItemsSizes(virtualRange);
  }

  public getSizes(): TItemsSizes {
    return this._itemsSizes;
  }

  public onAddItems(position: number, count: number) {
    // add code
  }

  public onRemoveItems(position: number, count: number) {
    // add code
  }

  public onResetItems(position: number, count: number) {
    // add code
    this._itemsSizes = new Array(count);
  }

  private _updateItemsSizes(virtualRange: IVirtualRange) {
    const items = this._itemsContainer.querySelectorAll(
      this._itemsQuerySelector
    );

    items.forEach((item, index) => {
      this._itemsSizes[virtualRange.start + index] = {
        height: (item as HTMLElement).offsetHeight,
        offsetTop: (item as HTMLElement).offsetTop
      };
    });
  }
}
