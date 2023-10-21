<template>
  <VRow class="match-height">
    <v-btn @click="login">login</v-btn>
    <v-btn @click="getZone">getZone</v-btn>
    <v-btn @click="getErpInventoryItems(searchDate)">getErpInventoryItems</v-btn>
    <v-card>
      ZONE : {{loginStoreRefs.ZONE}}
      COM_CODE: {{loginStoreRefs.COM_CODE}}
      LOGIN_DATA: {{loginStoreRefs.LOGIN_DATA}}
    </v-card>

<!--    <v-card>-->
<!--      {{ erpStoreRefs }}-->
<!--    </v-card>-->

    <DatePicker
      v-model="searchDate"
      :dateKey="'selectedErpDate'"
      @setFormatDate="setFormatDate"
    />
    <VCol cols="12">
      <AnalyticsDatatable
        :data="getErpInfos"
      />
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, onMounted, defineEmits, computed } from "vue";
import { useLoginStore } from "@/store/App/Login";
import { useErpStore } from "@/store/Erp/Erp";
import { storeToRefs } from "pinia";
import DatePicker from "@/layouts/components/DatePicker.vue";
import AnalyticsDatatable from "@/views/dashboards/analytics/AnalyticsDatatable.vue";
import moment from "moment";

const loginStore = useLoginStore();
const erpStore = useErpStore();
const loginStoreRefs = storeToRefs(loginStore);
const erpStoreRefs = storeToRefs(erpStore);
const getLoginInfo = loginStoreRefs.getLoginInfo;
const getErpInfos = erpStoreRefs.getErpInfo

const searchDate = new Date();

const login = async () => {
  await loginStore.login();
}
const getZone = async () => {
  await loginStore.getZone();
}
const getErpInventoryItems = async (searchDate) => {
  await erpStore.getErpInventoryItems(searchDate);
}

const setFormatDate = (value, key) => {
  if (key === "selectedErpDate") {
    searchDate.value = moment(value).format('YYYYMMDD');
  }
};
onMounted( async() => {

})
</script>
