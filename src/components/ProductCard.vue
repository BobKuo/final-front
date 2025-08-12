<template>
  <q-card class="my-card" flat bordered>
    <q-img :src="product.images[0]" height="300px" fit="contain" />
    <q-separator />

    <q-card-section>
      <div class="row items-center">
        <div class="col text-h6 ellipsis">{{ product.name }}</div>
        <q-badge
          v-if="product.category"
          class="q-ml-sm"
          color="primary"
          :label="product.category"
          outline
        />
        <q-badge color="orange" class="q-ml-sm"> 已售 {{ product.sold || 0 }} </q-badge>
      </div>
      <q-rating
        v-model="rating"
        :max="5"
        readonly
        size="32px"
        color="yellow"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
      />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">${{ product.price }}</div>
      <div class="text-caption text-grey" style="height: 30px; overflow: auto">
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
import { ref } from 'vue'

const rating = ref(3)
const { product } = defineProps({
  product: Object,
})
</script>
