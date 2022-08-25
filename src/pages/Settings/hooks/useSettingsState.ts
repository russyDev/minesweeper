import {useEffect, useState} from "react";
import {usePrev} from "./usePrev";
import _ from "lodash";
import {useAppState} from "../../../context";

const defaultState = {
    difficulty: 0,
    width: 10,
    height: 10,
    bombsCount: 10
}

export const useSettingsState = () => {

    const {actions: {handleChange}} = useAppState();

    const [state, setState] = useState(defaultState);

    const difficultyOptions = [
        {
            label: 'Easy',
            value: 0
        },
        {
            label: 'Medium',
            value: 1
        },
        {
            label: 'Hard',
            value: 2
        }
    ];

    const prevStateDiff = usePrev(state.difficulty);
    useEffect(() => {
        if (!_.isEqual(prevStateDiff, state.difficulty)) {
            switch (state.difficulty) {
                case 0:
                    setState({
                        ...state,
                        ...defaultState
                    });
                    break;
                case 1:
                    setState({
                        ...state,
                        width: 15,
                        height: 15,
                        bombsCount: 20
                    });
                    break;
                case 2:
                    setState({
                        ...state,
                        width: 20,
                        height: 20,
                        bombsCount: 40
                    });
                    break;
            }
        }

    }, [state, prevStateDiff]);

    const onStartHandler = () => {
        handleChange({
            gameSettings: {
                width: state.width,
                height: state.height,
                bombCount: state.bombsCount
            },
            isInitialized: true
        });
    }

    return {
        difficultyOptions,
        state,
        setState,
        onStartHandler
    };
}