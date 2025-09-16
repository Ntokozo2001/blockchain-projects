import { ethers } from 'ethers';
console.log('Ethers library loaded:', typeof ethers);

const connectBtn = document.getElementById('connectBtn');
const statusDiv = document.getElementById('status');

const enterBtn = document.getElementById('enterBtn');


const contractAddress = "0xB9e2A2008d3A58adD8CC1cE9c15BF6D4bB9C6d72";
const contractABI = [
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getPlayers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let lotteryContract;

connectBtn.onclick = async function() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            statusDiv.textContent = `Connected: ${address}`;

            lotteryContract = new ethers.Contract(contractAddress, contractABI, signer);
			console.log('Here')
		} catch (err) {
			statusDiv.textContent = 'Connection failed: ' + err.message;
			console.error('MetaMask connection error:', err);
        }
    } else {
        statusDiv.textContent = 'MetaMask is not installed.';
    }
};

async function enterLottery() {
    if (!lotteryContract) {
        statusDiv.textContent = 'Connect to MetaMask first.';
        return;
    }
    try {
        const tx = await lotteryContract.enter({ value: ethers.utils.parseEther("0.00000000001") });
        await tx.wait();
        statusDiv.textContent = 'Entered the lottery!';
    } catch (err) {
        statusDiv.textContent = 'Transaction failed: ' + err.message;
        console.error('Transaction error:', err);
    }
}

enterBtn.onclick = enterLottery;
