import { User } from "../models/user.models.js";
import { Game } from "../models/gameId.models.js";

const deleteUnverifiedUsers = async () => {
    const expirationTime = 24 * 60 * 60 * 1000;
    const now = new Date();
    try {
        const expiredUsers = await User.find({
            isVerified: false,
            createdAt: { $lt: new Date(now.getTime() - expirationTime) },
        });
        if (expiredUsers.length > 0) {
            const userIds = expiredUsers.map((user) => user._id);
            await User.deleteMany({
                _id: { $in: userIds },
            });
            await Game.deleteMany({
                owner: { $in: userIds },
            });
            console.log(`Deleted ${expiredUsers.length} unverified users.`);
        }
    } catch (error) {
        console.log("Error In Deleting Unverified Users: ", error.message);
    }
}

export default deleteUnverifiedUsers;