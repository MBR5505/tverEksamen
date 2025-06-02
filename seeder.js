require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const argon2 = require('argon2');

const adminConfig = {
    development: {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123'
    },
    production: {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD 
    }
};

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        
        const environment = process.env.NODE_ENV || 'development';
        const config = adminConfig[environment];
        
        await User.deleteOne({ username: config.username });

        const hashedPassword = await argon2.hash(config.password);
        await User.create({
            username: config.username,
            email: config.email,
            password: hashedPassword,
            isAdmin: true
        });

        console.log(`Admin user seeded successfully in ${environment} mode`);
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
