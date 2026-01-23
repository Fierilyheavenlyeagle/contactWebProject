import Contact from "../models/contacts.js";

const apiKey =
  "Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N";

const createContact = async (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const lastContact = await Contact.findOne().sort({ id: -1 });

  const newId = lastContact ? lastContact.id + 1 : 1;

  // Create a Contact
  const contact = new Contact({
    id: newId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });

  // Save Contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact.",
      });
    });
};

const getAll = (req, res) => {
  console.log(req.header("apiKey"));
  if (req.header("apiKey") === apiKey) {
    Contact.find(
      {},
      {
        id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        favoriteColor: 1,
        birthday: 1,
        _id: 0,
      },
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contacts.",
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

const getSingle = (req, res) => {
  const id = req.params.id;
  if (req.header("apiKey") === apiKey) {
    Contact.find({ id: id })
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "Not found Contact with id " + id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Contact with id=" + id,
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};

const deleteContact = (req, res) => {
  const id = req.params.id;

  Contact.findOneAndDelete({ id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          message: "Contact was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id,
      });
    });
};

const updateContact = (req, res) => {
  const id = Number(req.params.id);

  Contact.findOneAndUpdate(
    { id: id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      },
    },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          message: "Contact was updated successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update Contact with id=" + id,
      });
    });
};
export default {
  createContact,
  getAll,
  getSingle,
  deleteContact,
  updateContact,
};
