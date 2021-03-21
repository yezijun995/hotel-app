<template>
  <div id="myProfile">
    <mu-container class="profilePaper">
      <mu-row>
        <mu-appbar class="profileAppBar" color="primary">
          <mu-icon value="contacts" slot="left"></mu-icon>
          我的个人资料
        </mu-appbar>
      </mu-row>
      <mu-row>
        <mu-col span="12">
          <mu-card class="ProfileCard" raised>
            <mu-card-header :title="'用户名： ' + userInfo.username" :sub-title="'用户ID号:  ' + userInfo.userId">
              <mu-avatar slot="avatar">
                <mu-icon value="person"></mu-icon>
              </mu-avatar>
            </mu-card-header>
            <mu-card-text>
              <mu-list>
                <mu-list-item>
                  <mu-list-item-action>
                    <mu-icon value="person_pin"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>姓名： {{ userInfo.realName }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item>
                  <mu-list-item-action>
                    <mu-icon value="fingerprint"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>身份证号码： {{ userInfo.idCard }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item>
                  <mu-list-item-action>
                    <mu-icon value="phone"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>手机号： {{ userInfo.phone }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item>
                  <mu-list-item-action>
                    <mu-icon value="email"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>电子邮箱：{{ userInfo.email }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item>
                  <mu-list-item-action>
                    <mu-icon value="location_on"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>地址： {{ userInfo.address }}</mu-list-item-title>
                </mu-list-item>
                <mu-list-item>
                  <mu-list-item-action>
                    <mu-icon value="today"></mu-icon>
                  </mu-list-item-action>
                  <mu-list-item-title>加入时间： {{ userInfo.createTime | formatDate }}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-card-text>
            <mu-card-actions>
              <!--<mu-button flat>Action 1</mu-button>-->
              <!--<mu-button flat>Action 2</mu-button>-->
            </mu-card-actions>
          </mu-card>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  // import {getUserInfo} from "@/api/user"
  import {getAccountInfo} from "@/api/account"

  export default {
    name: "MyProfile",
    data() {
      return {
        //username: Cookies.get("username"),
        userInfo: {
          userId: 0,
          username: "username",
          createTime: null,
          idCard: null,
          realName: "admin",
          address: ""
        },
      }
    },
    created: function () {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const username = Cookies.get("username")
        getAccountInfo(username).then(res => {
          const info = res.data
          this.userInfo.userId = info.accountId != null ? info.accountId : info.userId
          this.userInfo.username = info.accountName != null ? info.accountName : info.userName
          this.userInfo.createTime = info.createTime
          this.userInfo.phone = info.phone != null ? info.phone: info.phonenumber
          this.userInfo.idCard = info.idCard
          this.userInfo.email = info.email
          this.userInfo.address = info.address
          this.userInfo.realName = info.realName
          // this.userInfo = res.data
        }).catch(err => {
          this.$toast.error(err)
        })
      }
    },
  }
</script>

<style scoped>
  .profileAppBar {
    height: 40px;
    width: auto !important;
    border-radius: 35px;
    margin: 10px;
    color: #fff;
    padding: 10px;
  }

  .profilePaper {
    padding: 10px;
  }

  .ProfileCard {
    width: 100%;
    margin: 0 auto;
  }
</style>
