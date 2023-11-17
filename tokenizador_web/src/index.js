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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tokenService_1 = require("D:/PROYECTOS/ts-backend/src/tokenService");
const joi_1 = __importDefault(require("joi"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const cardSchema = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: ['com', 'es'] } }).max(100).required(),
    card_number: joi_1.default.string().creditCard().length(16).required(),
    cvv: joi_1.default.string().length(3).regex(/^\d{3,4}$/).required(),
    expiration_month: joi_1.default.string().length(2).regex(/^(0[1-9]|1[0-2])$/).required(),
    expiration_year: joi_1.default.string().length(4).regex(/^(202[3-9]|203[0-2])$/).required(),
});
app.post('/tokenize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.token !== 'pk_test_LsRBJkejzCOEEWOsw') {
            throw new Error('No se ha enviado el authorization correcto para el Header Authorization');
        }
        const { error, value } = cardSchema.validate(req.body);
        if (error) {
            throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        }
        const token = yield (0, tokenService_1.tokenizeCard)(value);
        res.json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
}));
app.get('/retrieve-card', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.token !== 'pk_test_LsRBJkejzCOEEWOsw') {
            throw new Error('No se ha enviado el authorization correcto para el Header Authorization');
        }
        const token = req.query.token;
        if (!token || typeof token !== 'string') {
            return res.status(400).send('Token is required and must be a string');
        }
        const cardData = yield (0, tokenService_1.findCardByToken)(token);
        if (cardData) {
            res.json(cardData);
        }
        else {
            res.status(404).send('Card data not found');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('An unknown error occurred');
        }
    }
}));
app.listen(3000, () => {
    console.log('Server running on port 3000 aca');
});
