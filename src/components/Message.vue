<template>
  <div id="message">
    <mu-container class="container">
      <mu-row>
        <mu-appbar class="appBar">
          <mu-icon value="inbox" slot="left"></mu-icon>
          <span>留言</span>
        </mu-appbar>
      </mu-row>
      <mu-card raised>
        <mu-card-text>
          <mu-form :model="form" class="mu-demo-form">
            <mu-form-item  prop="content" label="留言" :rules="contentRules">
              <mu-text-field v-model="form.content" placeholder="不允许超过100个字符" multi-line :max-length="100"></mu-text-field><br/>
            </mu-form-item>
          </mu-form>
        </mu-card-text>
        <mu-card-actions>
          <mu-button style="width: 99%;background-color: #11a8db;color: white " @click="submitMessage">发布</mu-button>
        </mu-card-actions>
        <mu-card-text>
          <mu-list textline="three-line">
            <mu-list-item v-for="(item,i) in messageList" :key="item.messageId" avatar :ripple="false" button>
              <mu-list-item-action>
                <mu-avatar>
                  <!--                  <img src="../../assets/images/avatar1.jpg">-->
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{item.nickname}}</mu-list-item-title>
                <mu-list-item-after-text>{{item.createTime}}</mu-list-item-after-text>
                <mu-list-item-sub-title>
                  {{item.content}}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-card-text>
      </mu-card>
    </mu-container>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {addMessage, infoMessage} from "@/api/message";

  export default {
    name: "Message",
    data() {
      return {
        contentRules: [
          {validate: (val) => !!val, message: '留言内容不能为空'},
        ],
        form: {
          userId: 0,
          nickname: '',
          hotelId: 0,
          content: ''
        },
        messageList: [
          {
            messageId: null,
          }
        ]
      }
    },
    props: {
      hotelInfo: {
        type: Object,
        required: true
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      hotelInfo(newValue, oldValue) {
        this.fetchData()
      }
    },
    methods: {
      fetchData() {
        infoMessage(Cookies.get("hotelId")).then(res => {
          console.log(res)
          this.messageList = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      goBack() {
        this.$router.back()
      },
      submitMessage() {
        for (var item in this.form) {
          if (this.form[item] == null) {
            this.$toast.warning("所填信息不能有空！")
            return
          }
        }
        this.form.userId = Cookies.get("user_id")
        this.form.nickname = Cookies.get("username")
        this.form.hotelId = Cookies.get("hotelId")
        addMessage(this.form).then(res => {
          const re = res;
          if (re.code === 200) {
            this.$toast.success(re.message)
            this.$router.push('/message')
            this.fetchData()
          } else {
            this.$toast.success(re.message)
          }
        }).catch(err => {
          this.$toast.error(err.toString())
        })

      }
    }
  }
</script>

<style scoped>
  .appBar {
    height: 40px;
    border-radius: 15px;
    margin: 10px;
    color: #fff;
    padding: 10px;
    background-color: #11a8db;
  }

  .container {
    padding: 10px;
  }

  .mu-demo-form {
    width: 100%;
    /*max-width: 460px;*/
  }
</style>
