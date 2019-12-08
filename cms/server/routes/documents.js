var express = require('../../node_modules/express');
var router = express.Router();

const Document = require("../models/document");
const sequenceGenerator = require("./sequenceGenerator");

/* GET /api/documents */
router.get('/', function(req, res, next) {
  getDocuments(res);
});

/* POST /api/documents */
router.post('/', function(req, res, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");

  var document = new Document({
    documentId: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveDocument(res, document);
});

/* PUT /api/documents */
router.put('/:id', function(req, res, next) {
  Document.findOne({documentId: req.params.id})
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;
  
      saveDocument(res, document);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

/* DELETE /api/documents */
router.delete('/:id', function(req, res, next) {
  Document.findOne({documentId: req.params.id})
    .then(document => {
      deleteDocument(res, document);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

function getDocuments(res) {
  Document.find()
    // .populate("children")
    .then(documents => {
      // success
      res.status(200).json({
        message: "Documents fetched successfully!",
        documents: documents
      });
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
}

function saveDocument(res, document) {
  document.save()
    .then(writeResult => {
      // success
      // getDocuments(res); // the assignment did this, but it's technically not correct
      res.status(201).json({
        message: "Document saved successfully",
        document: document
      })
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
}

function deleteDocument(res, document) {
  Document.deleteOne({ _id: document._id })
    .then(result => {
      res.status(201).json({
        message: "Document deleted successfully"
      })
    })
    .catch(error => {
      res.status(500).json(error);
    }
  );
}

module.exports = router;