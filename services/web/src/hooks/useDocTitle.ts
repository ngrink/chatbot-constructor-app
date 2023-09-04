import { useState, useEffect } from "react";


const useDocTitle = (title: string) => {
    const [doctitle, setDocTitle] = useState(`${title} | Gigabot`);

    useEffect(() => {
        document.title = doctitle;
    }, [doctitle]);

    return [doctitle, setDocTitle];
};


export { useDocTitle };
