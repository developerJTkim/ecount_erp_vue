const erpApi = {};

const env = import.meta.env;

erpApi.host = env.VITE_ECOUNT_IS_TEST ?
    env.VITE_ECOUNT_TEST_API_HOST
    : env.VITE_ECOUNT_API_HOST

//Zone 조회
erpApi.getZone = `${erpApi.host}/OAPI/V2/Zone`;

//
// https://sboapi{ZONE}.ecount.com/OAPI/V2/InventoryBalance/GetListInventoryBalanceStatus?SESSION_ID={SESSION_ID}


export default erpApi;
