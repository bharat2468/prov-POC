import mongoose, { Schema } from "mongoose";

const schemeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			index: true,
		},
		description: {
			type: String,
			trim: true,
		},
		department: {
			type: String,
			required: true,
			trim: true,
		},
		tags: {
			type: [String],
			default: [],
		},
		docsReq: {
			type: [String],
			enum: [
				"Aadhaar Card",
				"PAN Card",
				"Voter ID",
				"Passport",
				"Driving License",
				"Ration Card",
				"Electricity Bill",
				"Bank Passbook",
				"Income Certificate",
				"Birth Certificate",
			],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

export const Scheme =  mongoose.model("Scheme", schemeSchema);
