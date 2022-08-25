import React, {MouseEventHandler} from 'react';
import classNames from 'classnames'
import {TCell} from "../../../types";
import {StyledCell} from "./styles";

type TProps = {
    data: TCell;
    onClick: () => void;
    onRightClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const Cell = ({data, onClick, onRightClick} : TProps) => {
    return <StyledCell className={classNames({
        unknown: !data.isOpened && !data.isMarked,
        marked: data.isMarked,
        blasted: data.hasBomb && data.isOpened,
    })} onClick={onClick} onContextMenu={onRightClick}>
        {!data.hasBomb && (data.isOpened && data.bombsCount > 0 ? data.bombsCount : '')}
    </StyledCell>;
}