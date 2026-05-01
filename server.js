const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let users = {};

// CREATE ACCOUNT
app.post("/register", (req, res) => {
  const { username, password, pin } = req.body;

  if (users[username]) {
    return res.json({ message: "User already exists" });
  }

  users[username] = {
    password,
    pin,
    balance: 10000000,
    history: [
      { type: "deposit", amount: 10000000, note: "Initial deposit from Global Trust Bank" }
    ],
    accountNumber: Math.floor(1000000000 + Math.random() * 9000000000)
  };

  res.json({ message: "Account created successfully" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!users[username] || users[username].password !== password) {
    return res.json({ message: "Invalid login" });
  }

  res.json({
    message: "success",
    user: users[username],
    username
  });
});

// TRANSFER
app.post("/transfer", (req, res) => {
  const { fromUser, toAccount, amount, pin } = req.body;

  const sender = users[fromUser];
  const receiver = Object.values(users).find(u => u.accountNumber == toAccount);

  if (!sender || sender.pin !== pin) {
    return res.json({ message: "Invalid PIN" });
  }

  if (!receiver) {
    return res.json({ message: "Receiver not found" });
  }

  if (sender.balance < amount) {
    return res.json({ message: "Insufficient funds" });
  }

  sender.balance -= amount;
  receiver.balance += amount;

  sender.history.push({ type: "transfer", amount, note: `Sent to ${toAccount}` });
  receiver.history.push({ type: "receive", amount, note: `Received from ${sender.accountNumber}` });

  res.json({ message: "Transfer successful", balance: sender.balance });
});

// CRYPTO API
app.get("/crypto", async (req, res) => {
  try {
    const data = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd"
    );
    res.json(data.data);
  } catch {
    res.json({ error: "Crypto API failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
