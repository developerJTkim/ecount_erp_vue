import axios from "axios";
import router from "@/router";
import { useAppStore } from "@/store/App/AppStore";
import cookie from "js-cookie";
import Swal from "sweetalert2";

function setLoading(state) {
    const appStore = useAppStore();
    appStore.setLoadingStatus(state);
}

const env = import.meta.env;
const hostApi = env.VITE_ECOUNT_IS_TEST ?
    env.VITE_ECOUNT_TEST_API_HOST
    : env.VITE_ECOUNT_API_HOST

const erpAxios = axios.create({
    baseURL: hostApi,
    headers: {
        common: {
            Accept: "application/json",
        },
    },
});

erpAxios.interceptors.request.use(
    (request) => {
        // let userRemote = cookie.get("lwUserRemote");
        // let user = {
        //     ADMINCOMPANYYN: "",
        //     COMPANY: "",
        //     LANG: "",
        //     OWNERROLE: "",
        //     USERID: "",
        //     USERGROUP: "",
        //     WCODE: "",
        // };
        // if (userRemote) user = JSON.parse(userRemote);
        // if (request?.data) {
        //     request.data.GV_ADMINCOMPANYYN = user.ADMINCOMPANYYN;
        //     request.data.GV_COMPANY = user.COMPANY;
        //     request.data.GV_LANG = user.LANG ? user.LANG : "KO";
        //     request.data.GV_OWNERROLE = user.OWNERROLE;
        //     request.data.GV_USERID = user.USERID;
        //     request.data.GV_USERGROUP = user.USERGROUP;
        //     request.data.GV_WCODE = user.WCODE;
        // }
        //
        // const token = cookie.get("lwToken");
        // request.headers.Authorization = `${token}`;
        setLoading(true);
        return request;
    },

    (err) => {
        return Promise.reject(err);
    }
);

erpAxios.interceptors.response.use(
    (request) => {
        setLoading(false);
        // if (!env.VITE_VUE_APP_HOST_IS_PY) {
        //     let resTemp = request.data.result;
        //     let dataTemp = request.data;
        //     delete dataTemp.result;
        //     let data = Object.assign(dataTemp, resTemp);
        //     request.data = {};
        //     request.data = data;
        // }
        return request;
    },

    async (err) => {
        setLoading(false);
        const code = parseInt(err.response && err.response.status);
        switch (err?.response?.status) {
            case 500:
            case 404:
            case 400:
                // Https Issue 임시 주석
                // await setApiErrorLogging({
                //   code: code,
                //   response: err?.response,
                // });
                return Swal.fire({
                    title: `${code} Error!`,
                    text: err?.Message ?? "",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "확인",
                });
            case 401:
                //auth fail
            default:
                return Promise.reject(err);
        }
    }
);

export default erpAxios;
