import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const getWishlistData = async (userId?:any,tokenData?: any): Promise<any> => {
    const token = tokenData;

    const payload = {
        "form": null,
        "condition": {
            "AppUserId": userId
        }
    }

    try {
        const response = await axios.post(`${apiBaseUrl}/WishList/Get`, payload,
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

export {getWishlistData}