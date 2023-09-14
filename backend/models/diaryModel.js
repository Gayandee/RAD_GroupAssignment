import mongoose from 'mongoose';

const diarySchema = mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        diarybody: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Diary = mongoose.model('Diary', diarySchema);

export default Diary;
