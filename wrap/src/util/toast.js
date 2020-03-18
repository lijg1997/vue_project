
import { Toast } from 'vant';

export default {
    loading(){Toast.loading({
        message: 'loading...',
        forbidClick: true
    })},
    success(val){Toast.success(val)},
    fail(err){Toast.fail(err)}
}