document.addEventListener("DOMContentLoaded", function () {
  fetchBanks();
  // listens to all the events on the client's end
});

// this function fetches data from paystack using a method and authorization key from ones paystack account
function fetchBanks() {
  fetch("https://api.paystack.co/bank", {
    method: "GET",
    headers: {
      Authorization: "sk_test_505af14b5c5811f2e7748b84640baeb447445e3e",
    },
  })
    // promise to get the data from paystack in a json format/ data chained to api
    .then((response) => response.json())
    // use the choice data we've gotten/ data chained to json
    .then((data) => {
      const selectBank = document.getElementById("bank");

      //create the list of banks and iterates over each of the banks(looping)

      data.data.forEach((bank) => {
        //creation of element tag in Js
        const options = document.createElement("option");
        //element tag to help us choose the data will need
        options.value = bank.code;
        options.text = bank.name;
        selectBank.appendChild(options);
      });
    })
    .catch((error) => console.error("fetching bank error", error));
}

function verifyAccount() {
  const codeBank = document.getElementById("bank").value;
  const accountNumber = document.getElementById("account").value;

  const apiUrl = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&code_bank=${codeBank}`;

  const option = {
    method: "GET",
    headers: {
      Authorization: "sk_test_505af14b5c5811f2e7748b84640baeb447445e3e",
    },
  };

  fetch(apiUrl, option)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Http error Status:${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the verification response
      console.log(data);
      alert(data.message);
    })
    .catch((error) => console.error("Error verifying account", error));
}
