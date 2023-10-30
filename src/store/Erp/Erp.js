import { computed, ref } from "vue";
import { defineStore } from "pinia";
import cookie from "js-cookie";

import erpAxios from "@/plugins/erpAxios";
import Swal from "sweetalert2";
import moment from "moment/moment";

const env = import.meta.env;
export const useErpStore = defineStore("erpStore", () => {
    const erpInfo = ref([]);

    const getErpInfo = computed(() => erpInfo.value);

    async function getErpInventoryItems(searchDate = new Date()) {
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
    }

    function setErpInfos(result) {
        erpInfo.value = result;
    }

    return {
        getErpInventoryItems,
        getErpInfo
    };
});
