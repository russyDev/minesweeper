import {createContext, ReactNode, useContext} from "react";
import {defaultState, TAppContext, useAppContext} from "./hooks/useAppContext";

type TProps = {
    children: ReactNode;
}

export const AppContext = createContext<TAppContext>({
    values: defaultState,
    actions: {
        handleChange: () => {}
    }
});

export const AppProvider = ({children}: TProps) => {
   const context = useAppContext();

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppState = () => useContext(AppContext);