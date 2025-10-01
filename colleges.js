import path from 'path';
import fs from 'fs';

// Helper function to get the correct path to the JSON file
function getDataPath() {
    // Vercel's serverless environment has a specific path structure
    return path.resolve(process.cwd(), 'data', 'colleges.json');
}

export default function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const filePath = getDataPath();
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            let colleges = JSON.parse(jsonData);

            // Filtering, searching, and sorting logic
            const { location, course, minFee, maxFee, search, sort } = req.query;

            let result = colleges;

            if (location) {
                result = result.filter(c => c.location.toLowerCase() === location.toLowerCase());
            }
            if (course) {
                result = result.filter(c => c.course.toLowerCase() === course.toLowerCase());
            }
            if (minFee) {
                result = result.filter(c => c.fee >= parseInt(minFee, 10));
            }
            if (maxFee) {
                result = result.filter(c => c.fee <= parseInt(maxFee, 10));
            }
            if (search) {
                result = result.filter(c =>
                    c.name.toLowerCase().includes(search.toLowerCase())
                );
            }
            if (sort === 'asc') {
                result.sort((a, b) => a.fee - b.fee);
            }
            if (sort === 'desc') {
                result.sort((a, b) => b.fee - a.fee);
            }

            return res.status(200).json(result);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error reading college data.' });
        }
    }

    // Handle other methods
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
}