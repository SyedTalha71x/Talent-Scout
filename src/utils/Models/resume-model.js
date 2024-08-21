import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    resumeText: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Resume = mongoose.models.resume || mongoose.model('resume', ResumeSchema);

export default Resume;
