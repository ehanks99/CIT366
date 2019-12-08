var express = require('../../node_modules/express');
var router = express.Router();

const Contact = require("../models/contact");
const sequenceGenerator = require("./sequenceGenerator");

/* GET /api/contacts page. */
router.get('/', function(req, res, next) {
  getContacts(res);
});

/* POST /api/contacts */
router.post('/', function(req, res, next) {
  var maxContactId = sequenceGenerator.nextId("contacts");

  var contact = new Contact({
    contactId: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  saveContact(res, contact);
});

/* PUT /api/contacts */
router.put('/:id', function(req, res, next) {
  Contact.findOne({contactId: req.params.id}, function (err, contact) {
    if (err || !contact) {
      return res.status(500).json({
        title: "No Contact Found",
        error: {contact: "Contact not found"}
      });
    }

    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    saveContact(res, contact);
  });
});

/* DELETE /api/contacts */
router.delete('/:id', function(req, res, next) {
  var query = {contactId: req.params.id};

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return res.status(500).json({
        title: "No Contact Found",
        error: err
      });
    }
    if (!contact) {
      return Response.status(500).json({
        title: "No Contact Found",
        error: {contactId: req.params.id}
      });
    }

    Contact.deleteOne({ _id: contact._id })
      .then(result => {
        res.status(201).json({
          message: "Contact deleted successfully"
        })
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
});

function getContacts(res) {
  Contact.find()
    .populate("group")
    .then(contacts => {
      // success
      res.status(200).json({
        message: "Contacts fetched successfully!",
        contacts: contacts
      });
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
}

function saveContact(res, contact) {
  // replace contacts in contact "group" with their primary key (_id) values
  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  } 
  
  contact.save()
    .then(writeResult => {
      // success
      // getContacts(res); // the assignment did this, but it's technically not correct
      res.status(201).json({
        message: "Contact saved successfully",
        contact: contact
      })
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
}


module.exports = router;