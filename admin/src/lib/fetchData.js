const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchData = async (endPoint = "", setLoading = () => { }, method = "POST", payload = "") => {
    try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}${endPoint}`, {
            method,
            "body": JSON.stringify(payload),
            "headers": {
                "content-type": "application/json"
            },
            credentials : 'include'
        })
        const data = await res.json(); 
        return data;
    } catch (error) {
        console.log(error?.message);
    } finally {
        setLoading(false);
    }
}


const fetchGetData = async (endPoint = "", setLoading = () => { }) => {
    try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}${endPoint}`,{
            credentials : 'include'
        })
        console.log(res);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error?.message);
    } finally {
        setLoading(false);
    }
}

export {
    fetchData,
    fetchGetData
} ;