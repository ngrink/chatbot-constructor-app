import { useState, ChangeEvent } from "react";


const useInput = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {value, onChange}
}

export { useInput };
