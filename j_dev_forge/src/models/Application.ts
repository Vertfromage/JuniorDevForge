import mongoose, { Schema, Document } from 'mongoose';

export interface Application extends Document {
    application_id: string;
    project_id: mongoose.Types.ObjectId; // References Projects
    user_id: mongoose.Types.ObjectId; // References Users
    status: string;
    messages: string[];
}

const ApplicationSchema: Schema = new Schema<Application>({
    application_id: {
        type: String,
        required: true,
        unique: true,
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects', // Reference to the Projects model
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to the Users model
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    messages: {
        type: [String],
    },
});

const Applications = mongoose.model<Application>('Applications', ApplicationSchema);

export default Applications;
