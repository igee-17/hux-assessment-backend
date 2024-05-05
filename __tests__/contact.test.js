const request = require('supertest');
const app = require('../app'); // Assuming your main application entry point
const { updateContact } = require('../controllers/userController');

describe('POST /create-contact', () => {
    const userId = 2; // Replace with a valid user ID for testing
    const userEmail = 'user@email.com'; // Replace with a valid user email for testing
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDg2OTA2MiwiZXhwIjoxNzE0ODcwODYyfQ.vbtc2bZayRCEkgI6kwl3Gq8RpDJ5iTHtz22QFBnc3_E'; // Replace with a valid JWT token

    test('should add a new contact successfully', async () => {
        const response = await request(app)
            .post('/user/create-contact')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '123-456-7890',
            })
            .set('Authorization', `Bearer ${validToken}`); // Set authorization header

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Contact added successfully');
    });

    // Test with missing required field
    test('should return 400 for missing required field', async () => {
        const response = await request(app)
            .post('/user/create-contact')
            .send({
                lastName: 'Doe',
                phoneNumber: '123-456-7890',
            })
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Missing required fields');
    });

});

describe('PUT /user/update-contact', () => {
    // Assuming you have a way to generate valid user ID, email, and contact ID for testing
    const userId = 2;
    const userEmail = 'user@mail.com';
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDg2OTA2MiwiZXhwIjoxNzE0ODcwODYyfQ.vbtc2bZayRCEkgI6kwl3Gq8RpDJ5iTHtz22QFBnc3_E';
    const existingContactId = 1; // Replace with an existing contact ID

    // Successful update with some fields
    test('should update contact successfully with some fields', async () => {
        const mockPool = {
            query: jest.fn()
                .mockReturnValueOnce(Promise.resolve([{ id: existingContactId }])) // Simulate successful verification
                .mockReturnValueOnce(Promise.resolve({ affectedRows: 1 })), // Simulate successful update
        };

        // Simulate the pool being injected
        const updateContactWithMockPool = updateContact.bind({ pool: mockPool });

        const response = await request(app)
            .put(`/user/update-contact`)
            .send({
                firstName: 'breeze',
                contactId: 1,
                firstName: "John",
                lastName: "lee",
                phoneNumber: "777-456-7890"
            })
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Contact updated successfully');
    });

    // Test with missing contact ID
    test('should return 400 for missing contact ID', async () => {
        const response = await request(app)
            .put('/user/update-contact') // Missing contact ID
            .send({
                firstName: 'John',
            })
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Missing contact ID or update data');
    });

    // Test with missing update data
    test('should return 400 for missing update data', async () => {
        const response = await request(app)
            .put(`/user/update-contact`)
            .send({}) // Empty body
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Missing contact ID or update data');
    });

    // Test with non-existent contact (verification fails)
    test('should return 404 for non-existent contact', async () => {
        const mockPool = {
            query: jest.fn().mockReturnValueOnce(Promise.resolve([])), // No rows found during verification
        };

        // Simulate the pool being injected
        const updateContactWithMockPool = updateContact.bind({ pool: mockPool });

        const response = await request(app)
            .put(`/user/update-contact`)
            .send({
                firstName: 'breeze',
                contactId: 2, //add non existent id here
                firstName: "John",
                lastName: "lee",
                phoneNumber: "777-456-7890"
            })
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Contact not found');
    });


});