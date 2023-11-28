const mongoose = require("mongoose");
const router = require("express").Router();

const userSchema = require("../models/User");
const chatSchema = require("../models/Chat");
const messageSchema = require("../models/Message");

router.route("/:userId").get(async (req, res, next) => {
    const { userId } = req.params;

    await userSchema
        .findById(userId, "_id username")
        .then((user) => {
            res.json({ user });
        })
        .catch((error) => {
            console.log("Contacts Error " + error);
            return next(error);
        });
});

router.route("/:userId/contacts").get(async (req, res, next) => {
    const { userId } = req.params;

    await userSchema
    .find({ _id: { $ne: userId } }, "_id username")
    .then((users) => {
        res.json({ users });
    })
    .catch((error) => {
        console.log("Contacts Error " + error);
        return next(error);
    });
});

router.route("/messages/:chatId").get(async (req, res, next) => {
    await messageSchema
    .find({ chatId: req.params.chatId })
    .then((messages) => {
        res.json({ messages });
    })
    .catch((error) => {
        console.log("Message Error " + error);
        return next(error);
    });
});

router.route("/message").get(async (req, res, next) => {
    await messageSchema
    .create(req.body)
    .then((message) => {
        res.json({ message });
    })
    .catch((error) => {
        console.log("New Message Error " + error);
        return next(error);
    });
});

router.route("/:userId/chat").post(async (req, res, next) => {
    let newChat = "";
    if (req.body.name) {
        chatname = req.body.name;
    }

    await chatSchema
        .create({
            name: chatName,
            members: [req,params.userId, ...req.body.members],
            type: req.body.type
        })
        .then((chat) => {
            res.json({ chat });
        })
        .catch((error) => {
            console.log("New Chat Error " + error)
            return next(error);
        });
});

router.route("/:userId/chat/:chatType").get(async (req, res, next) => {
    await chatSchema
        .find({ type: req.params.chatType, members: { $in: [req.params.userId] } })
        .then((chats) => {
            res.json({ chats });
        })
        .catch((error) => {
            console.log("Chats Error" + error)
            return next(error);
        });
});

router.route("/:chat/:firstUserId/:secondUserId").get(async (req, res, next) => {
    await chatSchema
        .findOne({ type: "private", member: { $all: [req.params.firstUserId, req.params.secondUserId ] } })
        .then((chat) => {
            res.json({ chat });
        })
        .catch((error) => {
            console.log("Chat Error" + error)
            return next(error);
        });
});

router.route("/chat/:roomId").get(async (req, res, next) => {
    await chatSchema
    .findById(req.params.roomId)
    .then((chat) => {
        res.json({ chat })
    })
    .catch((error) => {
        console.log("Room Id Error" + error)
        return next(error);
    });
});

module.exports = router;