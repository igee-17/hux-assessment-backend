const pool = require('../db/db');
const { getUserEmail } = require('../middleware/userMiddleware');

exports.addContact = async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
    // console.log('body', req.body.firstName);
    const { userId } = req; // Assuming 'req.user.id' contains user's ID

    console.log(userId);

    // Validate input
    if (!firstName || !lastName || !phoneNumber) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    const userEmail = await getUserEmail(userId, pool);

    // Insert contact into database with retrieved email
    const [result] = await pool.query('INSERT INTO contacts (first_name, last_name, phone_number, user_email) VALUES (?, ?, ?, ?)', [
        firstName,
        lastName,
        phoneNumber,
        userEmail
    ]);

    if (result.affectedRows === 0) {
        return res.status(500).send({ message: 'Failed to add contact' });
    }

    res.status(201).send({ message: 'Contact added successfully', contact: { firstName, lastName, phoneNumber } });
}


exports.getContacts = async (req, res) => {
    const { userId } = req; // Assuming 'req.user.id' contains user's ID

    const userEmail = await getUserEmail(userId, pool);

    // Fetch contacts for the user
    const [rows] = await pool.query('SELECT * FROM contacts WHERE user_email = ?', [userEmail]);

    // Send response
    if (rows.length === 0) {
        return res.status(200).send({ message: 'No contacts found', contacts: [] });
    }

    res.status(200).send({ contacts: rows });
}

exports.getContact = async (req, res) => {
    const { contactId } = req.params; // Assuming contact ID is in URL parameter
    const { userId } = req; // Assuming user ID retrieved from authentication

    const userEmail = await getUserEmail(userId, pool);

    // Validate input
    if (!contactId) {
        return res.status(400).send({ message: 'Missing contact ID' });
    }

    // Securely fetch contact
    const [rows] = await pool.query('SELECT * FROM contacts WHERE contact_id = ? AND user_email = ?', [contactId, userEmail]);

    // Send response
    if (rows.length === 0) {
        return res.status(404).send({ message: 'Contact not found' });
    }

    const contact = rows[0];
    res.status(200).send({ contact });
}

exports.updateContact = async (req, res) => {
    const { userId } = req; // Assuming user ID retrieved from authentication
    const { firstName, lastName, phoneNumber, contactId } = req.body; // Assuming update data is in request body

    console.log(req.body);

    // Validate input
    if (!contactId || (!firstName && !lastName && !phoneNumber)) {
        return res.status(400).send({ message: 'Missing contact ID or update data' });
    }

    const userEmail = await getUserEmail(userId, pool);

    // Securely fetch contact
    const [verifyRows] = await pool.query('SELECT * FROM contacts WHERE contact_id = ? AND user_email = ?', [contactId, userEmail]);
    if (verifyRows.length === 0) {
        return res.status(404).send({ message: 'Contact not found' });
    }

    // Construct update query based on provided data
    const updateFields = [];
    const updateValues = [];
    if (firstName) {
        updateFields.push('first_name = ?');
        updateValues.push(firstName);
    }
    if (lastName) {
        updateFields.push('last_name = ?');
        updateValues.push(lastName);
    }
    if (phoneNumber) {
        updateFields.push('phone_number = ?');
        updateValues.push(phoneNumber);
    }

    const updateExpression = updateFields.join(', ');

    // Update contact in database
    const [result] = await pool.query(`UPDATE contacts SET ${updateExpression} WHERE contact_id = ? AND user_email = ?`, [...updateValues, contactId, userEmail]);

    // Send response
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Contact not found or no update performed' });
    }
    const contact = { first_name: firstName, last_name: lastName, phone_number: phoneNumber, contact_id: contactId }

    res.status(200).send({ message: 'Contact updated successfully', contact });
}

exports.deleteContact = async (req, res) => {
    const { contactId } = req.params; // Assuming contact ID is in URL parameter
    const { userId } = req; // Assuming user ID retrieved from authentication

    // Validate input
    if (!contactId) {
        return res.status(400).send({ message: 'Missing contact ID' });
    }

    const userEmail = await getUserEmail(userId, pool); // Assuming getUserEmail fetches email

    // Securely delete contact
    const [result] = await pool.query('DELETE FROM contacts WHERE contact_id = ? AND user_email = ?', [contactId, userEmail]);

    // Send response
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Contact not found or not deleted' });
    }

    res.status(200).send({ message: 'Contact deleted successfully' });
}