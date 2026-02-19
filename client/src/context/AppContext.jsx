import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();
export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const axiosInstance = axios.create({
        baseURL: backendUrl
    });
    axiosInstance.interceptors.request.use((config) => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            config.headers.Authorization = `Bearer ${savedToken}`;
        }
        return config;
    });

    const [showOtpLogin, setShowOtpLogin] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState("");

    const [referrals, setReferrals] = useState([]);
    const [referralsRec, setReferralsRec] = useState([]);

    const [myReferrals, setMyReferrals] = useState([]);

    const [name, setName] = useState("");

    const fetchReferrals = async () => {
        try {
            if (!token) return; // don't call if no token

            const { data } = await axios.get(
                `${backendUrl}/api/referral/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

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
            const { data } = await axios.get(
                `${backendUrl}/api/referral/filter`,
                {
                    params: {
                        skill,
                        experience
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

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

            const { data } = await axios.get(
                `${backendUrl}/api/referral/my-referrals`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

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
        if (token) {
            fetchReferrals();
        }
    }, [token]);

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