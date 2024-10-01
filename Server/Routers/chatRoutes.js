const express = require('express');
const router = express.Router();

const chatController = require('../Controller/chatControllers');

router.post('/', chatController.accessChat);

router.get('/', chatController.fetchChats);

router.post('/group', chatController.createGroupChat);

router.put('/rename', chatController.renameGroup);

router.put('/groupremove', chatController.removeFromGroup);

router.put('/groupadd', chatController.addToGroup);


module.exports = router;