const BASE_URL = import.meta.env.VITE_BASE_URL + "api";

const fetchData = async (endPoint = "", setLoading = (_: boolean) => { }, method = "POST", payload: any = "") => {
    try {
        setLoading(true);
        const isFormData = payload instanceof FormData;
        const requestHeaders: any = {};
        if (!isFormData) {
            requestHeaders['Content-Type'] = 'application/json';
            payload = JSON.stringify(payload);
        }
        const res = await fetch(`${BASE_URL}${endPoint}`, {
            method,
            "body": payload,
            "headers": requestHeaders,
            credentials: 'include'
        })
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log(error?.message);
    } finally {
        setLoading(false);
    }
}


const fetchGetData = async (endPoint = "", setLoading = (_: boolean) => { }) => {
    try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}${endPoint}`, {
            credentials: 'include'
        })
        console.log(res);
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log(error?.message);
    } finally {
        setLoading(false);
    }
}

export {
    fetchData,
    fetchGetData
};