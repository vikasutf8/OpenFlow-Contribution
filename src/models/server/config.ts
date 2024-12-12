
import {Avatars,Client,Databases,Storage,Users} from 'node-appwrite'
import { env } from "@/app/env";
// server to server(backend as service)  || routing  through frontend

//here client is  an instance (just like rope that feaching data from server)
export const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key
    
export const avatars = new Avatars(client);
export const users = new Users(client);
export const databases = new Databases(client);
export const storage = new Storage(client);