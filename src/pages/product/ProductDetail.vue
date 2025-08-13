<template>
  <q-page class="q-ma-xl flex flex-center">
    <q-card flat bordered class="q-pa-lg shadow-2" style="width: 100%">
      <div class="row q-col-gutter-xl">
        <!-- 商品圖片區 -->
        <div class="col-12 col-md-6 flex flex-center">
          <div class="bg-grey-2 rounded-borders q-pa-sm" style="width: 100%">
            <template v-if="product.images.length > 1">
              <q-carousel
                :arrows="true"
                height="350px"
                swipeable
                class="rounded-borders full-width"
                v-model="slide"
                control-type="regular"
                control-color="purple"
                animated
                transition-prev="jump-right"
                transition-next="jump-left"
              >
                <q-carousel-slide
                  v-for="(image, index) in product.images"
                  :key="index"
                  :name="index"
                  :img-src="image"
                  style="
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  "
                >
                </q-carousel-slide>
              </q-carousel>
            </template>
            <template v-else-if="product.images.length === 1">
              <q-img
                :src="product.images[0]"
                height="350px"
                fit="contain"
                class="rounded-borders"
              />
            </template>
            <template v-else>
              <div class="text-caption text-grey text-center q-pa-lg">無商品圖片</div>
            </template>
          </div>
        </div>
        <!-- 商品資訊區 -->
        <div class="col-12 col-md-6">
          <div class="q-mb-md">
            <div class="text-h5 text-primary text-weight-bold">
              {{ product.name }}
              <q-badge transparent align="middle" color="orange"> 數位檔案 </q-badge>
            </div>
            <div class="text-subtitle2 text-grey-7 q-mb-xs">{{ product.category }}</div>
            <div class="text-h4 text-deep-orange-6 q-mb-md">${{ product.price }}</div>
            <q-separator />
            <div class="text-body1 q-mt-md" style="white-space: pre-line">
              {{ product.description }}
            </div>
          </div>
          <q-card-actions class="justify-start q-gutter-md">
            <q-input v-model.number="quantity" type="number" :min="1" outlined square />
            <q-btn
              icon="shopping_cart"
              color="primary"
              label="加入購物車"
              :disabled="!product.sell"
              @click="addToCart"
            />
          </q-card-actions>
        </div>
      </div>
    </q-card>
    <div
      v-if="!product.sell"
      class="absolute full-width bg-black text-white"
      style="opacity: 0.7; top: 0; left: 0; height: 100%"
    >
      >
      <div class="flex flex-center column text-center" style="height: 100%">
        <h1 class="text-h3 q-mb-md">已下架</h1>
        <p class="text-h5 q-mb-lg">這個商品已經下架，無法購買。</p>
        <q-btn color="primary" to="/shopping" label="返回商品列表" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import router from 'src/router'
import productService from 'src/services/product'

const route = useRoute()
const $q = useQuasar()

const slide = ref(0)
const quantity = ref(1)

const product = ref({
  name: '',
  price: 0,
  description: '',
  category: '',
  sell: true,
  images: [],
})
const getProduct = async () => {
  try {
    const { data } = await productService.getId(route.params.id)
    product.value.name = data.product.name
    product.value.price = data.product.price
    product.value.description = data.product.description
    product.value.category = data.product.category
    product.value.sell = data.product.sell
    product.value.images = data.product.images

    document.title = `${data.product.name} | JUDY WANG ART`
  } catch (error) {
    console.error('Error fetching products:', error)
    $q.notify({
      type: 'negative',
      message: '無法載入商品資料',
    })

    router.push('/')
  }
}
getProduct()
</script>
