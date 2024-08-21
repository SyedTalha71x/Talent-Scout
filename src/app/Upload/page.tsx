// app/upload/page.tsx
"use client";
import { useState } from 'react';

const UploadPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [coverLetter, setCoverLetter] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            setError('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('/api/coverLetter', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to generate cover letter.');
                return;
            }

            const data = await response.json();
            setCoverLetter(data.coverLetter);
            setError(null);
        } catch (error) {
            setError('An error occurred while uploading the file.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Upload Your Resume</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".txt,.pdf" onChange={handleFileChange} />
                <button type="submit">Upload and Generate Cover Letter</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {coverLetter && (
                <div>
                    <h2>Generated Cover Letter</h2>
                    <p>{coverLetter}</p>
                </div>
            )}
        </div>
    );
};

export default UploadPage;
