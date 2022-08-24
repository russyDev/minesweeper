import React, {useState} from 'react';
import { Cell } from './components/cell';
import {Row} from "./components/row";
import {TCell, TGrid} from "../types";

const cell: TCell = {
    isOpened: false,
    hasMine: false,
    isMarked: false,
}

const grid:TGrid = [
    [cell, cell, cell],
    [cell, cell, cell],
    [cell, cell, cell],
];


export const Home = () => {

    const [state, setState] = useState(grid);

    return <>
        {state.map((row, index) => {
            return  <Row key={index}>
                {row.map((cell, index) => {
                    return <Cell key={index} data={cell} onClick={() => {
                        console.log('click event');
                    }} />
                })}
            </Row>
        })}

    </>
}