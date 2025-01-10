const DB_NAME = `assemble`;

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
};

const USER_BADGES = Object.freeze([
    "Newbie",
    "Sniper",
    "Rusher",
    "Assaulter",
]);

const GAMES = Object.freeze([
    "Battlegrounds Mobile India",
    "Call of Duty Mobile", 
    "Free Fire",
    "Asphalt 9",
    "Valorant",
]);

const TOURNAMENT_TYPES = Object.freeze([
    "Solo",
    "Duo",
    "Squad",
]);

const USER_ROLES = Object.freeze([
    "USER",
    "ADMIN",
]);

const REGION = `Asia/Kolkata`;

const GAME_ID = Object.freeze({
    "Battlegrounds Mobile India": "bgmiId",
    "Call of Duty Mobile": "codmId",
    "Valorant": "valorantId",
    "Free Fire": "freefireId",
    "Asphalt 9": "asphaltId",
});

export {
    DB_NAME,
    COOKIE_OPTIONS,
    USER_BADGES,
    GAMES,
    TOURNAMENT_TYPES,
    USER_ROLES,
    REGION,
    GAME_ID,
};