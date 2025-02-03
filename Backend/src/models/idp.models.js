import mongoose from 'mongoose';

const idpSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    tournamentName: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    roomPassword: {
        type: String,
        required: true
    }
});

export const IDP = mongoose.model('IDP', idpSchema);