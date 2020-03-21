<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:loginWay === `message`}"  @click="loginWay = `message`">短信登录</a>
                    <a href="javascript:;" :class="{on:loginWay === `password`}" @click="loginWay = `password`">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form>
                    <div :class="{on:loginWay === `message`}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号"
                                   v-model.trim="phone" name="phone" v-validate="'required|mobile'">
                            <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                            <button :disabled="!phoneNumberIsRight || times > 0" class="get_verification"
                                :class="{highLight:phoneNumberIsRight}" @click.prevent="getCode">
                                {{times > 0 ? `${times} s` : `获取验证码`}}
                            </button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="6" placeholder="验证码"
                                   v-model.trim="code" name="code" v-validate="{required:true, regex:/^\d{6}$/}">
                            <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on:loginWay === `password`}">
                        <section>
                            <section class="login_message">
                                <input type="tel" placeholder="手机/邮箱/用户名"
                                       v-model.trim="name" name="name" v-validate="'required'">
                                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                            </section>
                            <section class="login_verification">
                                <input :type="isRight ? 'text' : 'password'" maxlength="16" placeholder="密码"
                                       v-model.trim="pwd" name="pwd" v-validate="'required'">
                                <div class="switch_button off" :class="{on:isRight}" @click="isRight = !isRight">
                                    <div class="switch_circle" :class="{right:isRight}"></div>
                                    <span class="switch_text">abc</span>
                                </div>
                                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="4" placeholder="验证码"
                                       v-model.trim="captcha" name="captcha" v-validate="{required:true, regex:/^[a-z0-9]+$/i}">
                                <img class="get_verification" :src="imgCaptcha" alt="captcha" ref="captchaImg" @click="changeCaptcha">
                                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                            </section>
                        </section>
                    </div>
                    <button @click.prevent="login" class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {USERLOGIN} from '../../store/mutation_types'
    export default {
        name:'login',
        data(){
            return {
                loginWay:'message',
                phoneReg:/^1\d{10}/igm,
                isRight:false,
                imgCaptcha:'http://localhost:4000/captcha' + '?' + new Date().getTime(),
                times:0,
                phone:'',
                code:'',
                name:'',
                pwd:'',
                captcha:''
            }
        },
        computed:{
            phoneNumberIsRight(){
                return this.phoneReg.test(this.phone)
            }
        },
        methods:{
            ...mapActions([USERLOGIN]),
            changeCaptcha(){
                this.$refs.captchaImg.src = this.imgCaptcha
            },
            async getCode(){
                await this.$http.login.getCode({phone:this.phone});
                clearInterval(this.timeId);
                this.times = 30;
                this.timeId = setInterval(()=>{
                    if(this.times > 0) this.times--;
                    else clearInterval(this.timeId)
                },1000)
            },
            async login(){
                if(this.loginWay === 'message'){
                    const messageFlag = await this.$validator.validateAll(['phone','code']);
                    if(messageFlag) this[USERLOGIN]({loginWay:this.loginWay, phone:this.phone, code:this.code});
                }else if(this.loginWay === 'password'){
                    const passwordFlag = await this.$validator.validateAll(['name','pwd','captcha']);
                    if(passwordFlag) this[USERLOGIN]({loginWay:this.loginWay, name:this.name, pwd:this.pwd, captcha:this.captcha, changeCaptcha:this.changeCaptcha})
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #02a774
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.highLight
                                    color green
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s,border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                &.on
                                    background #02a774
                                    .switch_text
                                        float left
                                        color #ddd
                                >.switch_circle
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(27px)
                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color #02a774
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999
</style>