import React, {useEffect, useState} from 'react';
import { Cell } from './components/cell';
import {Row} from "./components/row";
import {TCell, TGrid} from "../types";

const cell: TCell = {
    isOpened: false,
    hasMine: false,
    isMarked: false,
}

const grid:TGrid = [
    [cell, cell],
    [cell, cell],
];


export const Home = () => {

    const width: number = 8;
    const height: number = 8;

    const [state, setState] = useState(grid);


    useEffect(() => {
        const data: TGrid = [];
        for(let i = 0; i < height; i++) {
            data.push([]);
            for(let j = 0; j < width; j++) {
                data[i].push(cell);
            }
        }
        setState(data);

    }, []);


    return <>
        {state.map((row, rowIndex) => {
            return  <Row key={rowIndex}>
                {row.map((cell, cellIndex) => {
                    return <Cell key={cellIndex} data={cell} onClick={() => {

                        setState(state => {
                            state[rowIndex][cellIndex] = {
                                ... state[rowIndex][cellIndex],
                                isOpened: true
                            }
                            return [...state];
                        });

                    }}

                    onRightClick={(e) => {
                        e.preventDefault();
                        setState(state => {
                            state[rowIndex][cellIndex] = {
                                ... state[rowIndex][cellIndex],
                                isMarked: !state[rowIndex][cellIndex].isMarked
                            }
                            return [...state];
                        });
                    }}/>
                })}
            </Row>
        })}

    </>
}