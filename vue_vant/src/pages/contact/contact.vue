<template>
    <div>
        <van-contact-card
                :type="typeCard"
                :name="contactInfo.name"
                :tel="contactInfo.tel"
                @click="showList=true"
        />
        <van-popup v-model="showList" position="bottom">
            <van-contact-list
                    v-model="currentContactId"
                    :list="list"
                    @add="onAdd"
                    @edit="onEdit"
                    @select="onSelect"/>
        </van-popup>
        <van-popup v-model="showEdit" position="bottom">
            <van-contact-edit
                    :contact-info="editingContact"
                    :is-edit="isEdit"
                    :tel-validator="validator"
                    @save="onSave"
                    @delete="onDelete"/>
        </van-popup>
    </div>
</template>

<script>
    const OK = 200;
    import {Popup, ContactCard, ContactList, ContactEdit} from 'vant'

    export default {
        name: "contact",
        data() {
            return {
                currentContactId:null,
                editingContact:{},
                showList:false,
                showEdit:false,
                isEdit:false,
                list:[]
            }
        },
        computed: {
            typeCard(){
                return this.currentContactId !== null ? 'edit' : 'add'
            },
            contactInfo(){
                const id = this.currentContactId;
                return id !== null ? this.list.filter((item) => item.id === id)[0] : {}
            },
        },
        methods: {
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
                if(this.isEdit)
                    body = await this.$http.contact.editContact({name, tel, id});
                else
                    body = await this.$http.contact.addContactByForm({name, tel});
                await this.getContactInfo();
                this.currentContactId = body.data.id
            },
            async onDelete({id}){
                this.showList = false;
                this.showEdit = false;
                this.isEdit = false;
                const body = await this.$http.contact.delContact({id});
                if(body.code === OK){
                    if(this.currentContactId === id) this.currentContactId = null;
                    this.getContactInfo();
                }
            },
            validator(){
                return true
            },
            async getContactInfo(){
                const body = await this.$http.contact.getContactList();
                console.log(body)
                if(body.code === OK) this.list = body.data
            }
        },
        mounted() {
            this.getContactInfo()
        },
        components: {
            [Popup.name]:Popup,
            [ContactCard.name]:ContactCard,
            [ContactList.name]:ContactList,
            [ContactEdit.name]:ContactEdit
        },
    }
</script>

<style scoped>

</style>