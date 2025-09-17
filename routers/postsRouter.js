// Importo express e definisco router
const express = require(`express`);
const router = express.Router();

// Importo il controller per i post
const postsController = require('../controllers/postsController.js')

// Definisco rotte dei posts
// Index
router.get("/", postsController.index);

// Show
router.get("/:id", postsController.show);

// Create
router.post("/", postsController.create);

// Update
router.put("/:id", postsController.update);

// Patch
router.patch("/:id", postsController.modify);

// Delete
router.delete("/:id", postsController.destroy);

// Esporto il router
module.exports = router;
