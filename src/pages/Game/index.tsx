import React from 'react';
import {Cell} from './components/cell';
import {Row} from "./components/row";
import {Header} from "./components/header";
import {useGameState} from "./hooks/useGameState";
import {StyledResults, StyledGameBox, StyledWrapper} from "./styles";

export const Game = () => {

    const {
        state,
        setState,
        onClickHandler,
        gameState,
        navigate,
        initGame
    } = useGameState();

    const renderGame = () => {
        return <StyledGameBox>{state.map((row, rowIndex) => {
            return <Row key={rowIndex}>
                {row.map((cell, cellIndex) => {
                    return <Cell key={cellIndex} data={cell} onClick={() => {
                        onClickHandler(rowIndex, cellIndex);
                    }}
                    onRightClick={(e) => {
                         e.preventDefault();
                         if (state[rowIndex][cellIndex].isOpened) return;

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
        })}</StyledGameBox>
    }

    const renderResult = () => {
        return <StyledResults>
            <div className="container">
                <div className="title">{gameState.isWinner ? 'You win!' : 'You loose!'}</div>
                <div className="buttons">
                    <div className="button" onClick={() => {
                        navigate('/');
                    }}>Menu</div>
                    <div className="button" onClick={initGame}>Play again</div>
                </div>
            </div>
        </StyledResults>
    }

    return <>
        <Header grid={state}/>
        <StyledWrapper>
            {renderGame()}
            {!gameState.inProgress && renderResult()}
        </StyledWrapper>

    </>
}