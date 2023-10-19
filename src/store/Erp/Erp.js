import { computed, ref } from "vue";
import { defineStore } from "pinia";
import cookie from "js-cookie";

import erpAxios from "@/plugins/erpAxios";
import erpApi from "@/helper/erpApi";
import Swal from "sweetalert2";

const env = import.meta.env;
export const useErpStore = defineStore("erpStore", () => {
    const erpInfo = ref({});

    //cookie.set("lwToken", token, { expires: 3, sameSite: "lax" });
    const getErpInfo = computed(() => erpInfo.value);

    async function getErpInventoryItems(searchDate = '') {
        console.log(cookie.get("LOGIN_DATA"))
        if(!cookie.get("LOGIN_DATA")) {
            return Swal.fire({
                title: `Error!`,
                text: `Login 정보가 없습니다. Login 데이터를 조회 해주세요`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
        }

        const loginData = JSON.parse(cookie.get("LOGIN_DATA"));
        if(!loginData.SESSION_ID) {
            return Swal.fire({
                title: `Error!`,
                text: `Login 정보가 없습니다. Login 데이터를 조회 해주세요`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
        }


        console.log(loginData);
        // const result = await erpAxios.post(erpApi.getZone, {
        //     COM_CODE: COM_CODE === ''
        //         ? env.VITE_AART_ECOUNT_COM_CODE : COM_CODE
        // });
        // console.log(result.data.Data)
        // setZoneInfo(result.data?.Data?.ZONE)
    }

    async function login(COM_CODE='', API_CERT_KEY ='', LAN_TYPE = 'ko-KR', ZONE =''){
        const {
            SESSION_ID
        } = getLoginInfo.value
        if(SESSION_ID) {
            return Swal.fire({
                title: `Error!`,
                text: `이미 로그인을 시도하였습니다. SESSIONID: ${SESSION_ID}`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
        }

        if(!cookie.get('ZONE')) {
            return Swal.fire({
                title: `Error!`,
                text: `ZONE 정보가 없습니다. ZONE 정보 조회를 먼저 해주세요`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
        }
        const result = await erpAxios.post(`https://sboapi${cookie.get('ZONE')}.ecount.com/OAPI/V2/OAPILogin`,{
            COM_CODE: env.VITE_AART_ECOUNT_COM_CODE,
            USER_ID: env.VITE_AART_ECOUNT_API_TEST_ID,
            API_CERT_KEY: env.VITE_AART_ECOUNT_API_TEST_KEY,
            // LAN_TYPE: 'ko-KR',
            ZONE: cookie.get('ZONE')
        })
        console.log(result.data.Data);
        setLoginInfo(result.data.Data.Datas);
    }

    function setZoneInfo(ZONE) {
        console.log('setZoneInfo',ZONE)
        cookie.set('ZONE',ZONE);
        loginInfo.value.ZONE = ZONE;
    }
    function setLoginInfo(result) {
        console.log(result);
        cookie.set('LOGIN_DATA',JSON.stringify(result));
        loginInfo.value.LOGIN_DATA = result;
    }

    return {
        getErpInventoryItems
    };
});
