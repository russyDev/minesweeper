import React, {MouseEventHandler} from 'react';
import classNames from 'classnames'
import {TCell} from "../../../types";
import {StyledRow} from "./styles";

type TProps = {
    data: TCell;
    onClick: () => void;
    onRightClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const Cell = ({data, onClick, onRightClick} : TProps) => {

    return <StyledRow className={classNames({
        unknown: !data.isOpened && !data.isMarked,
        marked: data.isMarked,
    })} onClick={onClick} onContextMenu={onRightClick}/>;
}