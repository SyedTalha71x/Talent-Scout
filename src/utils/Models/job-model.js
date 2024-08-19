import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    briefDescription: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: false,
    },
    jobType: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    experience: {
        type: Number
    },
    skills: {
        type: [String], // Array of strings to list skills required for the job
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    applicationDeadline: {
        type: Date,
        required: false,
    },
    isRemote: {
        type: String,
    },
    status: {
        type: String,
        default: 'Active',
    },
    industry: {
        type: String
    },
    jobCategory: {
        type: String
    },
    image: {
        type: String
    }
});

const Job = mongoose.models.jobs || mongoose.model('jobs', jobSchema);
export default Job;
