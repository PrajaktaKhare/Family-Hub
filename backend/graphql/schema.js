import * as controller from './controller.js'


export const typeDefs = `#graphql
    type User {
        name: String,
        email: String,
        password: String,
        role: String,
        devices: [Device]

    }
    type Device {
        userId: String,
        name: String,
        type: String,
        os: String,
        owner: User
        installedApps: [App!]!
        
    }
        
    type App{
        name: String,
        packageId: String,
        category: String,
        devices:[Device]
    }
    type Query{
        user_device(id: String!) : [Device]
        apps: [App]
        installedApp(id: String!): [App!]!
    }
`

export const resolvers = {
    Query: {
        
        user_device: async(parent, args,context) => {
            const result = await controller.getDevice(args.id);
            console.log(args.id," graphql devices ",result);
            
            return result;
        },
        apps: async(parent,args,context) =>{
            const result = await controller.getAllApps();
            return result;
        },
        installedApp: async(parent, args, context) =>{
            const result = await controller.getInstalledApps(args.id);
            console.log("resolvers devices "+ result);
            return result.installedApps;
        }
    },
    Device: {
    installedApps: (parent) => {
        console.log("Device: => "+parent.installedApps);
      return parent.installedApps || [];
    }
  }
}




