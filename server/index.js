const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const videoRoutes = require('./routes/videos');
const productRoutes = require('./routes/products');
const { typeDefs, resolvers } = require('./graphql');
const { authenticateToken } = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/products', productRoutes);

// GraphQL Setup
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Extract user from JWT if present
      const token = req.headers.authorization?.replace('Bearer ', '');
      let user = null;
      if (token) {
        try {
          const jwt = require('jsonwebtoken');
          user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
          // Invalid token - user remains null
        }
      }
      return { user };
    },
  }));

  // Serve React static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL playground available at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
