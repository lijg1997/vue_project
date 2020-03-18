import { Toast } from 'vant';
export default{
    loading(){
        Toast.loading({
            message: 'Loading...',
            forbidClick: true,
            duration:0
        });
    },
    success(val){
        Toast.success({
            message: val,
            duration:3000
        });
    },
    fail(err){
        Toast.fail({
            message: err,
            duration:3000
        });
    }
}