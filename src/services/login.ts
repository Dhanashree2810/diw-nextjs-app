import axios from "axios";

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const SendLoginOtp = async (mobileNumber?: any): Promise<any> => {
    const payload = {
        mobile: mobileNumber
    };

    try {
        const response = await axios.post(`${apiBaseUrl}/Login/SendLoginOtp`, payload);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};


const ValidateOtp = async (mobileNumber?: any, enteredOtp?: any): Promise<any> => {
    const payload = {
        mobileNo: mobileNumber,
        otp: enteredOtp
    };

    try {
        const response = await axios.post(`${apiBaseUrl}/Login/ValidateOtp`, payload);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};


const LoginMobile = async (mobileNumber?: any, enteredOtp?: any): Promise<any> => {
    const payload = {
        mobile: mobileNumber,
        otp: enteredOtp
    };

    try {
        const response = await axios.post(`${apiBaseUrl}/Login/LoginMobile`, payload);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const getUserInfo = async (mobileNumber?: any, enteredOtp?: any): Promise<any> => {
    const payload = {
        mobile: mobileNumber,
        otp: enteredOtp
    };

    try {
        const response = await axios.post(`${apiBaseUrl}/Login/LoginMobile`, payload);
        const data = response.data;
        return response.data.userInfo;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const RegisterAppUser = async (userData?: any): Promise<any> => {
    try {
        const response = await axios.post(`${apiBaseUrl}/AppUser/Register`, userData);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};



export { SendLoginOtp, ValidateOtp, LoginMobile, RegisterAppUser, getUserInfo }