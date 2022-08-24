import React from 'react';
import {TCell} from "../../../types";
import {StyledRow} from "./styles";

type TProps = {
    data: TCell;
    onClick: () => void;
}

export const Cell = ({data, onClick} : TProps) => {

    return <StyledRow onClick={onClick}/>;
}