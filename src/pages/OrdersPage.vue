<template>
  <q-page class="flex flex-center">
    <div style="overflow-x: auto; max-width: 100%">
      <q-table
        separator="cell"
        :rows="filteredOrders"
        :columns="columns"
        row-key="_id"
        class="q-table--dense"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template #top>
          <q-toolbar>
            <q-input v-model="searchId" dense outlined clearable placeholder="搜尋訂單編號">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-space />
            <q-input v-model="searchDate" dense outlined clearable placeholder="搜尋建立日期">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
        </template>
        <template #body-cell-cartobj="props">
          <q-td :props="props" style="width: 300px">
            <div v-for="(item, index) in props.row.cart" :key="index">
              {{ item.product.name }} ({{ item.quantity }}) - ${{ item.product.price }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import orderService from 'src/services/order'

const $q = useQuasar()

const orders = ref([])

const columns = [
  { name: 'orderid', label: '訂單編號', field: '_id' },
  {
    name: 'createdAt',
    label: '建立日期',
    field: (item) => new Date(item.createdAt).toLocaleString(),
    sortable: true,
  },
  { name: 'cartobj', label: '商品', field: 'cart', sortable: false },
  {
    name: 'totalPrice',
    label: '總金額',
    field: (item) =>
      item.cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
  },
]

const getOrders = async () => {
  try {
    const { data } = await orderService.getMy()
    orders.value = data.result
  } catch (error) {
    console.error('Error fetching orders:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入訂單資料',
    })
  }
}
getOrders()

// 搜尋功能
const searchId = ref('')
const searchDate = ref('')

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const idMatch =
      !searchId.value || order._id.toLowerCase().includes(searchId.value.toLowerCase())
    const dateMatch =
      !searchDate.value || order.createdAt.toLowerCase().includes(searchDate.value.toLowerCase())
    return idMatch && dateMatch
  })
})
</script>
