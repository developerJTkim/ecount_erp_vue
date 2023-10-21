<script setup>
let props = defineProps({
  data: {
    type: Array,
    default: [],
  },
})

const status = {
  1: 'Current',
  2: 'Professional',
  3: 'Rejected',
  4: 'Resigned',
  5: 'Applied',
}
const statusColor = {
  Current: 'primary',
  Professional: 'success',
  Rejected: 'error',
  Resigned: 'warning',
  Applied: 'info',
}
const headers = [
  'PROD_CD',
  'BAL_QTY',
]

</script>

<template>
  <VCard>
    <VTable
      :headers="headers"
      :items="props.data"
      item-key="fullName"
      class="table-rounded"
      hide-default-footer
      disable-sort
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
  </VCard>
</template>
