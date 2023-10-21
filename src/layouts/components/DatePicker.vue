<template>
  <div class="datePicker" :style="style">
    <VueDatePicker
      v-model="date"
      locale="ko"
      :format="format"
      auto-apply
      :enable-time-picker="false"
      :auto-position="true"
      allow-prevent-default
      :disabled="props.disabled"
      :clearable="false"
      :placeholder="props.placeHolder"
      week-start="0"
    >
    </VueDatePicker>
  </div>
</template>

<script setup>
import { computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import moment from "moment";
let date = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (value !== null) value.setHours(0, 0, 0);
    emit("setFormatDate", value, props.dateKey);
    return emit("update:modelValue", value);
  },
});

const format = (date) => moment(date).format( "YYYY-MM-DD");

let emit = defineEmits(["update:modelValue", "setFormatDate"]);

let props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  dateKey: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [Date, String],
    default: null,
  },
  style: {
    type: String,
    default: null,
  },
  placeHolder: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
