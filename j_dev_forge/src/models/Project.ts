import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator' //https://www.npmjs.com/package/validator

function validateURL(value: string) {
    return validator.isURL(value, { require_tld: false });
}

export interface Project extends Document {
    project_id: string;
    owner_id: mongoose.Types.ObjectId; // References Users
    description: string;
    category: string;
    price: number;
    location: string;
    tech_stack: string[];
    website: string;
    status: string;
    members: mongoose.Types.ObjectId[]; // Array of user IDs referencing Users
    payment_received: boolean;
}

const ProjectSchema: Schema = new Schema<Project>({
    project_id: {
        type: String,
        required: true,
        unique: true,
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to the Users model
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    tech_stack: {
        type: [String],
    },
    website: {
        type: String,
        validate: {
            validator: validateURL,
            message: 'Invalid URL format',
        },
    },
    status: {
        type: String,
        required: true,
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Users', // Reference to the Users model
    },
    payment_received: {
        type: Boolean,
        default: false,
    },
});

const Projects = mongoose.model<Project>('Projects', ProjectSchema);

export default Projects;
