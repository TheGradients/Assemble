import './helpers/envConfig.js';
import app from "./app.js";
import connectDB from "./db/index.db.js";
import deleteUnverifiedUsers from "./helpers/unverifiedUserDelete.js";
import cron from "node-cron";
import initializeWorkers from "./utils/bull/workers/index.js";

initializeWorkers();

cron.schedule("0 0 * * *", async () => {
    await deleteUnverifiedUsers();
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`App Started On Port: ${process.env.PORT}`);;
        });
    })
    .catch((err) => {
        console.log(`Database Error: ${err}`);
    });