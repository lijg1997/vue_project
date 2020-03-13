<template>
    <div class="contact">
        <van-contact-card
                :type="cardType"
                :name="contactInfo.name"
                :tel="contactInfo.tel"
                @click="showList=true"
        />
        <van-popup v-model="showList" position="bottom">
            <van-contact-list
                    :list="list"
                    v-model="currentContactId"
                    @add="onAdd"
                    @edit="onEdit"
                    @select="onSelect"/>
        </van-popup>
        <van-popup v-model="showEdit" position="bottom">
            <van-contact-edit
                    :contact-info="editingContact"
                    :is-edit="isEdit"
                    @save="onSave"
                    @delete="onDelete"
                    :tel-validator="validator"/>
        </van-popup>
    </div>
</template>

<script>
    const OK = 200;
    import {Popup, ContactCard, ContactList, ContactEdit} from 'vant';

    export default {
        name: 'App',
        data(){
            return {
                list:[],
                currentContactId:null,
                editingContact:{},
                showList:false,
                showEdit:false,
                isEdit:false
            }
        },
        computed:{
            cardType(){
                return this.currentContactId !== null ? 'edit' : 'add'
            },
            contactInfo(){
                const id = this.currentContactId;
                return id !== null ? this.list.find((item) => id === item.id) : {}
            }
        },
        methods:{
            onAdd(){
                this.isEdit = false;
                this.showEdit = true;
                this.editingContact ={}
            },
            onEdit(info){
                this.isEdit = true;
                this.showEdit = true;
                this.editingContact = info
            },
            onSelect(info){
                this.showList = false;
            },
            async onSave({name, tel, id}){
                this.showList = false;
                this.showEdit = false;
                let body = {};
                if(this.isEdit){
                    body = await this.axios.put('/contact/edit',{name, tel, id});
                }else{
                    body = await this.axios.post('/contact/new/json',{name, tel});
                }
                await this.getUserInfo();
                this.currentContactId = body.data.id
            },
            async onDelete({id}){
                this.showEdit = false;
                this.showList = false;
                this.isEdit = false;
                const body = await this.axios.delete(`/contact`,{params:{id}});
                if(body.code === OK) {
                    if(this.currentContactId === id) this.currentContactId = null
                    this.getUserInfo();
                }
            },
            validator(){
                return true
            },
            async getUserInfo(){
                const {code, data:list} = await this.axios.get('/contactList');
                if(code === OK) this.list = list;
            }
        },
        components: {
            [Popup.name]: Popup,
            [ContactCard.name]: ContactCard,
            [ContactList.name]: ContactList,
            [ContactEdit.name]: ContactEdit,
        },
        mounted() {
            this.getUserInfo()
        }
    }
</script>

<style scoped>

</style>
