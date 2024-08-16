import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    Company: { type: String, required: true },
    Location: { type: String, required: true },
    Type: { type: String, required: true },
    Role: { type: String, required: true },
    Description: { type: String, required: true },
    Skills: { type: [String], required: true },
    Salary: { type: Number, required: true },
    SalaryType: { type: String, required: true },
    Image: { type: String, required: false },
    JobCategory: { type: String, required: false },
    JobArrival: { type: String, required: false },
    CreatedAt: { type: Date, default: Date.now }
});

const Job = mongoose.models.jobs || mongoose.model('jobs', JobSchema);

export default Job;
