import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const getHomeCommonData = async (tokenData?: any): Promise<any> => {
    try {
        const token = tokenData;

        const payload = {
            type: "custom",
            pageType: "admin",
            condition: null
        };

        const response = await axios.post(`${apiBaseUrl}/Home/GetHomeCommonData`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        return response.data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};


const getHomeUserData = async (tokenData?: any): Promise<any> => {
    const token = tokenData;

    const payload = {
        "type": "custom",
        "pageType": "admin",
        "condition": null
    }

    try {
        const response = await axios.post(`${apiBaseUrl}/Home/GetHomeUserData`, payload,
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


const getSearchProductData = async (tokenData?: any): Promise<any> => {
    const token = tokenData;

    const payload = {
    }

    try {
        const response = await axios.post(`${apiBaseUrl}/ProductLive/GetSearchData`, payload,
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



export { getHomeCommonData, getHomeUserData ,getSearchProductData};