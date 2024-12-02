import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const getSubscriptionPackageData = async (tokenData?: any): Promise<any> => {
    const token = tokenData;

    const payload = {
        "form": null,
        "condition": null
    }
    try {
        const response = await axios.post(`${apiBaseUrl}/SubscriptionPackage/Get`, payload,
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

const searchSubscriptionPackage = async (id?: any, tokenData?: any): Promise<any> => {
    const token = tokenData;

    const payload = {
        "form": null,
        "condition": {
            "id": id
        },
        "orderColumns": null
    }

    try {
        const response = await axios.post(`${apiBaseUrl}/SubscriptionPackage/Search`, payload,
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


export { getSubscriptionPackageData, searchSubscriptionPackage }