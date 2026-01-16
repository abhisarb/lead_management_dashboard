const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Lead = require('../models/Lead');
require('dotenv').config();

const seedLeads = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing leads
        await Lead.deleteMany({});
        console.log('Cleared existing leads.');

        const statuses = ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'];
        const sources = ['Website', 'Referral', 'Cold Call', 'Social Media'];

        const leads = [];
        for (let i = 0; i < 500; i++) {
            leads.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                status: faker.helpers.arrayElement(statuses),
                source: faker.helpers.arrayElement(sources),
                value: faker.number.int({ min: 100, max: 10000 }),
                notes: faker.lorem.sentence(),
                createdAt: faker.date.past({ years: 1 })
            });
        }

        await Lead.insertMany(leads);
        console.log('Successfully seeded 500 leads.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding leads:', error);
        process.exit(1);
    }
};

seedLeads();
