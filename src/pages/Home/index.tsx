import React, {useEffect, useState} from 'react';
import {Cell} from './components/cell';
import {Row} from "./components/row";
import {TCell, TGrid} from "../types";

const cell: TCell = {
    isOpened: false,
    hasBomb: false,
    isMarked: false,
    bombsCount: 0,
}

export const Home = () => {

    const width: number = 30;
    const height: number = 30;

    const [gameState, setGameState] = useState({
        inProgress: true,
        isWinner: false
    });

    const [state, setState] = useState<TGrid>([]);

    useEffect(() => {
        return () => {

            let data: TGrid = [];
            for (let i = 0; i < height; i++) {
                data.push([]);
                for (let j = 0; j < width; j++) {
                    data[i].push({
                        ...cell
                    } as TCell);
                }
            }

            for(let i = 0; i< 100; i++) {
                var rowIndex = getRandomPosition(height);
                var cellIndex = getRandomPosition(width);
                data[rowIndex][cellIndex].hasBomb = true;
                data = setBombCount(data, rowIndex, cellIndex);
            }

            setState(data);

        }
    }, []);

    const getRandomPosition = (n: number) => {
        return Math.floor(Math.random() * n);
    }

    const setBombCount = (d: TGrid, x: number, y: number) => {
        const data = [...d];
        if (data[x - 1]) {
            data[x - 1][y].bombsCount += 1;
            if (data[x - 1][y - 1]) {
                data[x - 1][y - 1].bombsCount += 1;
            }
            if (data[x - 1][y + 1]) {
                data[x - 1][y + 1].bombsCount += 1;
            }
        }
        if (data[x + 1]) {
            data[x + 1][y].bombsCount += 1;
            if (data[x + 1][y - 1]) {
                data[x + 1][y - 1].bombsCount += 1;
            }
            if (data[x + 1][y + 1]) {
                data[x + 1][y + 1].bombsCount += 1;
            }
        }

        data[x][y].bombsCount += 1;
        if (data[x][y - 1]) {
            data[x][y - 1].bombsCount += 1;
        }
        if (data[x][y + 1]) {
            data[x][y + 1].bombsCount += 1;
        }

        return data;

    }

    const onClickHandler = (rowIndex: number, cellIndex: number) => {
        const cell = state[rowIndex][cellIndex];

        openEmptyCells(rowIndex, cellIndex);

        setState(state => {
            state[rowIndex][cellIndex] = {
                ...state[rowIndex][cellIndex],
                isOpened: true
            }
            return [...state];
        });

        if (cell.hasBomb) {
            setGameState({
                ...gameState,
                inProgress: false,
                isWinner: false
            })
        }

    }

    const openEmptyCells = ( rowIndex: number, cellIndex: number) => {

        if (state[rowIndex][cellIndex].bombsCount > 0) return;

        if (state[rowIndex-1] && !state[rowIndex-1][cellIndex].isOpened && !state[rowIndex-1][cellIndex].hasBomb) {
            state[rowIndex-1][cellIndex].isOpened = true;
            setState(state => state);
            if(state[rowIndex-1][cellIndex].bombsCount === 0) {
                openEmptyCells(rowIndex-1, cellIndex);
            }
        }

       if (state[rowIndex+1] && !state[rowIndex+1][cellIndex].isOpened &&!state[rowIndex+1][cellIndex].hasBomb) {
            state[rowIndex+1][cellIndex].isOpened = true;
            setState(state => state);
            if(state[rowIndex+1][cellIndex].bombsCount === 0) {
                openEmptyCells(rowIndex+1, cellIndex);
            }
        }

        if (state[rowIndex][cellIndex+1] && !state[rowIndex][cellIndex+1].isOpened && !state[rowIndex][cellIndex+1].hasBomb) {
            state[rowIndex][cellIndex+1].isOpened = true;
            setState(state => state);
            if(state[rowIndex][cellIndex+1].bombsCount === 0) {
                openEmptyCells(rowIndex, cellIndex+1);
            }
        }

        if (state[rowIndex][cellIndex-1] && !state[rowIndex][cellIndex-1].isOpened && !state[rowIndex][cellIndex-1].hasBomb) {
            state[rowIndex][cellIndex-1].isOpened = true;
            setState(state => state);
            if(state[rowIndex][cellIndex-1].bombsCount === 0) {
                openEmptyCells(rowIndex, cellIndex-1);
            }
        }
    }

    const renderGame = () => {
        return <>{state.map((row, rowIndex) => {
            return <Row key={rowIndex}>
                {row.map((cell, cellIndex) => {
                    return <Cell key={cellIndex} data={cell} onClick={() => {
                        onClickHandler(rowIndex, cellIndex);
                    }}
                    onRightClick={(e) => {
                         e.preventDefault();

                         state[rowIndex][cellIndex] = {
                             ...state[rowIndex][cellIndex],
                             isMarked: !state[rowIndex][cellIndex].isMarked
                         }
                         setState(state => {
                             return [...state];
                         });
                    }}/>
                })}
            </Row>
        })}</>
    }

    const renderResult = () => {
        return <>Finish</>
    }

    return <>
        {gameState.inProgress ? renderGame() : renderResult()}
    </>
}