import mongoose from 'mongoose';

const UserSubscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  expiry_date: { type: Date, required: true },
  payment_id: { type: String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserSubscription = mongoose.models.usersubscription || mongoose.model('usersubscription', UserSubscriptionSchema);
export default UserSubscription;
