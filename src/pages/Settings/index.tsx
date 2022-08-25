import React from 'react';
import {StyledButton, StyledSettings, StyledTitle} from "./styles";
import {useSettingsState} from "./hooks/useSettingsState";

export const Settings = () => {
    const {
        difficultyOptions,
        state,
        setState,
        onStartHandler
    } = useSettingsState();

    return <StyledSettings>
        <StyledTitle>Minesweeper</StyledTitle>
        <div className="settings_controls">
            <div className="form_item">
                <label htmlFor="dif">Difficulty</label>
                <select id="dif" value={state.difficulty} onChange={(e) => {
                    setState({
                        ...state,
                        difficulty: +e.target.value
                    })
                }}>
                    {difficultyOptions.map((option) => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })}

                </select>
            </div>

            <div className="columns">
                <div className="column">
                    <div className="form_item">
                        <label htmlFor="width">Width</label>
                        <input id="width" type="number" value={state.width} onChange={(e) => {
                            setState({
                                ...state,
                                width: Math.min(+e.target.value, 30),
                                bombsCount: 0
                            })
                        }}/>
                    </div>
                </div>

                <div className="column">
                    <div className="form_item">
                        <label htmlFor="height">Height</label>
                        <input id="height" type="number" value={state.height} onChange={(e) => {
                            setState({
                                ...state,
                                height:Math.min(+e.target.value, 30),
                                bombsCount: 0
                            })
                        }}/>
                    </div>
                </div>
            </div>

            <div className="form_item">
                <label htmlFor="bombs">Bombs count</label>
                <input id="bombs" type="number" value={state.bombsCount} onChange={(e) => {
                    const {width, height} = state;
                    setState({
                        ...state,
                        bombsCount: Math.min(+e.target.value, (width*height))
                    })
                }}/>
            </div>

            <div className="form_item">
                <StyledButton  onClick={onStartHandler}>Start</StyledButton>
            </div>

        </div>
    </StyledSettings>;
}