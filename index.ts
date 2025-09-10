import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// Minimal React + ethers starter for a dApp
// - MetaMask connect
// - simple contract read/write stubs
// - Tailwind for quick styling

const CONTRACT_ADDRESS = "0xYourContractAddressHere";
const CONTRACT_ABI = [
  // Replace with your contract's ABI
  // Example: { "inputs": [], "name": "myValue", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}], "stateMutability":"view","type":"function" }
];

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [status, setStatus] = useState("idle");
  const [readValue, setReadValue] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const p = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(p);
      p.provider.on && p.provider.on("accountsChanged", handleAccountsChanged);
      p.provider.on && p.provider.on("chainChanged", handleChainChanged);
    }
    return () => {
      try {
        provider?.provider?.removeListener("accountsChanged", handleAccountsChanged);
        provider?.provider?.removeListener("chainChanged", handleChainChanged);
      } catch (e) {}
    };
  }, []);

  async function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      setAccount(null);
    } else {
      setAccount(accounts[0]);
    }
  }

  async function handleChainChanged(_chainId) {
    setNetwork(await provider.getNetwork());
  }

  async function connectWallet() {
    if (!provider) return setStatus("No Ethereum provider (install MetaMask)");
    try {
      await provider.send("eth_requestAccounts", []);
      const s = provider.getSigner();
      setSigner(s);
      const a = await s.getAddress();
      setAccount(a);
      setNetwork(await provider.getNetwork());
      setStatus("connected");
    } catch (e) {
      setStatus("connection_failed");
      console.error(e);
    }
  }

  async function readFromContract() {
    if (!provider) return setStatus("no_provider");
    setStatus("reading");
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
