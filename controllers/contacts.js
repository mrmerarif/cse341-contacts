const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const db = getDb();

    const contacts = await db
      .collection('contacts')
      .find({})
      .toArray();

    res.status(200).json(contacts);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single contact
const getContactById = async (req, res) => {
  try {
    const db = getDb();

    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const contact = await db.collection('contacts').findOne({
      _id: new ObjectId(contactId)
    });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found'
      });
    }

    res.status(200).json(contact);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST create contact
const createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const db = getDb();

    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({
      message: 'Contact created',
      id: result.insertedId
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const db = getDb();

    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.collection('contacts').replaceOne(
      { _id: new ObjectId(contactId) },
      updatedContact
    );

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({
        message: 'Contact not found'
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const db = getDb();

    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID'
      });
    }

    const result = await db.collection('contacts').deleteOne({
      _id: new ObjectId(contactId)
    });

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'Contact deleted'
      });
    } else {
      res.status(404).json({
        message: 'Contact not found'
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};