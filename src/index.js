import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Airbnb server is listening on http://localhost:${PORT}`);
});
