<template>
  <form>
    <div class="insideBox">
      <h1>Henry's Handmade</h1>
      <div class="input">
        <h2>帳號</h2>
        <input class="inputBox" type="email" v-model="username" autofocus />
      </div>
      <div class="input">
        <h2>密碼</h2>
        <input class="inputBox" type="password" v-model="password" /> <br />
      </div>
      <div>
        <button type="button" class="button" @click="login">登入</button>
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.insideBox {
  width: 400px;
  height: 420px;
  box-shadow: 1px 2px 4px #000, -1px -2px 4px #95a5a6;
  border-radius: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 30%);

  h1 {
    font-size: 40px;
    margin: 30px 0;
    text-shadow: 1px 2px 3px rgb(146, 146, 146);
    text-align: center;
  }
}

.input {
  margin: 30px 0;
  padding: 0 0 0 60px;
}

.inputBox {
  width: 80%;
  padding: 5px;
  font-size: 20px;
  outline: none;
  border: none;
  border-bottom: 3px solid rgb(201, 201, 201);
  background: transparent;
  transition: all 0.5s;

  &:focus {
    border-bottom: 2px solid #30336b;
  }
}

.button {
  display: inline-block;
  outline: none;
  background: transparent;
  border: 2px solid #30336b;
  padding: 10px;
  margin: 20px 0 0 150px;
  border-radius: 20px;
  width: 100px;
  font-size: 18px;
  transition: all 0.5s;
  opacity: 0.6;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.1);
    color: #30336b;
  }
}
</style>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const url = `${process.env.VUE_APP_URL}`
      const username = this.username
      const password = this.password

      const user = {
        username,
        password
      }
      if (this.username || this.password) {
        this.$http
          .post(`${url}/admin/signin`, user)
          .then((res) => {
            const { token, expired } = res.data
            document.cookie = `hexSchool=${token}; expires=${new Date(expired)}`
            this.$router.push('/admin/products')
          })
          .catch((err) => {
            console.dir(err)
            this.username = ''
            this.password = ''
            alert('帳號或密碼錯誤，請重新輸入!!')
          })
      } else {
        alert('請輸入帳號和密碼')
      }
    }
  }
}
</script>
