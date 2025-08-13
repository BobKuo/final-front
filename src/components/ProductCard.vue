<template>
  <q-card class="my-card" flat bordered>
    <q-card-section>
      <template v-if="product.images.length > 1">
        <q-carousel
          :autoplay="false"
          :arrows="true"
          :infinite="true"
          height="300px"
          swipeable
          class="rounded-borders"
          v-model="slide"
          control-type="outline"
          control-color="purple"
        >
          <q-carousel-slide
            v-for="(image, index) in product.images"
            :key="index"
            :name="index"
            :img-src="image"
            style="background-size: cover; background-position: center"
          >
            <div class="absolute-bottom text-subtitle4 text-center">
              {{ product.name }} - {{ index + 1 }}
            </div>
          </q-carousel-slide>
        </q-carousel>
      </template>
      <template v-else-if="product.images.length === 1">
        <q-img :src="product.images[0]" height="300px" fit="contain" />
      </template>
      <template v-else>
        <div class="text-caption text-grey text-center">無商品圖片</div>
      </template>
    </q-card-section>
    <q-separator />

    <q-card-section>
      <div class="row items-center">
        <div class="col text-h6 ellipsis">
          <router-link :to="'/product/' + product._id">{{ product.name }}</router-link>
        </div>
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
// import router from 'src/router'
const slide = ref(0)

const rating = ref(3)
const { product } = defineProps({
  product: Object,
})

// const goToProductDetail = () => {
//   console.log('Navigating to product detail:', product._id)
//   if (product && product._id) {
//     router.push(`/product/${product._id}`)
//   }
// }
</script>
