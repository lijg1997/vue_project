import { Toast } from 'vant';
export default {
    loading(){
        Toast.loading({
            message: 'Loading...',
            forbidClick: true,
            duration:0
        });
    },
    success(val='success'){
        Toast.success({
            message:val,
            duration:1000
        });
    },
    fail(err='fail'){
        Toast.fail({
            message:err,
            duration:1000
        });
    }
}