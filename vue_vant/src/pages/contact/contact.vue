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
                if(this.isEdit){
                    // this.list = this.list.map((item)=> item.id === info.id ? info : item )
                    body = await this.axios.put('/contact/edit',{name, tel, id});
                }else {
                    // this.list.push(info);
                    body = await this.axios.post('/contact/new/json',{name, tel});
                }
                await this.getContactInfo();
                this.currentContactId = body.data.id
            },
            async onDelete(info){
                this.showList = false;
                this.showEdit = false;
                this.isEdit = false;
                // this.list = this.list.filter((item) => item.id !== info.id)
                const body = await this.axios.delete(`/contact?id=${info.id}`);
                if(body.code === OK){
                    if(this.currentContactId === info.id) this.currentContactId = null
                    this.getContactInfo();
                }
            },
            validator(){
                return true
            },
            async getContactInfo(){
                const {code, data:list} = await this.axios.get('/contactList');
                if(code === OK) this.list = list
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