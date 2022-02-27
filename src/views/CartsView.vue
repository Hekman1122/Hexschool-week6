<template>
  <div class="carts">
    <button
      type="button"
      @click="deleteAll"
      :class="{ disable: cartData.final_total === 0 }"
    >
      清空購物車
    </button>
    <table>
      <thead>
        <tr>
          <th>圖片</th>
          <th>產品名稱</th>
          <th>售價</th>
          <th>調整數量</th>
          <th>調整產品</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartData.carts" :key="item.id">
          <td><img :src="item.product.imageUrl" /></td>
          <td>{{ item.product.title }}</td>
          <td>{{ item.final_total }}</td>
          <td>
            <select
              name="amount"
              v-model="item.qty"
              @change="updateCartItem(item)"
            >
              <option :value="num" v-for="num in 100" :key="num">
                {{ num }}
              </option></select
            ><label for="amount">{{ item.qty + item.product.unit }} </label>
          </td>
          <td>
            <i class="far fa-trash-alt" @click="deleCartItem(item.id)"></i>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">
            <h3>總計 : {{ cartData.final_total }} 元</h3>
          </td>
        </tr>
      </tfoot>
    </table>
    <div>
      <button
        type="button"
        :class="{ disable: cartData.final_total === 0 }"
        @click="payCheck($event)"
      >
        結帳
      </button>
    </div>
  </div>
  <div class="form-page">
    <h2>使用者登入</h2>
    <FormView ref="form" @submit="login">
      <div class="input-box">
        <label for="email">信箱</label>
        <FieldView
          id="email"
          name="信箱"
          type="email"
          placeholder="請輸入信箱"
          rules="email|required"
          v-model="user.email"
        ></FieldView>
        <ErrorMessage name="信箱"></ErrorMessage>
      </div>
      <div class="input-box">
        <label for="fullName">姓名</label>
        <FieldView
          id="fullName"
          name="姓名"
          type="text"
          placeholder="請輸入姓名"
          rules="required"
          v-model="user.name"
        ></FieldView>
        <ErrorMessage name="姓名"></ErrorMessage>
      </div>
      <div class="input-box">
        <label for="cellphone">電話</label>
        <FieldView
          id="cellphone"
          name="電話"
          type="tel"
          placeholder="請輸入電話"
          rules="min:8|required|max:12"
          v-model="user.tel"
        ></FieldView>
        <ErrorMessage name="電話"></ErrorMessage>
      </div>
      <div class="input-box">
        <label for="address">住址</label>
        <FieldView
          id="address"
          name="住址"
          type="text"
          placeholder="請輸入住址"
          rules="required"
          v-model="user.address"
        ></FieldView>
        <ErrorMessage name="住址"></ErrorMessage>
      </div>

      <div class="input-box">
        <label for="message">留言</label>
        <textarea id="message" cols="48" rows="10"></textarea>
      </div>
      <div class="input-box">
        <button type="submit">送出</button>
      </div>
    </FormView>
  </div>
</template>

<script>
import emitter from '@/library/emitter.js'
export default {
  data () {
    return {
      url: process.env.VUE_APP_URL,
      path: process.env.VUE_APP_PATH,
      cartData: {},
      user: {}
    }
  },
  computed: {
    userData () {
      return {
        user: this.user
      }
    }
  },
  methods: {
    getCarts () {
      this.$http
        .get(`${this.url}/api/${this.path}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    login () {
      alert(`${this.user.name} 歡迎您!`)
      this.$refs.form.resetForm()
    },
    deleCartItem (id) {
      this.isLoading = id
      this.$http
        .delete(`${this.url}/api/${this.path}/cart/${id}`)
        .then((res) => {
          alert('該商品已刪除')
          emitter.emit('cart-change')
          this.getCarts()
          this.isLoading = ''
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    updateCartItem (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoading = item.id
      this.$http
        .put(`${this.url}/api/${this.path}/cart/${item.id}`, {
          data
        })
        .then((res) => {
          this.getCarts()
          this.isLoading = ''
        })
    },
    deleteAll () {
      this.$http
        .delete(`${this.url}/api/${this.path}/carts`)
        .then((res) => {
          alert('商品已全部刪除')
          emitter.emit('cart-change')
          this.getCarts()
        })
        .catch((err) => {
          console.dir(err)
        })
    },
    // 結帳
    payCheck (e) {
      if (this.user.name) {
        const data = { ...this.userData }
        e.target.classList.add('disable')
        this.$http
          .post(`${this.url}/api/${this.path}/order`, { data: data })
          .then((res) => {
            alert('結帳成功!')
            e.target.classList.remove('disable')
            emitter.emit('cart-change')
            this.getCarts()
          })
          .catch((err) => {
            console.dir(err.data.message)
          })
      } else {
        alert('請先登入')
        e.target.classList.remove('disable')
      }
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>

<style lang="sass" scoped>
$font-color-1: #273c75
$font-color-2: rgba(179, 0, 0, 0.89)
$bg-color-1: #ecf9ff
$bg-color-2: #fff1c5
$shadow-1: 1px 2px 2px $font-color-1 ,-1px -1px 2px #b1b1b1
$shadow-2: -1px -2px 2px $font-color-1,1px 1px 2px #b1b1b1

.carts
    width: 70%
    margin: 30px auto
    table
        width: 100%
        text-align: center
        margin: 0 auto
        border-collapse: collapse
        border: 2px solid $font-color-2
        thead th
            padding: 10px
            font-size: 22px
        tr
            border-bottom: 2px solid $font-color-2
            margin: 10px 0
            font-size: 20px
            font-weight: 600
        td
            padding: 15px 0
        tfoot
            td
                text-align: center
                padding: 15px
        img
            width: 150px
            height: 150px
            border-radius: 10px
            box-shadow: $shadow-1
        select
            background: transparent
            width: 60px
            padding: 5px
            font-size: 18px
            border: 2px solid $font-color-2
            height: 35px
            line-height: 30px
            border-radius: 10px
            text-align: center
            margin-right: 12px
        i
            margin: 0 10px
            font-size: 20px
            line-height: 20px
            color: $font-color-2
            opacity: 0.5
            transition: all 0.5s
            &:hover
                opacity: 1
                font-size: 24px
                cursor: pointer
    button
        background: transparent
        outline: none
        color: $font-color-2
        border: 2px solid $font-color-1
        padding: 10px
        font-size: 18px
        border-radius: 10px
        width: 120px
        transition: all 0.5s
        opacity: 0.5
        height: 40px
        line-height: 20px
        margin-bottom: 5px
        &:hover
            cursor: pointer
            opacity: 1
    button.disable
        pointer-events: none
        cursor: default
        opacity: 0.2
    div
        &:last-child
            text-align: right
            button
                color: $font-color-2
                border: 2px solid $font-color-2
                font-weight: 600
                margin: 10px 0
                box-shadow: 1px 1px 2px $font-color-1
.form-page
    font-size: 18px
    height: 630px
    width: 430px
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3), -1px -2px 3px rgba(206, 206, 206, 0.5)
    border-radius: 15px
    padding: 10px 30px
    display: flex
    flex-direction: column
    margin: 20px auto
    h2
        width: 100%
        background-color: $bg-color-2
        letter-spacing: 2px
        font-size: 24px
        height: 45px
        border-radius: 13px
        line-height: 45px
        text-align: center
.input-box
    display: flex
    flex-direction: column
    align-items: flex-start
    height: 90px
    font-size: 18px
    margin: 10px auto
    label
        font-size: 20px
        margin: 5px 0
        color: $font-color-1
    span
        align-self: flex-end
        color: $font-color-2
        font-size: 16px
        margin: 8px 0
    input
        padding: 8px
        font-size: 18px
        width: 100%
        height: 32px
        display: inline-block
        outline: none
        background: transparent
        border: 2px solid rgb(199, 199, 199)
        border-radius: 8px
        margin: 5px 0
        transition: all 0.5s
        &:focus
            border: 2px solid $font-color-1
.input-box:last-child
    flex-direction: row
    justify-content: flex-end
    gap: 20px
    button
        background: transparent
        outline: none
        color: $font-color-2
        border: 2px solid $font-color-1
        padding: 12px
        font-size: 18px
        border-radius: 15px
        width: 100px
        transition: all 0.5s
        opacity: 0.8
        height: 50px
        line-height: 26px
        &:hover
            cursor: pointer
            opacity: 1
</style>
