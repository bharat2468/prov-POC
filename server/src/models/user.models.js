import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		avatar: {
			type: String, // Cloudinary URL or similar
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		refreshToken: {
			type: String,
			default: null,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
		gender: {
			type: String,
			enums:["male","female"],
			required: true,
		},
		disabilityLevel: {
			type: String,
			default: null,
		},
		age: {
			type: Number,
			required: true,
		},
		income: {
			type: Number,
			default: 0,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		pincode: {
			type: String,
			required: true,
			trim: true,
		},
		state: {
			type: String,
			required: true,
			trim: true,
		},
		caste: {
			type: String,
			enum: ["General", "OBC", "SC", "ST", "Other"],
			default: "General",
		},
		schemes: [{
				schemeId: {
					type: Schema.Types.ObjectId,
					ref: "Scheme",
					required: true,
				},
				status: {
					type: String,
					enum: ["docs collected", "in progress", "done"],
					default: "docs collected",
				},
				applicationDate: {
					type: Date,
					default: Date.now,
				},
			},
		]
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullName: this.fullName,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

userSchema.methods.generateRefreshToken = async function () {
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

export const User = mongoose.model("User", userSchema);
