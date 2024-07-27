import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const workerSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
			trim: true,
		},
		lastname: {
			type: String,
			required: true,
			trim: true,
		},
		languageKnown: {
			type: [String],
			enum: [
				"Hindi",
				"English",
				"Bengali",
				"Telugu",
				"Marathi",
				"Tamil",
				"Gujarati",
				"Urdu",
				"Kannada",
				"Odia",
				"Malayalam",
				"Punjabi",
				"Assamese",
				"Maithili",
				"Santali",
				"Kashmiri",
				"Nepali",
				"Dogri",
				"Konkani",
				"Sindhi",
			],
			default: [],
		},
		phone: {
			type: String,
			required: true,
			unique: true,
			trim: true,
            index:true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		pincode: {
			type: String,
			required: true,
			trim: true,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		levelOfEducation: {
			type: String,
			enum: ["10th", "12th", "Bachelor", "Master", "Illiterate"],
			required: true,
		},
        users:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]
	},
	{
		timestamps: true,
	}
);


workerSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});


// Method to check if the password is correct
workerSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
workerSchema.methods.generateAccessToken = async function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullname: `${this.firstname} ${this.lastname}`,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

// Method to generate a refresh token
workerSchema.methods.generateRefreshToken = async function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};


export const Worker = mongoose.model("Worker", workerSchema);
