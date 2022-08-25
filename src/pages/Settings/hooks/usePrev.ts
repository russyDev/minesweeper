import {useEffect, useRef} from "react";

export const usePrev = (value: unknown) => {
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}