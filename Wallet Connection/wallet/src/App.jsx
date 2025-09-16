import React, { useState } from 'react'
import {ethers} from 'ethers'
import Web3 from 'web3'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
const [account, setAccount] = useState(null);
// const connectWallet = async () => {
//   if (window.ethereum) {
//     try {
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const web3 = new Web3(window.ethereum);
//       const accounts = await web3.eth.getAccounts();
//       setAccount(accounts[0]);
//     } catch (error) {
//       console.error("Please connect to MetaMask.");
//     } 
//   } else {
//       alert("Please install MetaMask!");
//       console.error("MetaMask is not installed.");
//     }
//   }
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress
      //const accounts = await provider.listAccounts();
      setAccount(address);
    } catch (error) {
      console.error("Please connect to MetaMask.");
    } 
  } else {
      alert("Please install MetaMask!");
      console.error("MetaMask is not installed.");
    }
  }
  return (
    
    <>
     <button onClick={connectWallet}>
          Connect Wallet 
        </button>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
