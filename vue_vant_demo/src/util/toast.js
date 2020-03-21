import { Toast } from 'vant';
export default{
    loading(){
        Toast.loading({
            message: 'Loading...',
            forbidClick: true
        });
    },
    success(val = 'success'){
        Toast.success({
            message: val,
            duration:3000
        });
    },
    fail(err = 'fail'){
        Toast.fail({
            message: err,
            duration:3000
        });
    }
}