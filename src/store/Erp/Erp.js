import { computed, ref } from "vue";
import { defineStore } from "pinia";
import cookie from "js-cookie";

import erpAxios from "@/plugins/erpAxios";
import erpApi from "@/helper/erpApi";
import Swal from "sweetalert2";
import moment from "moment/moment";

const env = import.meta.env;
export const useErpStore = defineStore("erpStore", () => {
    const erpInfo = ref({});

    const getErpInfo = computed(() => erpInfo.value);

    async function getErpInventoryItems(searchDate = new Date()) {
        console.log(cookie.get("LOGIN_DATA"))
        if(!cookie.get("LOGIN_DATA") || !cookie.get("ZONE")) {
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

        const result = await erpAxios.post(`https://sboapi${cookie.get("ZONE")}.ecount.com/OAPI/V2/InventoryBalance/GetListInventoryBalanceStatus?SESSION_ID=${loginData.SESSION_ID}`, {
            BASE_DATE: moment(searchDate).format('YYYYMMDD'),
            SESSION_ID: loginData.SESSION_ID
        })

        setErpInfos(result.data.Data.Result)
        console.log(result.data.Data.Result)
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
    }

    function setErpInfos(result) {
        erpInfo.value = result;
    }

    return {
        getErpInventoryItems,
        getErpInfo
    };
});
