/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Recipes = "recipes",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type RecipesRecord = {
	title: string
	description: string
	image?: string
	user: RecordIdString
}

export type UsersRecord = {
	name?: string
	recipes?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type RecipesResponse = RecipesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	recipes: RecipesRecord
	users: UsersRecord
}