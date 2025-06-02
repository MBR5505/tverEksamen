require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const argon2 = require('argon2');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        
        await User.deleteOne({ username: 'admin' });

        const hashedPassword = await argon2.hash('admin123');
        await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            isAdmin: true
        });

        console.log('Admin user seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
