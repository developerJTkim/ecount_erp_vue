<script setup>
let props = defineProps({
  data: {
    type: Array,
    default: [],
  },
})

const headers = [
  '품목코드',
  '재고수량',
]


</script>
<template>
    <VTable
      :headers="headers"
      :items="props.data"
      height="500"
      fixed-header
      class="elevation-1"
    >
      <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header"
        >
          {{ header }}
        </th>
      </tr>
      </thead>

      <tbody>
      <tr
        v-for="(row, idx) in props.data"
        :key="idx"
      >
        <td>
          <div class="d-flex flex-column">
            <span class="d-block font-weight-semibold text--primary text-truncate">{{ row.PROD_CD }}</span>
            <small>{{ row.PROD_CD }}</small>
          </div>
        </td>

        <td v-text="row.BAL_QTY" />
      </tr>
      </tbody>
    </VTable>
</template>
