const graphql = require('graphql');
const _  = require('lodash');
const contentModel = require("../models/content");
const castModel = require("../models/cast");
const directorModel = require("../models/director");
const typeModel = require("../models/type");
const categoryModel = require("../models/category");
const mongoose = require('mongoose');

const page = require('../common/pagination')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

/* 
* Data type for content type
*/
const typeType = new GraphQLObjectType({
    name: 'Type',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        content:{
            type: new GraphQLList(contentType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return contentModel.find({typeId:parent.id}).limit(args.limit).skip(args.offset)
            }
        }
    })
});

// Data type for director
const directorType = new GraphQLObjectType({
    name: 'Director',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLString},
        content: {
            type: new GraphQLList(contentType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return contentModel.find({directorIds: parent.id}).limit(args.limit).skip(args.offset)
            }
        }
    })
})

// Data type for cast
const castType = new GraphQLObjectType({
    name: 'Cast',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLString},
        content:{
            type: new GraphQLList(contentType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return contentModel.find({castIds:parent.id}).limit(args.limit).skip(args.offset)
            }
        }
    })
})

// Data type for cast
const categoryType = new GraphQLObjectType({
    name: 'Category',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        content:{
            type: new GraphQLList(contentType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return contentModel.find({categoryIds:parent.id}).limit(args.limit).skip(args.offset)
            }
        }
    })
})

// Data type for cast
const contentType = new GraphQLObjectType({
    name: 'Content',
    fields:() => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        country: {type: GraphQLString},
        rating: {type: GraphQLString},
        dateAdded: {type: GraphQLString},
        releaseYear: {type: GraphQLString},
        rating: {type: GraphQLString},
        duration: {type: GraphQLString},
        description: {type: GraphQLString},
        director: {
            type: new GraphQLList(directorType),
            resolve(parent,args){
                let directorIdsList = [];
                parent.directorIds.forEach(element => {
                    directorIdsList.push(new mongoose.Types.ObjectId(element));
                })
                return directorModel.find({_id:{$in:directorIdsList}})
            }
        },
        type: {
            type: typeType,
            resolve(parent,args){
                return typeModel.findById(parent.typeId)
            }
        },
        casts:{
            type: new GraphQLList(castType),
            resolve(parent,args){
                let castIdsList = [];
                parent.castIds.forEach(element => {
                    castIdsList.push(new mongoose.Types.ObjectId(element));
                });
                return castModel.find({_id:{$in:castIdsList}})
            }
        },
        categories:{
            type: new GraphQLList(categoryType),
            resolve(parent, args){
                let categoryIdsList = [];
                parent.categoryIds.forEach(element => {
                    categoryIdsList.push(new mongoose.Types.ObjectId(element))
                })
                return categoryModel.find({_id:{$in:categoryIdsList}});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        content:{
            type: contentType,
            args:{
                id: {type : GraphQLID}
            },
            resolve(parent,args,ctx){
               // console.log(ctx);
                return contentModel.findById(args.id);
            }
        },
        contents:{
            type: new GraphQLList(contentType),
            args:{
                limit: {type : GraphQLInt},
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return contentModel.find({}).limit(args.limit).skip(args.offset);
            }
        },
        cast:{
            type: castType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                return castModel.findById(args.id)
            }
        },
        casts:{
            type: new GraphQLList(castType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return castModel.find({}).limit(args.limit).skip(args.offset)
            }
        },
        director:{
            type: directorType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                return directorModel.findById(args.id)
            }
        },
        directors:{
            type: new GraphQLList(directorType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return directorModel.find({}).limit(args.limit).skip(args.offset)
            }
        },
        type:{
            type: typeType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                return typeModel.findById(args.id)
            }
        },
        types:{
            type: new GraphQLList(typeType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return typeModel.find({}).limit(args.limit).skip(args.offset)
            }
        },
        category:{
            type: categoryType,
            args:{
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                return categoryModel.findById(args.id)
            }
        },
        categories:{
            type: new GraphQLList(categoryType),
            args:{
                limit: {type: GraphQLInt },
                offset: {type: GraphQLInt}
            },
            resolve(parent,args){
                args = page.setOffsetLimitDefault(args);
                return categoryModel.find({}).limit(args.limit).skip(args.offset)
            }
        }
    }
});

// Creating mutatation for inserting data 
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addCast: {
            type: castType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let cast = new castModel({
                    name: args.name,
                    age: args.age
                });
                return cast.save();
            }
        },
        addCategory:{
            type: categoryType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let category = new categoryModel({
                    name: args.name,
                    description: args.description
                });
                return category.save();
            }
        },
        addDirector: {
            type: directorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let director = new directorModel({
                    name: args.name,
                    age: args.age
                });
                return director.save();
            }
        },
        addType: {
            type: typeType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let type = new typeModel({
                    name: args.name
                });
                return type.save();
            }
        },
        addContent:{
            type: contentType,
            args:{
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                dateAdded: {type: new GraphQLNonNull(GraphQLString)},
                releaseYear: {type: new GraphQLNonNull(GraphQLString)},
                rating: {type: new GraphQLNonNull(GraphQLString)},
                country: {type: new GraphQLNonNull(GraphQLString)},
                typeId: { type: new GraphQLNonNull(GraphQLID)},
                directorIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLID))},
                castIds:{type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
                categoryIds: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))}
            },
            resolve(parent, args){
                let content = new contentModel({
                    title: args.title,
                    description: args.description,
                    dateAdded: args.dateAdded,
                    releaseYear: args.releaseYear,
                    rating: args.rating,
                    country: args.country,
                    typeId: args.typeId,
                    directorIds: args.directorIds,
                    castIds: args.castIds,
                    categoryIds:args.categoryIds
                });
                return content.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});