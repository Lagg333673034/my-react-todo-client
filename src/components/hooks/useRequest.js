/*
import {useState,useEffect} from 'react';

export default function (request,params='') {
    const [data, setData] = useState(null);
    const [paramsString, setParamsString] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if(params && paramsString !== params){
        setParamsString(params.map(e => e).join(','));
    }
    //console.log("params=="+params);
    useEffect(()=>{
        setLoading(true);
        request(paramsString)
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    },[]);

    return [data, loading, error];
}
*/