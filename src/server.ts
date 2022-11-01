import app, { init } from "@/app";
import { cronService } from "@/services";
import cron from "node-cron";

const port = +process.env.PORT || 8080;

init().then(() => {
  cron.schedule(
    "0 0 * * *",
    () => {
      cronService
        .runCronJob()
        .then(async () => {
          await cronService.saveCronJobLog();
        })
        .catch(async (error) => {
          await cronService.saveCronJobLog(error);
        });
    },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    }
  );

  app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}.`);
  });
});
