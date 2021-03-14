const { ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');  

const {MONGODB} = require('./config.js');
const Post = require('./models/Posts.js');
const typeDefs = gql`
    type Post{
        ID : ID!
        body : String!
        createdAt : String!
        username : String!
    }
    type Query{
        getPosts : [Post]
    }
`
 const resolvers = {
     Query:{
         async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            }catch(err){
                throw new Error(err);
            }
         }
     }
 }

 const server = new ApolloServer({
     typeDefs,
     resolvers
 });


 mongoose.connect(MONGODB, { useNewUrlParser: true}).then(()=>{
    console.log("Connection Successful to MongoDB!");
    return server.listen({port: 5000});
 }).then(res => {
     console.log(`Server is running ${res.url}`)
 })