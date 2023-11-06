import { Client, Databases, Account } from 'appwrite';

export const PROJECT_ID = '65355c17463d8c07ddbd'
export const DATABASE_ID = '65355d52606e304208d5'
export const COLLECTION_ID_MESSAGES = '65355d5f191df3a4eb5d'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65355c17463d8c07ddbd');

export const account = new Account(client)
export const databases = new Databases(client)

export default client