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
        name: "App",
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
                const id = this.currentContactId
                return id !== null ? this.list.find((item) => id === item.id) : {}
            },
        },
        methods: {
            onAdd(){
                this.editingContact = {id:this.list.length + 1};
                this.isEdit = false;
                this.showEdit = true
            },
            onEdit(info){
                this.isEdit = true;
                this.showEdit = true;
                this.editingContact = info
            },
            onSelect(){
                this.showList = false
            },
            async onSave(info){
                this.showList = false;
                this.showEdit = false;
                console.log(this.isEdit)
                if(this.isEdit){
                    // this.list = this.list.map((item)=> item.id === info.id ? info : item )
                    const body = await this.axios.put('/contact/edit',{name: info.name,tel: info.tel,id: info.id})
                    console.log(body)
                }else {
                    // this.list.push(info);
                    const body = await this.axios.post('/contact/new/form',{name: info.name,tel: info.tel})
                    console.log(body)
                }
                this.currentContactId = info.id
                console.log('----')
            },
            async onDelete(info){
                // this.list = this.list.filter((item) => item.id !== info.id)
                const body = await this.axios.delete(`/contact/${info.id}`);
                console.log(body)
                this.showList = false;
                this.showEdit = false
            },
            validator(){
                return true
            }
        },
        components: {
            [Popup.name]:Popup,
            [ContactCard.name]:ContactCard,
            [ContactList.name]:ContactList,
            [ContactEdit.name]:ContactEdit
        },
        async mounted() {
            const {code, data:list} = await this.axios.get('/contactList')
            if(code === OK) this.list = list
        }
    }
</script>

<style scoped>

</style>