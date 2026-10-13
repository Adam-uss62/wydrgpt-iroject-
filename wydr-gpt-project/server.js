import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ask', async (req, res) => {
  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  if (!question) return res.status(400).json({ error: 'Wpisz pytanie.' });
  if (question.length > 1500) return res.status(400).json({ error: 'Pytanie jest za długie.' });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'Brak klucza API. W tej chwili strona użyje lokalnej bazy odpowiedzi.' });

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.5',
      instructions: `Jesteś Wydr GPT, przyjaznym asystentem specjalizującym się w wydrach. Odpowiadaj po polsku, jasno i ciekawie, zwykle w 2–5 krótkich akapitach. Opieraj się na wiarygodnej wiedzy biologicznej. Jeśli dane są niepewne albo zależne od gatunku/regionu, zaznacz to. Nie wymyślaj faktów ani źródeł. Skupiaj się na wydrach; na pytania niezwiązane z wydrami krótko wyjaśnij, że specjalizujesz się w wydrach, ale możesz odpowiedzieć na krótkie pytanie pomocnicze. Nie zachęcaj do trzymania dzikich wydr jako zwierząt domowych.`,
      input: question,
      max_output_tokens: 500
    });
    res.json({ answer: response.output_text || 'Nie udało mi się przygotować odpowiedzi. Spróbuj ponownie.' });
  } catch (error) {
    console.error('OpenAI API error:', error?.message || error);
    res.status(502).json({ error: 'Nie udało się połączyć z modelem AI. Sprawdź klucz API, dostęp do modelu i spróbuj ponownie.' });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Wydr GPT działa: http://localhost:${port}`));
