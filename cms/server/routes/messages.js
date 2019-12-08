var express = require('../../node_modules/express');
var router = express.Router();

const Message = require("../models/message");
const sequenceGenerator = require("./sequenceGenerator");

/* GET /api/messages page. */
router.get('/', function(req, res, next) {
  getMessages(res);
});

/* POST /api/messages */
router.post('/', function(req, res, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");

  var message = new Message({
    messageId: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  saveMessage(res, message);
});

/* PUT /api/messages */
router.put('/:id', function(req, res, next) {
  Message.findOne({messageId: req.params.id}, function (err, message) {
    if (err || !message) {
      return res.status(500).json({
        title: "No Message Found",
        error: {message: "Message not found"}
      });
    }

    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    saveMessage(res, message);
  });
});

/* DELETE /api/messages */
router.delete('/:id', function(req, res, next) {
  var query = {messageId: req.params.id};

  Message.findOne(query, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: "No Message Found",
        error: err
      });
    }
    if (!message) {
      return Response.status(500).json({
        title: "No Message Found",
        error: {messageId: req.params.id}
      });
    }

    Message.deleteOne({ _id: message._id })
      .then(result => {
        res.status(201).json({
          message: "Message deleted successfully"
        })
      })
      .catch(error => {
        res.status(500).json(error);
      }
    );
  });
});

function getMessages(res) {
  Message.find()
  .then(messages => {
      res.status(200).json({
        message: "Messages fetched successfully!",
        messages: messages
      });
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
}

function saveMessage(res, message) {
  message.save()
    .then(writeResult => {
      // success
      // getMessages(res); // the assignment did this, but it's technically not correct
      res.status(201).json({
        title: "Message saved successfully",
        message: message
      })
    })
    .catch(error => {
      // fail
      res.status(500).json(error);
    }
  );
}

module.exports = router;