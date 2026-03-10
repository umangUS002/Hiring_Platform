import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: backendUrl
});

// attach interceptor once
axiosInstance.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
export const AppContextProvider = (props) => {

    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    // const axiosInstance = axios.create({
    //     baseURL: backendUrl
    // });

    const [showOtpLogin, setShowOtpLogin] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || "");
    const [name, setName] = useState(localStorage.getItem("name") || "");

    const [referrals, setReferrals] = useState([]);
    const [referralsRec, setReferralsRec] = useState([]);

    const [myReferrals, setMyReferrals] = useState([]);

//     useEffect(() => {
//     const interceptor = axiosInstance.interceptors.request.use((config) => {

//         const token = localStorage.getItem("token");

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     });

//     return () => {
//         axiosInstance.interceptors.request.eject(interceptor);
//     };
// }, []);

    const fetchReferrals = async () => {
        try {

            if (!token) return;

            const { data } = await axiosInstance.get("/api/referral/all");

            if (data.success) {
                setReferrals(data.referrals || []);
            } else {
                setReferrals([]);
                toast.error(data.message);
            }

        } catch (error) {
            setReferrals([]);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchReferralsRec = async (skill = "", experience = "") => {
        try {
            if (!token) return;
            const { data } = await axiosInstance.get("/api/referral/filter", {
                params: { skill, experience }
            });

            if (data.success) {
                setReferralsRec(data.referrals);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to filter referrals");
        }
    };

    const fetchMyReferrals = async () => {
        try {

            if (!token) return;

            const { data } = await axiosInstance.get("/api/referral/my-referrals");

            if (data.success) {
                setMyReferrals(data.referrals);
            } else {
                setMyReferrals([]);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to fetch applications"
            );
            setMyReferrals([]);
        }
    };


    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");
        const savedName = localStorage.getItem("name");

        if (savedName) setName(savedName);
        if (savedToken) {
            setToken(savedToken);
        }

        if (savedRole) {
            setRole(savedRole);
        }
    }, []);

    useEffect(() => {
    if (!token) return;

    if (role === "Recruiter") {
        fetchReferralsRec();   // recruiter dashboard
    }

    else if (role === "Referer") {
        fetchReferrals();
        //fetchMyReferrals();
    }

    else if (role === "Seeker") {
        fetchMyReferrals();
    }

    else if (role === "Admin") {
        fetchReferrals();
        fetchReferralsRec();
    }

}, [token, role]);

    const value = {
        showLogin, setShowLogin, token, setToken, role, setRole,
        backendUrl, referrals, fetchReferrals, axios: axiosInstance, referralsRec, fetchReferralsRec, setName, name,
        myReferrals, setMyReferrals, fetchMyReferrals, showOtpLogin, setShowOtpLogin
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}