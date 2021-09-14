import type { IVirtualRange } from "./Calculator";

export interface ICalculateVirtualRangeParams {
  currentVirtualRange: IVirtualRange;
  segmentSize: number;
}

// Осуществляет:
//  - первоначальный расчёт виртуальных индексов;
//  - расчет индексов при скролле;
//  - расчет индексов при скролле к определенной записи.
export function calculateVirtualRange(
  params: ICalculateVirtualRangeParams
): IVirtualRange {
  return { start: 0, stop: 0 };
}
