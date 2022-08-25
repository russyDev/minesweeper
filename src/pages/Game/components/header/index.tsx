import React, {useEffect, useState} from 'react';
import {StyledHeader} from "./styles";
import {TGrid} from "../../../types";
import {StyledCell} from "../cell/styles";
import { StyledButton } from './styles';
import {useNavigate} from "react-router-dom";

type TProps = {
    grid: TGrid;
}
export const Header = ({grid}: TProps) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        total: 0,
        opened: 0
    });

    useEffect(() => {
        const data = {
            total: 0,
            opened: 0
        };

        grid.forEach((row) => {
           row.forEach((cell) => {
               data.total +=1;
             if (cell.isOpened) {
                 data.opened +=1;
             }
           }) ;
        });
        setState(data);

    }, [grid]);

    return <StyledHeader>
        <div className="left">
            <StyledCell />
            <span>
                {state.opened} / {state.total}
            </span>
        </div>
        <div className="right">
            Minesweeper <StyledButton onClick={() => {
            navigate('/');
        }}>Menu</StyledButton>
        </div>
    </StyledHeader>
}