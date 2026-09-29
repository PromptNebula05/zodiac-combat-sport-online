const Video = require('../models/Video');
const Product = require('../models/Product');
const User = require('../models/User');

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    firstName: String
    lastName: String
    beltLevel: String
    bio: String
    createdAt: String
  }

  type Video {
    id: ID!
    title: String!
    description: String!
    category: String!
    skillLevel: String!
    duration: String!
    thumbnail: String
    videoUrl: String!
    instructor: String
    tags: [String]
    isPublished: Boolean
    createdAt: String
    updatedAt: String
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    image: String
    inStock: Boolean
    createdAt: String
  }

  type Query {
    videos(category: String, skillLevel: String, search: String): [Video]
    video(id: ID!): Video
    products(category: String, minPrice: Float, maxPrice: Float, search: String): [Product]
    product(id: ID!): Product
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createVideo(
      title: String!
      description: String!
      category: String!
      skillLevel: String!
      duration: String!
      videoUrl: String!
      thumbnail: String
      instructor: String
      tags: [String]
    ): Video

    updateVideo(
      id: ID!
      title: String
      description: String
      category: String
      skillLevel: String
      duration: String
      videoUrl: String
      thumbnail: String
      instructor: String
      tags: [String]
      isPublished: Boolean
    ): Video

    deleteVideo(id: ID!): Boolean

    createProduct(
      name: String!
      description: String!
      price: Float!
      category: String!
      image: String
    ): Product

    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      category: String
      image: String
      inStock: Boolean
    ): Product

    deleteProduct(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    videos: async (_, { category, skillLevel, search }) => {
      const filter = { isPublished: true };
      if (category) filter.category = category;
      if (skillLevel) filter.skillLevel = skillLevel;
      if (search) {
        filter.$text = { $search: search };
      }
      return Video.find(filter).sort({ createdAt: -1 });
    },
    video: async (_, { id }) => {
      return Video.findById(id);
    },
    products: async (_, { category, minPrice, maxPrice, search }) => {
      const filter = {};
      if (category) filter.category = category;
      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice;
        if (maxPrice !== undefined) filter.price.$lte = maxPrice;
      }
      if (search) {
        filter.$text = { $search: search };
      }
      return Product.find(filter).sort({ createdAt: -1 });
    },
    product: async (_, { id }) => {
      return Product.findById(id);
    },
    users: async (_, __, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      return User.find().select('-password');
    },
    user: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin' && user.id !== id) {
        throw new Error('Unauthorized');
      }
      return User.findById(id).select('-password');
    },
  },
  Mutation: {
    createVideo: async (_, args, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      const video = new Video({ ...args, uploadedBy: user.id });
      return video.save();
    },
    updateVideo: async (_, { id, ...updates }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      return Video.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
    },
    deleteVideo: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      const result = await Video.findByIdAndDelete(id);
      return !!result;
    },
    createProduct: async (_, args, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      const product = new Product(args);
      return product.save();
    },
    updateProduct: async (_, { id, ...updates }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      return Product.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });
    },
    deleteProduct: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
      }
      const result = await Product.findByIdAndDelete(id);
      return !!result;
    },
  },
};

module.exports = { typeDefs, resolvers };
