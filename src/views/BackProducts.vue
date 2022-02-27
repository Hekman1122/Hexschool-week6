<template>
    <div id='mainPage'>
        <h1>產品列表</h1>
        <table>
            <thead>
                <tr>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th>查看細節</th>
                    <th>刪除嗎?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" item in products" :key="item.id">
                    <td>{{item.title}}</td>
                    <td>{{item.origin_price}}</td>
                    <td>{{item.price}}</td>
                    <td>
                        <span v-if="item.is_enabled" class="enable">啟用</span>
                        <span v-else class="disable">未啟用</span>
                    </td>
                    <td>
                        <button class='tableButton' type="button" @click="getSingleProduct(item.id)">點我</button>
                    </td>
                    <td>
                        <button class='tableButton' type="button" @click="deleteProducts(item.id)">刪除</button>
                    </td>
                </tr>
            </tbody>

        </table>
        <div id='showDetail'>
            <h1>單一產品細節</h1>
            <div class="itemContent" v-if="temp.title">
                <div class="col-1">
                    <img class='largepic' :src="temp.imageUrl">
                    <ul>
                        <li v-for="(item , i) in temp.imagesUrl" :key="i">
                            <img class="smallpic" :src="item">
                        </li>
                    </ul>
                </div>

                <div class="col-2">
                    <h2>{{temp.title}} <span>{{temp.category}}</span></h2>
                    <p>商品描述 : {{temp.description}}</p>
                    <p>商品內容 : {{temp.content}}</p>
                    <p>產品售價 : 超激價! {{temp.price}} <span class='originPrice'>{{temp.origin_price}}</span> 個 / 元</p>
                    <p>尚有數量 : {{temp.num}} {{temp.unit}}</p>
                </div>

            </div>
            <div v-else>請選擇一個商品查看</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      url: process.env.VUE_APP_URL,
      path: process.env.VUE_APP_PATH,
      username: '',
      password: '',
      products: [],
      temp: {}
    }
  },
  methods: {
    // 取得產品列表
    getProducts: function () {
      this.$http.get(`${this.url}/api/${this.path}/admin/products/all`)
        .then(res => {
          // 將回傳資料指定給Vue元件的products變數
          this.products = res.data.products
        })
        .catch(err => {
          console.dir(err)
        })
    },

    // 取得單一產品資訊 無需驗證
    getSingleProduct: function (id) {
      this.$http.get(`${this.url}/api/${this.path}/product/${id}`)
        .then(res => {
          // 將回傳資料指定給Vue元件的temp變數
          this.temp = res.data.product
        })
        .catch(err => {
          console.dir(err)
        })
    },

    // 刪除產品
    deleteProducts: function (id) {
      const confirmText = prompt('Are you sure you want to delete this product?', 'yes / no')
      if (confirmText.toLowerCase().trim() === 'yes') {
        this.$http.delete(`${this.url}/api/${this.path}/admin/product/${id}`)
          .then(res => {
            this.getProducts()
          })
          .catch(err => {
            console.dir(err)
          })
      }
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
#mainPage {
    padding: 1% 5% 0 5%;
    letter-spacing: 2px;
    margin: 20px auto;
}

h1 {
  font-size: 30px;
}

table {
  width: 90%;
  text-align: center;
  margin: 0 auto;
  border-collapse: collapse;

  thead th {
    padding: 10px;
    width: 100px;
    font-size: 24px;
  }

  tbody td {
    font-size: 20px;
    margin-bottom: 5px;
    transition: 0.3s;
  }
}

.enable {
  color: #e67e22;
}

.disable {
  color: #95a5a6;
}

.tableButton {
  outline: none;
  background: transparent;
  border-radius: 20px;
  padding: 3px;
  cursor: pointer;
  width: 100px;
  border: 2px solid black;
  color: #e74c3c;
  font-size: 18px;
  transition: all 0.5s;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
}

#showDetail {
    margin: 20px auto;
}

img {
  border-radius: 15px;
  box-shadow: 1px 2px 4px #000, -1px -2px 4px #95a5a6;
}

.largepic {
  width: 360px;
  height: 360px;
}

.itemContent {
  display: flex;
}

.originPrice {
  text-decoration: line-through;
}
.itemContent {
    margin:20px auto;
}
.col-1, .col-2 {
  flex: 1;
  padding: 1% 3%;
}

.col-1 {
  display: flex;
  align-items: center;
  gap: 30px;

  li {
    list-style-type: none;
    margin-bottom: 8px;
  }
}

.smallpic {
  width: 170px;
  height: 170px;
}

.col-2 {
  display: flex;
  gap: 30px;
  flex-direction: column;

  h2 {
    letter-spacing: 3px;
    font-size: 30px;

    span {
      font-size: 20px;
      display: inline-block;
      background-color: #e9e9e9;
      margin-left: 20px;
      width: 80px;
      text-align: center;
      padding: 5px;
      border-radius: 15px;
    }
  }

  p {
    font-size: 22px;
  }
}
</style>
