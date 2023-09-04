import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { $axios } from "@utils/axios";


const useFetch = (url: string, config?: AxiosRequestConfig) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await $axios(url, config);
                setData(res.data);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [url, config])

    return { data, error, isLoading }
}

export { useFetch };
