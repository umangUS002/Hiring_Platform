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

    const [showLogin, setShowLogin] = useState(true);

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState("");

    const [referrals, setReferrals] = useState([]);
    const [referralsRec, setReferralsRec] = useState([]);

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


    const fetchReferralsRec = async (skill = "", exp = "") => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/referral/filter`,
                {
                    params: { skill, experience: exp },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (data.success) {
                setReferralsRec(data.referrals);
            }

        } catch (error) {
            toast.error("Failed to fetch referrals");
        }
    };



    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");

        if (savedToken) {
            setToken(savedToken);
        }

        if (savedRole) {
            setRole(savedRole);
        }
    }, []);

    useEffect(() => {
        fetchReferrals();
    }, []);

    const value = {
        showLogin, setShowLogin, token, setToken, role, setRole,
        backendUrl, referrals, fetchReferrals, axios: axiosInstance, referralsRec, fetchReferralsRec
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}