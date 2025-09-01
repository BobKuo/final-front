<template>
  <q-card flat bordered>
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
      <div
        class="text-caption text-grey"
        style="height: 60px; overflow: auto; white-space: pre-line"
      >
        {{ product.description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="justify-end">
      <q-btn outline icon="favorite" color="red" />
      <q-btn outline icon="add_shopping_cart" color="primary" @click="addToCart">
        加入購物車
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { ref } from 'vue'
import userService from 'src/services/user'
import { useUserStore } from 'src/stores/user'
import { useQuasar } from 'quasar'
// import router from 'src/router'

const slide = ref(0)

const rating = ref(3)
const { product } = defineProps({
  product: Object,
})

const userStore = useUserStore()
const $q = useQuasar()

const addToCart = async () => {
  if (!userStore.isLoggedIn) {
    $q.dialog({
      title: '需要登入',
      message: '請先登入帳號才能加入購物車',
    })
    return
  }

  try {
    const { data } = await userService.cart({
      product: product._id,
      quantity: 1,
    })

    // 更新購物車數量
    userStore.cartTotal = data.result

    $q.notify({
      type: 'positive',
      message: '已加入購物車',
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    $q.notify({
      type: 'negative',
      message: '無法加入購物車，請稍後再試',
    })
  }
}
</script>
