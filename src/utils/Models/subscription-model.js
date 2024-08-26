import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
    name: {type: String},
    bulletpoints: {type: [String]},
    valid_till: {type: Number},
    price: {type: String}
})

const Subscription = mongoose.models.subscriptions || mongoose.model('subscriptions', SubscriptionSchema);
export default Subscription