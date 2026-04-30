const http = require('http');

let balance = 5000000;
let historyList = [];

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.write(`
  <style>
    body {
  font-family: Arial;
  background: linear-gradient(to right, #e3f2fd, #f4f6f9);
  padding: 20px;
}

    h1 {
      color: #0d47a1;
    }

    #balance {
      font-size: 32px;
      color: green;
      margin: 20px 0;
    }

    input {
      padding: 10px;
      width: 200px;
    }
input:focus {
  outline: none;
  border: 2px solid #1a237e;
  box-shadow: 0 0 8px rgba(26,35,126,0.3);
}


   button {
  padding: 12px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  opacity: 1 !important;
  transition:  0.2s ease;
}
.balance-card {
  background: linear-gradient(135deg, #1a237e, #3949ab);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
}

.balance-card p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.balance-card h2 {
  margin: 5px 0 0;
  font-size: 28px;
}

 button:active {
    transform: scale(0.95);
}
   .deposit-btn {
  background-color: #2e7d32 !important;
}

.deposit-btn:hover {
  background-color: #43a047 !important;
}

.withdraw-btn {
  background-color: #c62828 !important;
}

.withdraw-btn:hover {
  background-color: #e53935 !important;
}

    #message {
      margin-top: 10px;
      font-weight: bold;
    }

    ul {
      background: white;
      padding: 10px;
      border-radius: 5px;
    }
  </style>
  <div class="container" style="max-width:420px; margin:50px auto; background:white; padding:30px; 5px; border-radius:12px; text-align:center; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">

    <h1 style="margin-bottom:10px;">Global Trust Bank</h1>

    <p>Welcome to Global Trust Bank Secure Portal</p>

   <div class="balance-card">
  <p>Available Balance</p>
  <h2 id="balance">$$${balance.toLocaleString()}</h2>
</div>

    <input type="number" id="amount" placeholder="Enter amount" />
    <br><br>

    <button class="deposit-btn" onclick="deposit()">Deposit</button>
    <button class="withdraw-btn" onclick="withdraw()">Withdraw</button>

    <h3>Transaction History</h3>
    <ul id="history"></ul>

</div>

    <p>Welcome to Global Trust Bank Secure Portal</p>

    <h2 id="balance">$${balance.toLocaleString()}</h2>

    <input type="number" id="amount" placeholder="Enter amount" />
    <br><br>

    <button class="deposit-btn" 
    onclick="deposit()">Deposit</button>
    <button class="withdraw-btn"
    onclick="withdraw()">Withdraw</button>
    <p id="message"></p>

    <h3>Transaction History</h3>
    <ul id="history" style="list-style:none; padding:0; text-align:center;"></ul>    </div>
    <script>
    document.querySelectorAll("button").forEach(btn => btn.disabled = false);
   let balance = localStorage.getItem("balance")
  ? Number(localStorage.getItem("balance"))
  : 5000000; 
    let historyList = localStorage.getItem("history")
  ? JSON.parse(localStorage.getItem("history"))
  : [];  

      function updateBalance() {
  document.getElementById("balance").innerText =
    "$" + balance.toLocaleString();
  localStorage.setItem("balance", balance);
}
updateBalance();

      function updateHistory() {
        let list = document.getElementById("history");
        list.innerHTML = "";

        historyList.forEach(item => {
          let li = document.createElement("li");
          li.innerText = item;
          list.appendChild(li);
        });
 localStorage.setItem("history", JSON.stringify(historyList));   
      }
    updateHistory();

      function deposit() {
        let amount = Number(document.getElementById("amount").value);

        if (amount <= 0) {
          document.getElementById("message").innerText = "Enter valid amount";
          return;
        }

        balance += amount;
        updateBalance();

        let time = new Date().toLocaleString();
historyList.push("Deposited $" + amount + " on " + time);
        updateHistory();

        document.getElementById("message").innerText = "Deposit successful";
      }

      function withdraw() {
        let amount = Number(document.getElementById("amount").value);

        if (amount > balance) {
          document.getElementById("message").innerText = "Insufficient funds";
          return;
        }

        if (amount <= 0) {
          document.getElementById("message").innerText = "Enter valid amount";
          return;
        }

        balance -= amount;
        updateBalance();

        historyList.push("Withdrew $" + amount);
        updateHistory();

        document.getElementById("message").innerText = "Withdrawal successful";
      }
    </script>
  `);

  res.end();
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});