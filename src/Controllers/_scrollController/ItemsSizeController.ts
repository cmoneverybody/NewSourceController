export interface IItemsSizesControllerOptions {
  itemsContainer: HTMLElement;
  itemsQuerySelector: string;
}

export interface IItemSize {
  height: number;
  offsetTop: number;
}

export interface IItemsSizes {
  [key: number]: IItemSize;
}

// Предназначен для получения, хранения и актуализации размеров записей.
export class ItemsSizesController {
  _itemsQuerySelector: string;
  _itemsContainer: HTMLElement;
  _itemsSizes: IItemsSizes;

  constructor(options: IItemsSizesControllerOptions) {
    this._itemsContainer = options.itemsContainer;
    this._itemsQuerySelector = options.itemsQuerySelector;
    this._updateItemsSizes();
  }

  public setItemsContainer(newItemsContainer: HTMLElement): void {
    this._itemsContainer = newItemsContainer;
    this._updateItemsSizes();
  }

  public setItemsQuerySelector(newItemsQuerySelector: string): void {
    this._itemsQuerySelector = newItemsQuerySelector;
    this._updateItemsSizes();
  }

  public updateItemsSizes() {
    this._updateItemsSizes();
  }

  private _updateItemsSizes() {
    this._itemsSizes = {};

    const items = this._itemsContainer.querySelectorAll(
      this._itemsQuerySelector
    );

    items.forEach((item) => {
      const key = item.getAttribute("key");
      this._itemsSizes[key] = {
        height: (item as HTMLElement).offsetHeight,
        offsetTop: (item as HTMLElement).offsetTop
      };
    });
  }
}
