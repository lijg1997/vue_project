export default {
    api:{
        getContactList:{
            url:'/contactList',
            method:'get',
            hooks:{
                beforeReq(){
                    console.log('组件级别请求之前')
                },
                afterReq(){
                    console.log('组件级别请求之后')
                }
            }
        },
        addContactByForm:{
            url:'/contact/new/form',
            method:'post',
            isForm:true
        },
        addContactByJson:{
            url:'/contact/new/json',
            method:'post',
        },
        editContact:{
            url:'/contact/edit',
            method:'put'
        },
        delContact:{
            url:'/contact',
            method:'delete'
        }
    },
    hooks:{
        beforeReq(){
            console.log('模块级别请求之前')
        },
        afterReq(){
            console.log('模块级别请求之后')
        }
    }
}