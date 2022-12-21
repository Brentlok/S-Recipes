/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Categories = "categories",
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

export type CategoriesRecord = {
	name: string
	recipes?: RecordIdString
}

export type RecipesRecord = {
	title: string
	description: string
	image?: string
	user: RecordIdString
	category: RecordIdString
}

export type UsersRecord = {
	name?: string
	recipes?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type CategoriesResponse = CategoriesRecord & BaseSystemFields
export type RecipesResponse = RecipesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	categories: CategoriesRecord
	recipes: RecipesRecord
	users: UsersRecord
}