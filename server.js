const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("JWT Authentication Example");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "munir" && password === "1234") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(400).send("Invalid Credentials");
  }
});

app.get("/protected", (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.json({ message: "Protected content", user: decoded });
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(400).send("Invalid Token");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
