import path from 'path';
import fs from 'fs';

// Helper functions to get file paths
const getFavoritesPath = () => path.resolve(process.cwd(), 'data', 'favorites.json');
const getCollegesPath = () => path.resolve(process.cwd(), 'data', 'colleges.json');

export default function handler(req, res) {
    const favPath = getFavoritesPath();
    const collegesPath = getCollegesPath();

    try {
        // Read current data on every request
        const favoriteIds = JSON.parse(fs.readFileSync(favPath, 'utf-8'));
        const allColleges = JSON.parse(fs.readFileSync(collegesPath, 'utf-8'));

        if (req.method === 'GET') {
            const favoriteColleges = allColleges.filter(college => favoriteIds.includes(college.id));
            return res.status(200).json(favoriteColleges);
        }

        if (req.method === 'POST') {
            const { collegeId } = req.body;
            if (!collegeId) {
                return res.status(400).json({ message: 'collegeId is required.' });
            }
            if (!favoriteIds.includes(collegeId)) {
                const updatedFavs = [...favoriteIds, collegeId];
                fs.writeFileSync(favPath, JSON.stringify(updatedFavs, null, 2));
            }
            return res.status(200).json({ message: 'Added to favorites.' });
        }

        if (req.method === 'DELETE') {
            const { collegeId } = req.body;
            if (!collegeId) {
                return res.status(400).json({ message: 'collegeId is required.' });
            }
            const updatedFavs = favoriteIds.filter(id => id !== collegeId);
            fs.writeFileSync(favPath, JSON.stringify(updatedFavs, null, 2));
            return res.status(200).json({ message: 'Removed from favorites.' });
        }

        return res.status(405).json({ message: `Method ${req.method} not allowed.` });

    } catch (error) {
        console.error("Error processing favorites:", error);
        return res.status(500).json({ message: 'Failed to process favorites data.' });
    }
}