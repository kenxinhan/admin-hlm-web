<template>
    <div class="login">
        <div class="login_bg"></div>
        <div class="login_con">
            <img src="../assets/img/logo.jpg" class="logo">
            <h1 class="title">扬恩科技后台管理系统</h1>
            <el-form :model="form" status-icon :rules="rules" ref="form">
                <dl class="input">
                    <dt>
                        <i class="icons icons_userInfo"></i>
                    </dt>
                    <dd>
                        <el-form-item prop="username">
                            <el-input type="text" v-model="form.username" auto-complete="off" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </dd>
                </dl>
                <dl class="input">
                    <dt>
                        <i class="icons icons_lock"></i>
                    </dt>
                    <dd>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
                        </el-form-item>
                    </dd>
                </dl>
                <dl class="input">
                    <dd>
                        <el-button type="success" class="submit" @click="submit" :disabled="btnDisabled">登录</el-button>
                    </dd>
                </dl>
            </el-form>
        </div>
    </div>
</template>

<script>

import SHA256 from "../tools/sha256"
import asios from "axios"
import stores from '@/store/store'

export default {
    data() {

        let validateUserName = function(rules, value, cb) {
            if (value == '') {
                cb(new Error('用户名不能为空'))
            } else {
                cb()
            }
        }

        let validatePassword = function(rules, value, cb) {
            if (value == '') {
                cb(new Error('密码不能为空'))
            } else {
                cb()
            }
        }

        return {
            form: {
                username: '',
                password: '',
            },
            btnDisabled: false,
            rules: {
                username: [
                    { validator: validateUserName, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
      asios.get('/static/data/menus.json').then(val => {
          this.setMenuInfo(val.data)
      })

    },
    methods: {
        submit() {
          asios.get('/static/data/menus.json').then(val => {
              this.setMenuInfo(val.data)
          })
          this.$router.push({ path: '/' })
            // this.$refs['form'].validate((valid) => {
            //     if (valid) {
            //         this.btnDisabled = true;
            //         let params = {
            //             "username": this.form.username,
            //             "password": SHA256(this.form.password),
            //         }
            //         this.$api.post('/login', params, res => {
            //             if (!res.result) {
            //                 this.btnDisabled = false;
            //                 return
            //             }
            //             this.$message({
            //                 message: '登录成功',
            //                 type: 'success',
            //                 duration: 500,
            //             });
            //             //设置用户信息
            //             // this.setUserInfo(res.data.result)
            //             window.sessionStorage.setItem('userInfo', JSON.stringify(res.result))
            //             stores.dispatch('updateUserInfo', res.result)
            //             //设置菜单
            //             asios.get('/static/data/menus.json').then(val => {
            //                 this.setMenuInfo(val.data)
            //             })
            //
            //             //跳转
            //             this.$router.push({ path: '/' })
            //         })
            //     }
            // })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/css/base';
.register_con {
    display: none;
}

.login {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #f9f9f9;
}

.login_bg,
.login_con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.login_bg {
    background: url(../assets/img/login_bg.jpg) @green repeat-x left bottom;
    width: 100%;
    height: 220px;
}

.login_con {
    width: 350px;
    height: 410px;
    border-top: 10px @green solid;
    background: #fff;
    box-sizing: border-box;
    padding: 22px 25px 0 25px;
}

.logo {
    display: block;
    width: 60px;
    height: 66px;
    margin: 0 auto;
}

.title {
    font-size: 24px;
    line-height: 50px;
    color: @green;
    text-align: center;
    margin-bottom: 12px;
}

.input {
    margin-bottom: 20px;
    height: 50px;
    position: relative;
}

.input input {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    padding-left: 49px;
    color: #ccc;
    border-radius: 3px;
    border: 1px #dadada solid;
    line-height: 30px;
}

.input dt {
    width: 50px;
    height: 100%;
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
}

.input dt .icons {
    margin: auto;
}

.input .submit {
    background: #1abc9c;
    color: #fff;
    text-align: center;
    font-size: 17px;
    width: 100%;
    border: none;
}
</style>
