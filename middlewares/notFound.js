// Definisco il middleware notFound, per la gestione di endpoint inesistenti
const notFound = (req, res, next) => {
	res.status(404).json({
		error: "404 - Not Found",
		message: "Errore ! Pagina non trovata!"
	});
};
// Esporto il middleware
module.exports = notFound;