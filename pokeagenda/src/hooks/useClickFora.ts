import { useEffect } from "react";

export function useClickFora(ref: React.RefObject<HTMLElement | null>, onClickFora: () => void) {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickFora();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [ref, onClickFora]);
}