
import { Toast } from 'vant';

export default {
    loading(){Toast.loading({
        message: 'loading...',
        forbidClick: true
    })},
    success(val='success'){Toast.success(val)},
    fail(err='fail'){Toast.fail(err)}
}