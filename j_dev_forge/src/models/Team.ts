import mongoose from 'mongoose'
import validator from 'validator' //https://www.npmjs.com/package/validator

function validateURL(value: string) {
    return validator.isURL(value, { require_tld: false })
}

export interface Teams extends mongoose.Document {
    //_id: mongoose.Types.ObjectId;
     projectId : string
     teamMembers : string[]
     teamLead: string
}

const TeamSchema = new mongoose.Schema<Teams>({
    projectId: {
        type: String,
        required: [true, 'Please tell us the project_id for this team'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
      },
    teamMembers:{
        type: [String]
    },
    teamLead:{
        type: String,
    }
})

export default mongoose.models.Team || mongoose.model<Teams>('Team', TeamSchema)