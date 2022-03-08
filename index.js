const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const dishesRouter = require("./routes/dishes");
const promotionsRouter = require("./routes/promotions");
const leadersRouter = require("./routes/leaders");

app.get("/", (req, res) => {
  res.send("Welcome to My Restaurant");
});
app.use("/dishes", dishesRouter);
app.use("/promotions", promotionsRouter);
app.use("/leaders", leadersRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
