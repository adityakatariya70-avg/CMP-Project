const Contact = require("../models/contactModel");

const contactSave = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        message: "All fields are Required!!",
      });
    }
    const contact = await Contact.create({
      name,
      email,
      mobile,
      message,
    });
    return res.status(201).json({
      message: "Message registered Successfully!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal Server Error",
    });
  }
};

const allContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find();
    if (allContacts.length == 0) {
      return res.status(404).json({
        message: "0 Contact Queries Found",
      });
    }
    return res.status(200).json({
      message: "All Contact Queries",
      contact: allContacts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

const singleContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        message: "Contact Query Not Found",
      });
    }
    return res.status(200).json({
      message: "Contact Query",
      contact: contact,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact Query Not Found",
      });
    }
    return res.status(200).json({
      message: "Contact Query Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const markasRead = async (req, res) => {
    try{
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(
    id,
    {
      isRead: true,
    },
    {
      new: true,
    },
  );

  if(!contact){
    return res.status(404).json({
        message:"Contact Query Not Found",
    })
  }
  return res.status(200).json({
    message:"Updated Successfully",
  })
}
catch(error){
return res.status(500).json({
    message:"Internal Server error",
})
}};

module.exports = { contactSave, allContacts, singleContact, deleteContact,markasRead };
