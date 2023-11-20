import axios from 'axios';
import { expect } from 'chai';
import mongoose from 'mongoose';

describe('Hotel API', () => {
  const baseUrl = 'http://localhost:5001'; // Update to your server's URL and port

  before(async () => {
    // Connect to your test database if needed
    // await mongoose.connect('your-mongodb-test-url');
  });

  after(async () => {
    // Clean up test data and close the database connection if needed
    // await mongoose.connection.close();
  });

  it('should return a 200 status code for the base route', async () => {
    try {
      const response = await axios.get(`${baseUrl}/user`);
      expect(response.status).to.equal(200);
      expect(response.data).to.equal('Hello World');
    } catch (error) {
      throw new Error('Base route not accessible');
    }
  });

  it('should allow a hotel to register', async () => {
    try {
      const hotelData = {
        email: 'test@example.com',
        password: 'password',
        isAdmin: false,
      };
      const response = await axios.post(`${baseUrl}/user/register`, hotelData);
      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('message', 'Hotel registered successfully');
    } catch (error) {
      throw new Error('Registration failed');
    }
  });

  it('should allow a registered hotel to log in', async () => {
    try {
      const loginData = {
        email: 'test@example.com',
        password: 'password',
      };
      const response = await axios.post(`${baseUrl}/user/login`, loginData);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('message', 'User Authenticated');
    } catch (error) {
      throw new Error('Login failed');
    }
  });

  it('should not allow a non-registered hotel to log in', async () => {
    try {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password',
      };
      await axios.post(`${baseUrl}/user/login`, loginData);
    } catch (error) {
      expect(error.response.status).to.equal(404);
      expect(error.response.data).to.have.property('message', 'User Does not exist');
    }
  });

  it('should not allow a hotel to register with an existing email', async () => {
    try {
      const hotelData = {
        email: 'test@example.com',
        password: 'password',
        isAdmin: false,
      };
      await axios.post(`${baseUrl}/user/register`, hotelData);
    } catch (error) {
      expect(error.response.status).to.equal(400);
      expect(error.response.data).to.have.property('message', 'User already exists');
    }
  });
});
