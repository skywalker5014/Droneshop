import Razorpay from 'razorpay';

const instance = new Razorpay({
    key_id: 'your_id',
    key_secret: 'your_secret'
});

export default instance;
