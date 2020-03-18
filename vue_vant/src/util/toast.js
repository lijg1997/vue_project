import { Toast } from 'vant';
export default {
    loading(){
        Toast.loading({
            message: 'Loading...',
            forbidClick: true,
            duration:0
        });
    },
    success(){
        Toast.success({
            message:'success',
            duration:5000
        });
    },
    fail(){
        Toast.fail({
            message:'success',
            duration:1000
        });
    }
}