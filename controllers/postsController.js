// Importo l'array dei post
const posts = require(`../data/posts.js`);

// Index
const index = (req, res) => {
  // res.send(`Invio dell'elenco dei post`)

// Bonus:
const title = req.query.title;

// definitelyNotAnError.get(); // Per testare errori

// Array post filtrati
let filteredPosts = posts;
// Verifico valore di title e nel caso lo filtro
if(title){
  filteredPosts = posts.filter(item => item.title.toLowerCase() === title.toLowerCase());
}

  // res.json(posts);
  res.json(filteredPosts);
};

// Show
const show = (req, res) => {
	const id = parseInt(req.params.id);
	const post = posts.find(item => item.id === id);
	// res.send(`Dettaglio del post con ID: ${id}`);

  // Bonus:
  // Verifico se il post non esiste e restituisco errore 404
  if(!post){ res.status(404).json({error: "404 - Pagina non trovata!", message: "Il post non è presente!"})
  };
  res.json(post);
};

// Create
const create = (req, res) => {
  // Nuovo ID per nuovo post
  const newId = posts[posts.length -1].id +1;

  // Implemento logica e parametri da considerare nell'inserimento
  // Destructuring del body richiesta
  const { title, content, image, tags} = req.body;

  // Nuovo oggetto newPost
  const newPost = {
    id: newId,
    title,
    content,
    image,
    tags
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
  const post = posts.find(item => item.id === id);
  
  // Verifico se il post non esiste e restituisco errore 404
  if(!post){
    return res.status(404).json({error: "404 - Pagina non trovata!", message: "Il post non è presente!"})
  };

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
  const post = posts.find(item => item.id === id);
  
  // Verifico se il post non esiste e restituisco errore 404
  if(!post){
    return res.status(404).json({error: "404 - Pagina non trovata!", message: "Il post non è presente!"})
  };

  // Dati da modificare

  post.tags = req.body.tags;
  console.log(posts);
	res.json(post);
};

// 	res.send(`Modifica parziale del post con ID:${id}`);
// };

// Destroy
const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(item => item.id === id);

  // Bonus:
  // Verifico se il post non esiste e restituisco errore 404
  if(!post){ res.status(404).json({error: "404 - Pagina non trovata!", message: "Il post non è presente!"})
  };

  posts.splice(posts.indexOf(post), 1);
  res.sendStatus(204);
  // res.send(`Cancellazione del post con ID:${id}`)
  console.log(posts);
};

module.exports = {
  index,
  show,
  create,
  update,
  modify,
  destroy
};