import app from './app';

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
