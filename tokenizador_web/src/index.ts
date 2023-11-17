import express from 'express';
import cors from 'cors';
import { findCardByToken, tokenizeCard } from './tokenService';
import Joi from 'joi';


const app = express();
app.use(cors());
app.use(express.json());

const cardSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: ['com', 'es'] } }).max(100).required(),
  card_number: Joi.string().creditCard().length(16).required(),
  cvv: Joi.string().length(3).regex(/^\d{3,4}$/).required(),
  expiration_month: Joi.string().length(2).regex(/^(0[1-9]|1[0-2])$/).required(),
  expiration_year: Joi.string().length(4).regex(/^(202[3-9]|203[0-2])$/).required(),
});

app.post('/tokenize', async (req, res) => {
  try {
    if (req.headers.token !== 'pk_test_LsRBJkejzCOEEWOsw') {
      throw new Error('No se ha enviado el authorization correcto para el Header Authorization');
    }
    const { error, value } = cardSchema.validate(req.body);
    if (error) {
      throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    const token = await tokenizeCard(value);
    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

app.get('/retrieve-card', async(req, res) => {
  try {
    if (req.headers.token !== 'pk_test_LsRBJkejzCOEEWOsw') {
      throw new Error('No se ha enviado el authorization correcto para el Header Authorization');
    }
    const token = req.query.token;
    if (!token || typeof token !== 'string') {
      return res.status(400).send('Token is required and must be a string');
    }

    const cardData = await findCardByToken(token);

    if (cardData) {
      res.json(cardData);
    } else {
      res.status(404).send('Card data not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000 aca');
});
