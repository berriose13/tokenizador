"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCardByToken = exports.tokenizeCard = void 0;
const redis_1 = require("redis");
const crypto_1 = require("crypto");
const redisClient = (0, redis_1.createClient)({ url: 'redis://localhost:6379' });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.connect();
}))();
function tokenizeCard(cardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, crypto_1.randomBytes)(8).toString('hex');
        yield redisClient.set(token, JSON.stringify(cardData), { EX: 900 });
        return token;
    });
}
exports.tokenizeCard = tokenizeCard;
function findCardByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cardData = yield redisClient.get(token);
            if (cardData) {
                return JSON.parse(cardData);
            }
            else {
                console.log("No se encuentran datos para el token solicitado");
                return null;
            }
        }
        catch (error) {
            console.error('Error al buscar la tarjeta:', error);
            throw error;
        }
    });
}
exports.findCardByToken = findCardByToken;
