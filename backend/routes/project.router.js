const router = require("express").Router();
const ProjectController = require("../controllers/project.controller");

 /* get All document instance */
 router.get("/all", ProjectController.getAllDocuments);
 
 /* Create a document instance */
 router.post("/save", ProjectController.saveDocument);
 
 /* Get a document simple details by id */
 router.get("/:id", ProjectController.getDocument);
 


module.exports = router;
