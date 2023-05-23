const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const config = {
    user: 'sa',
    password: '12345678',
    server: 'localhost',
    database: 'McTek',
    options: {
        trustServerCertificate: true,
    }
};

app.use(bodyParser.json());
app.use(cors());

// CREATE
app.post('/person/add', async (req, res) => {
    try {
      const { firstName, lastName, age } = req.body;
  
      await sql.connect(config);
      const result = await sql.query(
        `INSERT INTO dbo.Person (FirstName, LastName, Age) 
         VALUES ('${firstName}', '${lastName}', ${age})`
      );
  
      res.status(201).json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Can not create');
    } finally {
      sql.close();
    }
  });

// READ
app.get('/person/all', async (req, res) => {
    try {
      await sql.connect(config);
      const result = await sql.query('SELECT * FROM dbo.Person');
  
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Can not read');
    } finally {
      sql.close();
    }
  });

// UPDATE
app.put('/person/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, age } = req.body;
  
      await sql.connect(config);
      const result = await sql.query(
        `UPDATE dbo.Person 
         SET FirstName = '${firstName}', LastName = '${lastName}', Age = ${age}
         WHERE PersonID = ${id}`
      );
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Person not found' });
      }
  
      res.json({ message: 'Person updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Can not update');
    } finally {
      sql.close();
    }
  });

// DELETE
app.delete('/person/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      await sql.connect(config);
      const result = await sql.query(`DELETE FROM dbo.Person WHERE PersonID = ${id}`);
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Person not found' });
      }
  
      res.json({ message: 'Person deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } finally {
      sql.close();
    }
  });

// Start server
app.listen(2000, () => {
    console.log('Server started on port 2000');
});
