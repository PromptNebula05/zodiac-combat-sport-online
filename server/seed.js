const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Video = require('./models/Video');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Video.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const admin = await User.create({
      username: 'sifu_mulloy',
      email: 'admin@ninetiger.com',
      password: 'admin123',
      role: 'admin',
      firstName: 'Steve',
      lastName: 'Mulloy',
      beltLevel: 'Black Sash',
      bio: 'Head instructor and founder of Nine Tigers Northern Mantis Kung Fu School with over 25 years of experience.',
    });

    const maria = await User.create({
      username: 'maria_lin',
      email: 'maria@example.com',
      password: 'member123',
      role: 'member',
      firstName: 'Maria',
      lastName: 'Lin',
      beltLevel: 'White',
      bio: 'New student eager to learn traditional Northern Mantis Kung Fu forms and techniques.',
    });

    const david = await User.create({
      username: 'david_alles',
      email: 'david@example.com',
      password: 'member123',
      role: 'member',
      firstName: 'David',
      lastName: 'Alles',
      beltLevel: 'Black Belt (Yellow-Stripe)',
      bio: 'Experienced practitioner with 15+ years of training. Passionate about mentoring new students.',
    });

    console.log('Users created');

    // Create videos
    const videos = await Video.insertMany([
      {
        title: 'Introduction to Horse Stance',
        description: 'Learn the fundamental horse stance (Ma Bu), the foundation of all Kung Fu training. This video covers proper foot placement, weight distribution, and breathing techniques.',
        category: 'stances',
        skillLevel: 'Beginner',
        duration: '12:30',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['stance', 'basics', 'horse stance', 'ma bu', 'foundation'],
        uploadedBy: admin._id,
      },
      {
        title: 'Basic Straight Punch Technique',
        description: 'Master the straight punch (Chong Quan) with proper form, hip rotation, and power generation. Essential for all practitioners.',
        category: 'strikes',
        skillLevel: 'Beginner',
        duration: '15:45',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['punch', 'basics', 'strikes', 'chong quan'],
        uploadedBy: admin._id,
      },
      {
        title: 'Front Kick Fundamentals',
        description: 'Learn proper front kick technique including chamber position, extension, hip drive, and retraction. Covers both snap kicks and thrust kicks for self-defense and forms.',
        category: 'strikes',
        skillLevel: 'Beginner',
        duration: '14:00',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['kicks', 'front kick', 'basics', 'strikes', 'beginner'],
        uploadedBy: admin._id,
      },
      {
        title: 'Tiger Hands',
        description: 'The foundational Nine Tigers hand form. Covers punches, blocks, and knife hand strikes in a structured sequence. Essential for all beginners.',
        category: 'forms',
        skillLevel: 'Beginner',
        duration: '25:00',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['tiger hands', 'forms', 'punches', 'blocks', 'knife hand', 'beginner'],
        uploadedBy: admin._id,
      },
      {
        title: 'Basic Form 1',
        description: 'The first foundational form for new students. Introduces basic stances, blocks, and strikes in a structured sequence to build muscle memory and coordination.',
        category: 'forms',
        skillLevel: 'Beginner',
        duration: '22:15',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['basic form', 'forms', 'beginner', 'foundation'],
        uploadedBy: admin._id,
      },

      {
        title: 'Conditioning Routine for Beginners',
        description: 'A 20-minute conditioning workout designed for new students. Includes warm-ups, stretching, stance training, and cool-down exercises.',
        category: 'conditioning',
        skillLevel: 'Beginner',
        duration: '20:00',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['conditioning', 'workout', 'beginners', 'stretching'],
        uploadedBy: admin._id,
      },
      {
        title: 'Bow and Arrow Stance Fundamentals',
        description: 'Detailed breakdown of the bow and arrow stance (Gong Bu). Learn proper form and when to use it in forms and combat.',
        category: 'stances',
        skillLevel: 'Beginner',
        duration: '14:20',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['stance', 'bow stance', 'gong bu', 'arrow stance', 'basics'],
        uploadedBy: admin._id,
      },
      {
        title: 'Sparring Fundamentals - Timing and Distance',
        description: 'Learn the critical concepts of fighting range, timing, and how to control distance in sparring. Includes partner drills demonstration.',
        category: 'sparring',
        skillLevel: 'Intermediate',
        duration: '28:00',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['sparring', 'combat', 'timing', 'distance', 'drills'],
        uploadedBy: admin._id,
      },
      {
        title: 'Philosophy of Kung Fu: Northern Mantis',
        description: 'An exploration of the philosophical foundations of Northern Mantis Kung Fu. Covers traditional Chinese martial arts philosophy, discipline, and the mental aspects of training.',
        category: 'philosophy',
        skillLevel: 'Beginner',
        duration: '18:30',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['philosophy', 'northern mantis', 'martial arts', 'discipline'],
        uploadedBy: admin._id,
      },

      {
        title: 'Advanced Kick Combinations',
        description: 'Chain multiple kicks together including roundhouse, crescent, spinning back kick, and jump kicks. Requires solid foundation in basic kicks.',
        category: 'strikes',
        skillLevel: 'Advanced',
        duration: '22:45',
        thumbnail: '',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        instructor: 'Sifu Mulloy',
        tags: ['kicks', 'advanced', 'combinations', 'spinning kicks'],
        uploadedBy: admin._id,
      },

    ]);

    console.log(`${videos.length} videos created`);

    // Create products (training resources/equipment)
    const products = await Product.insertMany([
      {
        name: 'Nine Tigers Training Manual',
        description: 'Comprehensive guide covering all forms, techniques, and philosophy of the Nine Tigers system.',
        price: 29.99,
        category: 'Books',
        image: '',
      },
      {
        name: 'Kung Fu Uniform - Black',
        description: 'Traditional black Kung Fu uniform for beginners. Lightweight and breathable fabric.',
        price: 45.00,
        category: 'Apparel',
        image: '',
      },
      {
        name: 'Kung Fu Uniform - Traditional Black',
        description: 'Traditional black Kung Fu uniform for advanced students. Premium cotton blend.',
        price: 55.00,
        category: 'Apparel',
        image: '',
      },
      {
        name: 'Wooden Practice Staff',
        description: 'High-quality wax wood staff for weapons training. 6-foot length, tapered design.',
        price: 35.00,
        category: 'Equipment',
        image: '',
      },
      {
        name: 'Training Focus Mitts (Pair)',
        description: 'Padded focus mitts for partner striking drills. Durable synthetic leather.',
        price: 25.00,
        category: 'Equipment',
        image: '',
      },
      {
        name: 'Dit Da Jow Liniment',
        description: 'Traditional herbal liniment for conditioning and bruise treatment. 8oz bottle.',
        price: 18.00,
        category: 'Health',
        image: '',
      },
    ]);

    console.log(`${products.length} products created`);

    console.log('\n--- Seed Complete ---');
    console.log('Admin login: admin@ninetiger.com / admin123');
    console.log('Member login: maria@example.com / member123');
    console.log('Member login: david@example.com / member123');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedData();
