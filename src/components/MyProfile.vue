<template>
  <div id="myProfile">
    <mu-container class="profilePaper">
      <mu-row>
        <mu-appbar class="profileAppBar">
          <mu-icon value="contacts" slot="left"></mu-icon>
          我的个人资料
        </mu-appbar>
      </mu-row>
      <mu-row>
        <mu-col span="12">
          <mu-card class="ProfileCard" raised>
            <mu-card-header>
              <mu-avatar slot="avatar">
                <mu-icon value="person"></mu-icon>
              </mu-avatar>
              <span style="font-size: 25px">用户Id：{{userInfo.userId}}</span>
            </mu-card-header>
            <mu-form :model="userInfo">
              <mu-card-text>
                <mu-form-item label="用户名" prop="userName">
                  <mu-text-field v-model="userInfo.userName" prop="userName"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="身份证号码" prop="idCard">
                  <mu-text-field v-model="userInfo.idCard" prop="idCard"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="手机号" prop="phone">
                  <mu-text-field v-model="userInfo.phone" prop="phone"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="电子邮箱" prop="email">
                  <mu-text-field v-model="userInfo.email" prop="email"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="地址" prop="address">
                  <mu-text-field v-model="userInfo.address" prop="address"></mu-text-field>
                </mu-form-item>
                <mu-form-item>
                  <mu-list-item-title>加入时间： {{ userInfo.createTime | formatDate }}</mu-list-item-title>
                </mu-form-item>
                <!--                <mu-list>-->
                <!--                  <mu-list-item>-->
                <!--                    <mu-list-item-action>-->
                <!--                      <mu-icon value="person_pin"></mu-icon>-->
                <!--                    </mu-list-item-action>-->
                <!--                    <mu-list-item-title>姓名： {{ userInfo.realName }}</mu-list-item-title>-->
                <!--                  </mu-list-item>-->
                <!--                  <mu-list-item>-->
                <!--                    <mu-list-item-action>-->
                <!--                      <mu-icon value="fingerprint"></mu-icon>-->
                <!--                    </mu-list-item-action>-->
                <!--                    <mu-list-item-title>身份证号码： {{ userInfo.idCard }}</mu-list-item-title>-->
                <!--                  </mu-list-item>-->
                <!--                  <mu-list-item>-->
                <!--                    <mu-list-item-action>-->
                <!--                      <mu-icon value="phone"></mu-icon>-->
                <!--                    </mu-list-item-action>-->
                <!--                    <mu-list-item-title>手机号： {{ userInfo.phone }}</mu-list-item-title>-->
                <!--                  </mu-list-item>-->
                <!--                  <mu-list-item>-->
                <!--                    <mu-list-item-action>-->
                <!--                      <mu-icon value="email"></mu-icon>-->
                <!--                    </mu-list-item-action>-->
                <!--                    <mu-list-item-title>电子邮箱：{{ userInfo.email }}</mu-list-item-title>-->
                <!--                  </mu-list-item>-->
                <!--                  <mu-list-item>-->
                <!--                    <mu-list-item-action>-->
                <!--                      <mu-icon value="location_on"></mu-icon>-->
                <!--                    </mu-list-item-action>-->
                <!--                    <mu-list-item-title>地址： {{ userInfo.address }}</mu-list-item-title>-->
                <!--                  </mu-list-item>-->
                <!--                  <mu-list-item>-->
                <!--                    <mu-list-item-action>-->
                <!--                      <mu-icon value="today"></mu-icon>-->
                <!--                    </mu-list-item-action>-->
                <!--                    <mu-list-item-title>加入时间： {{ userInfo.createTime | formatDate }}</mu-list-item-title>-->
                <!--                  </mu-list-item>-->
                <!--                </mu-list>-->
              </mu-card-text>
              <mu-card-actions>
                <mu-form-item>
                  <mu-button color="success" @click="updateAccount">修改</mu-button>
                  <mu-button color="info" @click="navigateTo('/')">返回</mu-button>
                </mu-form-item>
              </mu-card-actions>
            </mu-form>
          </mu-card>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  // import {getUserInfo} from "@/api/user"
  import {getAccountInfo, updateAccount} from "@/api/account"
  import Toast from "muse-ui-toast";

  export default {
    name: "MyProfile",
    data() {
      return {
        //username: Cookies.get("username"),
        userInfo: {
          userId: 0,
          userName: "username",
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
          this.userInfo.userType = info.accountId != null ? 0 : 1
          this.userInfo.userName = info.accountName != null ? info.accountName : info.userName
          this.userInfo.createTime = info.createTime
          this.userInfo.phone = info.phone != null ? info.phone : info.phonenumber
          this.userInfo.idCard = info.idCard
          this.userInfo.email = info.email
          this.userInfo.address = info.address
          this.userInfo.realName = info.realName
          // this.userInfo = res.data
        }).catch(err => {
          this.$toast.error(err)
        })
      },
      navigateTo(val) {
        this.$router.push(val);
      },
      updateAccount() {
        // for (var item in this.userInfo) {
        //   if (this.form[item] == null) {
        //     this.$toast.warning("所填信息不能有空！")
        //     return
        //   }
        // }
        console.log("------")
        updateAccount(this.userInfo).then(res => {
          const re = res;
          if (re.code === 200) {
            this.$toast.success(re.message)
            Toast.success("修改成功");
            this.$router.push('/myProfile')
            this.fetchData()
          } else {
            Toast.error("修改失败");
            this.$toast.success(re.message)
          }
        }).catch(err => {
          this.$toast.error(err.toString())
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
    background-color: #11a8db;
  }

  .profilePaper {
    padding: 10px;
  }

  .ProfileCard {
    width: 100%;
    margin: 0 auto;
  }
</style>
