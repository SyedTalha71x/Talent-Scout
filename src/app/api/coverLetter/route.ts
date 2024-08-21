// app/api/coverLetter/route.ts
import formidable, { IncomingForm } from 'formidable';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { promises as fs } from 'fs';
import connectToDB from '@/utils/db/route';
import Resume from '@/utils/Models/resume-model';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET_KEY!,
});

// Function to parse the resume file (assuming plain text for this example)
async function parseResume(filePath: string): Promise<string> {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
}

// Function to extract job title using OpenAI
async function extractJobTitle(resumeText: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant designed to extract job titles from resumes.' },
                { role: 'user', content: resumeText }
            ]
        });

        const jobTitle = response.choices[0]?.message?.content?.trim() || 'Unknown Job Title';
        return jobTitle;
    } catch (error) {
        console.error('Error extracting job title:', error);
        return 'Unknown Job Title'; // Return a default value in case of error
    }
}

// Function to generate cover letter using OpenAI
async function generateCoverLetter(resumeText: string, jobTitle: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are an assistant skilled in creating professional cover letters.' },
                { role: 'user', content: `Here is my resume: ${resumeText}. Please generate a cover letter for the job title: ${jobTitle}.` },
            ],
        });

        if (
            response &&
            response.choices &&
            response.choices[0] &&
            response.choices[0].message &&
            response.choices[0].message.content
        ) {
            return response.choices[0].message.content.trim();
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Error generating cover letter:', error);
        throw error;
    }
}

// POST handler
export const POST = async (req: NextRequest) => {
    await connectToDB(); // Connect to MongoDB

    // Create a Formidable instance for handling file uploads
    const form = new IncomingForm();

    return new Promise<NextResponse>((resolve) => {
        form.parse(req as any, async (err, fields, files) => {
            if (err) {
                return resolve(NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 }));
            }

            if (!files.resume || Array.isArray(files.resume)) {
                return resolve(NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 }));
            }

            try {
                const resumeFilePath = (files.resume as formidable.File).filepath;
                const resumeText = await parseResume(resumeFilePath);
                const jobTitle = await extractJobTitle(resumeText);
                const coverLetter = await generateCoverLetter(resumeText, jobTitle);

                // Save the resume text and cover letter to MongoDB
                const savedResume = new Resume({
                    resumeText,
                    coverLetter,
                });
                await savedResume.save();

                return resolve(NextResponse.json({ coverLetter }, { status: 200 }));
            } catch (error: any) {
                console.error('Error processing request:', error);
                return resolve(NextResponse.json({ error: error.message }, { status: 500 }));
            }
        });
    });
};
