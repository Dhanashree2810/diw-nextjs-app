import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserInfo {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    emailId: string;
    lastLogin: string;
    mobile: string;
    isAdmin: boolean;
    role: string;
    defaultLanguage: string;
    state: string;
    district: string;
    isPremiumUser: boolean;
    totalPlot: number;
}

interface UserStore {
    loginUserInfo: UserInfo[] | null;
    setLoginUserInfo: (user: UserInfo[]) => void;
    clearLoginUserInfo: () => void;
}


export const useUserStore = create<UserStore>((set) => ({
    loginUserInfo: null,
    setLoginUserInfo: (user) => set({ loginUserInfo: user }),
    clearLoginUserInfo: () => set({ loginUserInfo: null }),
}));


interface LoginStore {
    mobileNumber: string;
    otpNum: string;
    setMobileNumber: (no: string) => void;
    setOTPNumber: (no: string) => void;
}

export const useStore = create<LoginStore>()(
    persist(
        (set) => ({
            mobileNumber: '',
            otpNum: '',
            setMobileNumber: (no) => set({ mobileNumber: no }),
            setOTPNumber: (no) => set({ otpNum: no }),
        }),
        {
            name: 'login-storage',
            storage: createJSONStorage(() => localStorage),
            // storage: () => localStorage,
        }
    )
);

interface GlobalStore {
    watchListBind: boolean;
    watchListList: string[];
    cartListBind: boolean;
    cartListList: string[];
    setWatchListBind: (bind: boolean) => void;
    setWatchListList: (list: string[]) => void;
    setCartListBind: (bind: boolean) => void;
    setCartListList: (list: string[]) => void;
}


export const globalStore = create<GlobalStore>()(
    persist(
        (set) => ({
            watchListBind: false,
            watchListList: [],
            cartListBind: false,
            cartListList: [],
            setWatchListBind: (bind) => set({ watchListBind: bind }),
            setWatchListList: (list) => set({ watchListList: list }),
            setCartListBind: (bind) => set({ cartListBind: bind }),
            setCartListList: (list) => set({ cartListList: list }),
        }),
        {
            name: 'login-storage',
            storage: createJSONStorage(() => localStorage),
            // storage: () => localStorage,
        }
    )
);