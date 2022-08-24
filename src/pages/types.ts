export type TCell = {
    isOpened: boolean,
    hasMine: boolean,
    isMarked: boolean,
}

export type TRow = TCell[];
export type TGrid = TRow[];