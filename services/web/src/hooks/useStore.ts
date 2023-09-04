import { useContext } from 'react';
import { Context } from '@store/index';


const useStore = () => {
    return useContext(Context);
}

export { useStore };
