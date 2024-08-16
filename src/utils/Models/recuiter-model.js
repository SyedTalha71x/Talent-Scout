import mongoose from 'mongoose'

const RecuiterSchema = new mongoose.Schema({
    name: { type: String },
    location: { type: String },
    activation: { type: Number },
    image: { type: String }
})

const recuiter = mongoose.models.recuiter || mongoose.model('recuiter', RecuiterSchema);
export default recuiter;