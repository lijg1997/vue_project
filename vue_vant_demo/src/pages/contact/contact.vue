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
                    :tel-validator="setValidator"
                    @save="onSave"
                    @delete="onDelete"/>
        </van-popup>
    </div>
</template>

<script>
    import { Popup, ContactCard, ContactList, ContactEdit } from 'vant';
    const OK = 200;
    export default {
        name: 'contact',
        data(){
            return {
                list:[],
                currentContactId:null,
                editingContact:{},
                isEdit:false,
                showList:false,
                showEdit:false
            }
        },
        computed:{
            cardType(){
                return this.currentContactId !== null ? 'edit' : 'add'
            },
            contactInfo(){
                const id = this.currentContactId;
                return id !== null ? this.list.find((item) => item.id === id) : {}
            }
        },
        methods:{
            onAdd(){
                this.editingContact = {};
                this.showEdit = true;
                this.isEdit = false
            },
            onEdit(info){
                this.showEdit = true;
                this.isEdit = true;
                this.editingContact = info
            },
            onSelect(){
                this.showList = false
            },
            async onSave({name, tel, id}){
                this.showList = false;
                this.showEdit = false;
                let body = {};
                if(this.isEdit){
                    body = await this.$http.contact.editContact({name, tel, id})
                }else{
                    body = await this.$http.contact.addContactByForm({name, tel});
                }
                await this.getList();
                this.currentContactId = body.data.id
            },
            async onDelete({id}){
                this.showEdit = false;
                this.showList = false;
                this.isEdit = false;
                const body = await this.$http.contact.delContact({id});
                if(body.code === OK){
                    if(this.currentContactId === id) this.currentContactId = null;
                    this.getList()
                }
            },
            setValidator(){
                return true
            },
            async getList(){
                const body = await this.$http.contact.getContactList();
                if(body.code === OK) this.list = body.data
            }
        },
        components: {
            [Popup.name]:Popup,
            [ContactCard.name]:ContactCard,
            [ContactList.name]:ContactList,
            [ContactEdit.name]:ContactEdit
        },
        mounted(){
            this.getList()
        }
    }
</script>

<style scoped>

</style>
