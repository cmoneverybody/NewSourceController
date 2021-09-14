import { calculateVirtualRange } from "./VirtualScrollUtil";

export interface ICalculatorOptions {
  segmentSize: number;
}

export interface IVirtualRange {
  start: number;
  stop: number;
}

// Класс осуществляет:
// - сбор, хранение и актуализация любых параметров скролла: scrollTop, размер viewPort, размеры элементов, размер контента;
// - применение индексов виртуального скролла на модель, вычисление размеров виртуальных плейсхолдеров
export class Calculator {
  _range: IVirtualRange;
  _segmentSize: number;

  constructor(options: ICalculatorOptions) {
    this._segmentSize = options.segmentSize;
  }

  _updateVirtualRange() {
    this._range = calculateVirtualRange({
      currentVirtualRange: this._range,
      segmentSize: this._segmentSize
    });
  }
}
