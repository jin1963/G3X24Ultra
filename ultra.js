const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";
let web3, contract, user;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else {
        alert("Please install MetaMask.");
    }
});

document.getElementById("connectButton").onclick = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    user = accounts[0];
    document.getElementById("walletAddress").innerText = user;
    contract = new web3.eth.Contract(stakingABI, contractAddress);
};

document.getElementById("approveButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const token = new web3.eth.Contract([
        {"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"type":"function"}
    ], tokenAddress);
    await token.methods.approve(contractAddress, web3.utils.toWei(amount, "ether")).send({ from: user });
    alert("Approved");
};

document.getElementById("stakeButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const duration = document.getElementById("tierSelect").value;
    await contract.methods.stake(web3.utils.toWei(amount, "ether"), duration).send({ from: user });
    alert("Staked");
};

document.getElementById("claimButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: user });
    alert("Claimed");
};

document.getElementById("unstakeButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: user });
    alert("Unstaked");
};
