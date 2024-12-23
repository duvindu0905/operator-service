const axios = require('axios');  // Import axios
const Operator = require('../models/operatorModel');  // Import Operator model
const sgMail = require('@sendgrid/mail');  // Import SendGrid for sending emails

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// 1) Create a new operator and send an email
exports.createOperator = async (req, res) => {
  try {
    const { operatorId, userName, passWord, fullName, address, phoneNumber, nic, email } = req.body;

    // Validate fields (You can enhance this validation)
    if (!operatorId || !userName || !passWord || !fullName || !address || !phoneNumber || !nic || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new operator
    const newOperator = new Operator({
      operatorId, userName, passWord, fullName, address, phoneNumber, nic, email
    });

    // Save the operator to the database
    await newOperator.save();

    // Now send operator data to the Authentication Service to register the operator
    const authServiceData = {
      username: userName,
      password: passWord,  // You should hash this password in a real application
      role: 'operator',  // Specify the role for the user (operator)
    };

    // Sending the operator data to the Authentication Service API
    try {
      const authServiceUrl = `${process.env.AUTHENTICATION_SERVICE_URL_LOCAL}`; // Update with your authentication service URL
      const authResponse = await axios.post(authServiceUrl, authServiceData);

      if (authResponse.status === 201) {
        console.log('Operator details registered in authentication service');
      } else {
        console.error('Failed to register operator details in authentication service');
      }
    } catch (authError) {
      console.error('Error registering operator details in authentication service:', authError.message);
    }

    // Send an email notification to the operator
    const msg = {
      to: email,  // The email of the operator
      from: process.env.FROM_EMAIL1,  // Replace with a valid email address
      subject: 'Your Operator Account Details',
      text: `Hello ${fullName},\n\nYour operator account has been created successfully.\n\nUsername: ${userName}\nPassword: ${passWord}\n\nPlease keep your credentials safe.\n\nThank you!`,
      html: `<p>Hello ${fullName},</p><p>Your operator account has been created successfully.</p><p><strong>Username:</strong> ${userName}</p><p><strong>Password:</strong> ${passWord}</p><p>Please keep your credentials safe.</p><p>Thank you!</p>`
    };

    // Send the email using SendGrid
    await sgMail.send(msg);

    // Return success response
    return res.status(201).json({
      message: 'Operator created and email sent successfully',
      operator: newOperator
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


// 2) Get all operators
exports.getAllOperators = async (req, res) => {
  try {
    const operators = await Operator.find().select('-_id -__v'); // Exclude _id and __v
    return res.status(200).json(operators);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 3) Get an operator by operatorId
exports.getOperatorById = async (req, res) => {
  try {
    const operator = await Operator.findOne({ operatorId: req.params.operatorId }).select('-_id -__v'); // Exclude _id and __v
    if (!operator) {
      return res.status(404).json({ error: 'Operator not found' });
    }
    return res.status(200).json(operator);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 4) Update an operator by operatorId
exports.updateOperator = async (req, res) => {
  try {
    const updatedOperator = await Operator.findOneAndUpdate(
      { operatorId: req.params.operatorId },
      req.body,
      { new: true }
    );
    if (!updatedOperator) {
      return res.status(404).json({ error: 'Operator not found' });
    }
    return res.status(200).json(updatedOperator);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 5) Remove an operator by operatorId
exports.deleteOperator = async (req, res) => {
  try {
    const deletedOperator = await Operator.findOneAndDelete({ operatorId: req.params.operatorId });
    if (!deletedOperator) {
      return res.status(404).json({ error: 'Operator not found' });
    }
    return res.status(200).json({ message: 'Operator deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
