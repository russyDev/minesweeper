import React from 'react';
import {StyledRow} from "./styles";

type TProps = {
    children: React.ReactNode
};
export const Row = ({children}: TProps) => {
    return <StyledRow>{children}</StyledRow>
}