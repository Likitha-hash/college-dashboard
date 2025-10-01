import path from 'path';
import fs from 'fs';

// Helper function to get the correct path to the JSON file
const getReviewsPath = () => {
    return path.resolve(process.cwd(), 'data', 'reviews.json');
};

export default function handler(req, res) {
    const filePath = getReviewsPath();

    if (req.method === 'GET') {
        try {
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const reviews = JSON.parse(jsonData);
            return res.status(200).json(reviews);
        } catch (error) {
            console.error("Error reading reviews file:", error);
            return res.status(500).json({ message: 'Failed to read review data.' });
        }
    }

    if (req.method === 'POST') {
        try {
            // Read the current reviews from the file
            const currentJsonData = fs.readFileSync(filePath, 'utf-8');
            const reviews = JSON.parse(currentJsonData);

            const { collegeId, collegeName, rating, comment } = req.body;

            if (!collegeId || !collegeName || !rating || !comment) {
                return res.status(400).json({ message: 'Missing required fields.' });
            }

            const newReview = {
                id: Date.now(),
                collegeId,
                collegeName,
                rating,
                comment,
                author: "Guest User",
                date: new Date().toISOString().split('T')[0]
            };

            // Add the new review to the beginning of the array
            reviews.unshift(newReview);

            // Convert the updated array back to a JSON string and write it to the file
            fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2)); // `null, 2` formats the JSON nicely

            return res.status(201).json(newReview);
        } catch (error) {
            console.error("Error writing to reviews file:", error);
            return res.status(500).json({ message: 'Failed to save review.' });
        }
    }

    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
}