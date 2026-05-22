import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL)
const db = client.db('SkillSphere_DB')

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		client,
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		},
	},
	trustedOrigins: [
		'http://localhost:3000',
		'https://astounding-cannoli-f3268c.netlify.app',
	],
})