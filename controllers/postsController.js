const connection = require("../data/db.js");
// // Importo l'array dei post
// const posts = require(`../data/posts.js`);

// Index
const index = (req, res) => {
  const sql = "SELECT * FROM posts";
  connection.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Errore nell'esecuzione della query" + err });
    res.json(results);
  });
};

// Show
const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM posts WHERE id = ?";
  // Bonus
  const tagSql = `SELECT * 
  FROM tags
  JOIN post_tag ON post_tag.tag_id = tags.id
  WHERE post_tag.post_id = ?`;
  
  

  connection.query(sql, [id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Errore nell'esecuzione della query per trovare il post" + err });
    if (results.length === 0)
      return res.status(404).json({ error: "Post non trovato !" + err });
    // res.json(results[0]); --- commentato per Bonus

    // Bonus
    connection.query(tagSql, [id], (err, tagSqlResult) => {
      if (err) res.status(500).json({ error: "Errore nell'esecuzione della query" + err });

      const postsWithTags = {
        ...results[0],
        tags: tagSqlResult
      }
      res.json({postsWithTags})
    })
  });
};

// Create
const create = (req, res) => {
  // Nuovo ID per nuovo post
  const newId = posts[posts.length - 1].id + 1;

  // Implemento logica e parametri da considerare nell'inserimento
  // Destructuring del body richiesta
  const { title, content, image, tags } = req.body;

  // Nuovo oggetto newPost
  const newPost = {
    id: newId,
    title,
    content,
    image,
    tags,
  };

  // Pusho l'oggetto creato in posts
  posts.push(newPost);
  console.log(posts);
  res.status(201).json(newPost);

  // res.json(post);
  // console.log(newId);
  // res.send('Creazione nuovo post');
};

// Update
const update = (req, res) => {
  const id = parseInt(req.params.id);
  // Recupero post dall'array
  const post = posts.find((item) => item.id === id);

  // Verifico se il post non esiste e restituisco errore 404
  if (!post) {
    return res
      .status(404)
      .json({
        error: "404 - Pagina non trovata!",
        message: "Il post non è presente!",
      });
  }

  // Dati da modificare
  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.send(post);
};

// Modify
const modify = (req, res) => {
  const id = parseInt(req.params.id);
  // Recupero post dall'array
  const post = posts.find((item) => item.id === id);

  // Verifico se il post non esiste e restituisco errore 404
  if (!post) {
    return res
      .status(404)
      .json({
        error: "404 - Pagina non trovata!",
        message: "Il post non è presente!",
      });
  }

  // Dati da modificare

  post.tags = req.body.tags;
  console.log(posts);
  res.json(post);
};

// 	res.send(`Modifica parziale del post con ID:${id}`);
// };

// Destroy
const destroy = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Errore nell'esecuzione della query" + err });
    res.sendStatus(204);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  modify,
  destroy,
};
