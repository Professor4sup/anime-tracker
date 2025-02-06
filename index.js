const Alexa = require('ask-sdk-core');
const Anime = require('./models/animeModel');
const AnimeService = require('./services/animeService');

let userAnimeList = []; // Liste der Animes des Benutzers

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Willkommen beim Anime Benachrichtigungs Skill! Wie kann ich Ihnen helfen?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const AddAnimeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddAnimeIntent';
    },
    handle(handlerInput) {
        const animeName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'animeName');
        const notifications = Alexa.getSlotValue(handlerInput.requestEnvelope, 'notifications');
        
        const newAnime = new Anime(animeName, notifications);
        userAnimeList.push(newAnime);

        const speakOutput = `Ich habe ${animeName} zu Ihrer Liste hinzugefügt und werde Sie über ${notifications} informieren.`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const GetAnimeListIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetAnimeListIntent';
    },
    handle(handlerInput) {
        const speakOutput = userAnimeList.length > 0 
            ? `Ihre Anime-Liste enthält: ${userAnimeList.map(anime => anime.name).join(', ')}.`
            : 'Ihre Anime-Liste ist leer.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Logik zur Benachrichtigung des Benutzers
const NotifyUserIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NotifyUserIntent';
    },
    handle(handlerInput) {
        // Hier wird die Logik zur Benachrichtigung des Benutzers implementiert
        const speakOutput = 'Ich werde Sie benachrichtigen, wenn neue Folgen oder Synchronisationen verfügbar sind.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AddAnimeIntentHandler,
        GetAnimeListIntentHandler,
        NotifyUserIntentHandler
    )
    .lambda();
