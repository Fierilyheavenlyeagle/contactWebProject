import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: String,
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;

// Retrieve and return all contacts from the database.
