<template>
  <q-card class="my-card" flat bordered>
    <q-img :src="product.images[0]" height="300px" fit="contain" />
    <q-separator />

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ product.name }}</div>
        <q-badge color="orange" class="q-ml-sm"> 已售 {{ product.sold || 0 }} </q-badge>
      </div>
      <q-rating v-model="stars" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">${{ product.price }}</div>
      <div class="text-caption text-grey">
        {{ product.description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="add_shopping_cart" />
      <q-btn flat color="primary"> 加入購物車 </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup>
const { product } = defineProps({
  product: Object,
})
</script>
