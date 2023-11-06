import { useEffect } from 'react';

const useScript = (url) => {
    console.log(url)
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;
        console.log(script)
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

export default useScript;