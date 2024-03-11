import express from "express";
import cors from "cors";

PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server Running in port ${PORT}`);
});
