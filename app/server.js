require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }

  console.log('Conectado a MySQL');
});

// Endpoint principal
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando correctamente'
  });
});

// Endpoint health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP'
  });
});

// Obtener usuarios
app.get('/users', (req, res) => {

  db.query('SELECT * FROM users', (err, results) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json(results);

  });

});

// Crear usuario
app.post('/users', (req, res) => {

  const { name, email } = req.body;

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';

  db.query(sql, [name, email], (err, result) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    res.json({
      message: 'Usuario creado',
      id: result.insertId
    });

  });

});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});