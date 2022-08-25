import {useNavigate} from "react-router-dom";
import {useAppState} from "../../../context";
import {useCallback, useEffect, useState} from "react";
import {TCell, TGrid} from "../../types";
import _ from "lodash";

const cell: TCell = {
    isOpened: false,
    hasBomb: false,
    isMarked: false,
    bombsCount: 0,
}

export const useGameState = () => {

    const navigate = useNavigate();

    const {
        values: {
            gameSettings: {width, height, bombCount},
            isInitialized
    }} = useAppState();

    const [gameState, setGameState] = useState({
        inProgress: true,
        isWinner: false
    });
    const [state, setState] = useState<TGrid>([]);

    const initGame = useCallback(() => {
        let data: TGrid = [];
        for (let i = 0; i < height; i++) {
            data.push([]);
            for (let j = 0; j < width; j++) {
                data[i].push({
                    ...cell
                } as TCell);
            }
        }

        const matrixPositions = generateUniqueMatrix(bombCount, height, width);

        for(let i = 0; i < bombCount; i++) {
            let rowIndex = matrixPositions[i].height;
            let cellIndex = matrixPositions[i].width;
            data[rowIndex][cellIndex].hasBomb = true;

            data = setBombsCount(data, rowIndex, cellIndex-1);
            data = setBombsCount(data, rowIndex, cellIndex+1);
            data = setBombsCount(data, rowIndex-1, cellIndex-1);
            data = setBombsCount(data, rowIndex-1, cellIndex);
            data = setBombsCount(data, rowIndex-1, cellIndex+1);
            data = setBombsCount(data, rowIndex+1, cellIndex-1);
            data = setBombsCount(data, rowIndex+1, cellIndex);
            data = setBombsCount(data, rowIndex+1, cellIndex+1);
        }
        setState(data);

        setGameState({
            ...gameState,
            inProgress: true
        })
    }, [])

    useEffect(() => {
        if (!isInitialized) {
            navigate('/');
        }
    }, [isInitialized, navigate])

    useEffect(() => {
        return () => initGame()
    }, [width, height, bombCount, initGame]);

    const setBombsCount = (data:TGrid, rowIndex: number, cellIndex: number) => {
        if (data[rowIndex] && data[rowIndex][cellIndex]) {
            data[rowIndex][cellIndex].bombsCount += 1;
        }
        return [...data]
    }

    const generateUniqueMatrix = (count: number, height: number, width: number) => {
        const matrix: {height: number, width:number}[] = [];
        for(let i=0; i< count; i++) {
            let point = {height: 0, width:0};
            do {
                point = {height: Math.floor(Math.random() * height), width: Math.floor(Math.random() * width)};
            } while (_.find(matrix, (e) => {
                return e.height === point.height && e.width === point.width
            }));
            matrix.push(point);
        }
        return matrix;
    }

    const onClickHandler = (rowIndex: number, cellIndex: number) => {
        const cell = state[rowIndex][cellIndex];
        openEmptyCells(rowIndex, cellIndex);
        setState(state => {
            state[rowIndex][cellIndex] = {
                ...state[rowIndex][cellIndex],
                isOpened: true,
                isMarked: false
            }
            return [...state];
        });

        if (cell.hasBomb) {
            setGameState({
                ...gameState,
                inProgress: false,
                isWinner: false
            });
            setState(state => {
                state.forEach((row) => {
                    row.forEach((cell) => {
                        if (cell.hasBomb) {
                            cell.isOpened = true;
                        }
                    }) ;
                });
                return state;
            })
        }

        if (isGameFinished()) {
            setGameState({
                ...gameState,
                inProgress: false,
                isWinner: true
            });
        }
    }

    const isGameFinished = () => {
        let totalOpened = 0;
        state.forEach((row) => {
            row.forEach((cell) => {
                if (cell.isOpened) {
                    totalOpened +=1;
                }
            }) ;
        });
        return totalOpened + bombCount === height * width;
    }

    const isValidCell = (state:TGrid, rowIndex: number, cellIndex: number) => {
        return state[rowIndex] &&
            state[rowIndex][cellIndex] &&
            !state[rowIndex][cellIndex].isOpened &&
            !state[rowIndex][cellIndex].isMarked &&
            !state[rowIndex][cellIndex].hasBomb;
    }

    const updateCell = (state:TGrid, rowIndex: number, cellIndex: number) => {
        if (isValidCell(state, rowIndex, cellIndex)) {
            state[rowIndex][cellIndex].isOpened = true;
            setState(state => state);
            if(state[rowIndex][cellIndex].bombsCount === 0) {
                openEmptyCells(rowIndex, cellIndex);
            }
        }
    }

    const openEmptyCells = ( rowIndex: number, cellIndex: number) => {
        if (state[rowIndex][cellIndex].bombsCount > 0) return;

        updateCell(state, rowIndex-1, cellIndex);
        updateCell(state, rowIndex-1, cellIndex-1);
        updateCell(state, rowIndex-1, cellIndex+1);
        updateCell(state, rowIndex, cellIndex+1);
        updateCell(state, rowIndex, cellIndex-1);
        updateCell(state, rowIndex+1, cellIndex);
        updateCell(state, rowIndex+1, cellIndex-1);
        updateCell(state, rowIndex+1, cellIndex+1);
    }

    return {
        state,
        setState,
        onClickHandler,
        gameState,
        navigate,
        initGame
    }
}