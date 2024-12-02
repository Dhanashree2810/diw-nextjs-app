import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const getCartData = async (userId?:any,tokenData?: any): Promise<any> => {
    const token = tokenData;

    const payload = {
        "form": null,
        "condition": {
            "AppUserId":userId
        }
    }

    try {
        const response = await axios.post(`${apiBaseUrl}/Cart/Get`, payload,
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

const cartQuantityUpdate = async (formData?: FormData,type?:any, tokenData?: any): Promise<any> => {
    const payload = {
        "form": formData,
        "type": type
    }

    const token = tokenData;

    try {
        const response = await axios.post(`${apiBaseUrl}/Cart/CartQuantityUpdate`, payload,
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

export { getCartData, cartQuantityUpdate }