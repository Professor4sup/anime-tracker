const axios = require('axios');

const AnimeService = {
    getAnimeData: async (animeName) => {
        try {
            // Hier wird die Logik zur Abfrage der Anime-Datenbank implementiert
            const response = await axios.get(`https://api.example.com/anime/${animeName}`);
            return response.data;
        } catch (error) {
            console.error('Fehler beim Abrufen der Anime-Daten:', error);
            throw new Error('Daten konnten nicht abgerufen werden.');
        }
    }
};

module.exports = AnimeService;
