<template>
  <VRow class="match-height">
    <v-btn @click="login">login</v-btn>
    <v-btn @click="getZone">getZone</v-btn>
    <v-btn @click="getErpInventoryItems">getErpInventoryItems</v-btn>
    <v-card>
      ZONE : {{loginStoreRefs.ZONE}}
      COM_CODE: {{loginStoreRefs.COM_CODE}}
      LOGIN_DATA: {{loginStoreRefs.LOGIN_DATA}}
    </v-card>

    <v-card>
      {{ erpStoreRefs }}
    </v-card>

<!--    @setFormatDate="setFormatDate"-->
<!--    style="margin: 15px 0px"-->
    <VCol cols="12">
      <AnalyticsDatatable />
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, onMounted, defineEmits, computed } from "vue";
import { useLoginStore } from "@/store/App/Login";
import { useErpStore } from "@/store/Erp/Erp";
import { storeToRefs } from "pinia";

const loginStore = useLoginStore();
const erpStore = useErpStore();
const loginStoreRefs = storeToRefs(loginStore);
const erpStoreRefs = storeToRefs(erpStore);
const getLoginInfo = loginStoreRefs.getLoginInfo;

const login = async () => {
  await loginStore.login();
}
const getZone = async () => {
  await loginStore.getZone();
}
const getErpInventoryItems = async () => {
  await erpStore.getErpInventoryItems();
}
onMounted( async() => {

})
</script>
