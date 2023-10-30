<template>
    <VRow>
      <VCol
        cols="12"
        sm="6"
        md="6"
      >
        <VCard>
          <VCardItem>
            <VCardTitle>Step 1 - getZone</VCardTitle>
          </VCardItem>

          <VCardText>
            <VCol cols="12">
              <VTextField
                v-model="getLoginInfo.ZONE"
                label="Zone"
                placeholder="zone"
                :append-inner-icon="getLoginInfo.ZONE ? 'mdi-check' : 'mdi-check-outline'"
              />
            </VCol>
            <v-btn @click="getZone">getZone</v-btn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol
        cols="12"
        sm="6"
        md="6"
      >
        <VCard>
          <VCardItem>
            <VCardTitle>Step 2 - getLoginInfo</VCardTitle>
          </VCardItem>

          <VCardText>
            <VCol cols="12">
              <VTextArea
                label="Login"
                placeholder="Login"
              >
                {{getLoginInfo.LOGIN_DATA}}
              </VTextArea>
            </VCol>
            <v-btn @click="login">login</v-btn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <Vcol
        class="ma-10"
        cols="12"
      >
        <VCardTitle>
          재고조회
        </VCardTitle>
        <DatePicker
          v-model="searchDate"
          :dateKey="'selectedErpDate'"
          @setFormatDate="setFormatDate"
        />
        <v-btn class="ma-1" @click="getErpInventoryItems(searchDate)">getErpInventoryItems</v-btn>
      </Vcol>
    </VRow>

    <VRow>
      <VCol
        cols="12"
        sm="12"
        md="12"
      >
        <ErpDatatable
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
import ErpDatatable from "@/views/erp/ErpDatatable.vue";
import moment from "moment";

const loginStore = useLoginStore();
const erpStore = useErpStore();
const loginStoreRefs = storeToRefs(loginStore);
const erpStoreRefs = storeToRefs(erpStore);
const getLoginInfo = loginStoreRefs.getLoginInfo;
const getErpInfos = erpStoreRefs.getErpInfo

let searchDate = ref(new Date());

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
