import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const getProductLiveData = async (tokenData?: any): Promise<any> => {
    const token = tokenData;

    const payload = {
        "form": null,
        "condition": null
    }

    try {
        const response = await axios.post(`${apiBaseUrl}/ProductLive/Get`, payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

        const data = response.data;
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};


export {getProductLiveData}