export type TCell = {
    isOpened: boolean,
    hasBomb: boolean,
    isMarked: boolean,
    bombsCount: number,
}

export type TRow = TCell[];
export type TGrid = TRow[];