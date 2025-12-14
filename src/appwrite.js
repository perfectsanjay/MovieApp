import { Client, Databases } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)    


export const updateSearchCount = async (searchTerm, movie) => {
   try{
    const result = await database.listTransactions()
   }
   catch(error) {
    console.log(error)
   }
}