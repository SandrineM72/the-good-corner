import express from "express";
import sqlite from "sqlite3";

const app = express();
app.use(express.json());
const port = 3000;
const db = new sqlite.Database('newdb.sqlite');


interface Ad {
  id: number
  title: string
  price: number
  picture: string
  city: string
  description: string
  creationdate: string
  category_id: number
}

/**** REQUETES GET ****/

app.get('/ads', (req, res) => {
  db.all('SELECT * FROM ads', (err, ads) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    res.send(ads)
  })
})

app.get('/adscategory', (req, res) => {
  db.all('SELECT * FROM adscategory', (err, ads) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    res.send(ads)
  })
})

app.get('/tag', (req, res) => {
  db.all('SELECT * FROM tag', (err, ads) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    res.send(ads)
  })
})


/**** REQUETES POST ****/

app.post('/ads', (req, res) => {
  db.run('INSERT INTO ads (title, price, picture, city, description, category_id) VALUES ($title, $price, $picture, $city, $description, $category_id)', {

    $title: req.body.title,
    $price: req.body.price,
    $picture: req.body.picture,
    $city: req.body.city,
    $description: req.body.description,
    $category_id: req.body.category_id

  }, function (err) {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    res.send({ ...req.body, id: this.lastID })
  })
})

app.post('/adscategory', (req, res) => {
  db.run('INSERT INTO adscategory (categoryname) VALUES ($categoryname)', {
    
    $categoryname: req.body.categoryname

  }, function (err) {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    res.send({ ...req.body, id: this.lastID })
  })
})

app.post('/tag', (req, res) => {
  db.run('INSERT INTO tag (name) VALUES ($name)', {
    
    $name: req.body.name

  }, function (err) {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    res.send({ ...req.body, id: this.lastID })
  })
})



/**** REQUETES DELETE POUR SUPPRIMER 1 ENREGISTREMENT ****/

app.delete('/ads/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  db.get('SELECT * FROM ads WHERE id = $id', {
    $id: id
  }, (err, adToDelete: Ad) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    if (!adToDelete) return res.sendStatus(404)
    db.run('DELETE FROM ads WHERE id = $id', {
      $id: id
    }, (err) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      res.send('ad deleted !')
    })
  })
})

app.delete('/adscategory/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  db.get('SELECT * FROM adscategory WHERE id = $id', {
    $id: id
  }, (err, adToDelete: Ad) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    if (!adToDelete) return res.sendStatus(404)
    db.run('DELETE FROM adscategory WHERE id = $id', {
      $id: id
    }, (err) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      res.send('category deleted !')
    })
  })
})

app.delete('/tag/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  db.get('SELECT * FROM tag WHERE id = $id', {
    $id: id
  }, (err, adToDelete: Ad) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    if (!adToDelete) return res.sendStatus(404)
    db.run('DELETE FROM tag WHERE id = $id', {
      $id: id
    }, (err) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      res.send('tag deleted !')
    })
  })
})



/**** REQUETES PATCH POUR MODIFIER 1 ENREGISTREMENT ****/

/**** A TERMINER ****/


app.patch('/ads/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)

  db.get('SELECT * FROM ads WHERE id = $id', {
    $id: id
  }, (err, adToUpdate: Ad) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    if (!adToUpdate) return res.sendStatus(404)

    db.run('UPDATE ads SET title=$title, price=$price, picture=$picture, city=$city, description=$description, creationdate=$creationdate, category_id=$category_id WHERE id = $id', {
      $id: id,
      $title: req.body.title || adToUpdate.title,
      $price: req.body.price || adToUpdate.price,
      $picture: req.body.picture || adToUpdate.picture,
      $city: req.body.city || adToUpdate.city,
      $description: req.body.description || adToUpdate.description,
      $creationdate: req.body.$creationdate || adToUpdate.creationdate,
      $category_id: req.body.category_id || adToUpdate.category_id

    }, (err) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      res.send('ad updated !')
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});