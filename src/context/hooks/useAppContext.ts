import {useState} from "react";
import {useNavigate} from "react-router-dom";

export type TContextValue = {
   gameSettings: {
       width: number;
       height: number;
       bombCount: number;
   },
    isInitialized: boolean;
}

export type TAppContext = {
    values: TContextValue,
    actions: {
        handleChange: (data: TContextValue) => void;
    }
};

export const defaultState: TContextValue = {
    gameSettings: {
        width: 0,
        height: 0,
        bombCount: 0
    },
    isInitialized: false,
}

export const useAppContext = (): TAppContext => {
    const [state, setState] = useState<TContextValue>(defaultState);
    const navigate = useNavigate();

    const handleChange = (data: TContextValue) => {
        setState(data);
        navigate('game');
    }

    return {
        values: {
            ...state
        },
        actions: {
            handleChange
        }
    }
}