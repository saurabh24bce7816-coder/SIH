import React, {useEffect , useState } from "react";
import { ethers } from "ethers"
const CONTRACT_ADDRESS = "Add";
const CONTRACT_ABI = [];
export default function App(){
  const [provider,setProvider] = useState(null);
  const [signer,setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const[network,setNetwork] = useState(null);
  const[status , setstatus ] = useState("idle");
  const [readValue, setReadValue] = useState(null);

useEffect(() => {
  if(window.ethereum ){
    const p = enw ethers.provider.on("accountsChanged",handleAccountsChanged);
    setProvider(p);
    p.provider.on && p.provider.on("accountsChanged", handleAccountsChanged);
    p.provider.on && p.provider.om("chainChanged" , hanleChainChanged);
  }
  return () = > {
    try{
    provider?.provider?.removeListener("accountsChanges",handleAccoutsChanged);
  provider?.provider?.removeListener("chainChanged",handleChanChanged);
}catch(e) {}
};
}, [] );
async function handleAccountsChanged(accouns){
  if(accounts.length == 0) {
    setAccount(null);
  }
  else{
    setAccount(account[0]);
  }
}
async function handleChainChanged(_chainId){
  setNetwork(await provider.getNetwork());
}
async function connectWallet(){
  if(!provider) return setStatus("No  Ethereum provider (install MetaMask)");
  try{
    await provider.send("eth_requestAccounts",[]);
    const s = provider.getSigner();
    setSigner(s);
    const a = await s.getAddress();
    setAccount(a);
    setNetwork(await provider .geTNetwork());
    setStatus("connected");
  }
  catch (e){
    setStatus("connection_failed");
    console.error(e);
  }
}
async function readFRomContract() {
  if(!provider) return setStatus("no_provider");
  setStatus("reading");
  try{
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const value = await contract.myValue();
    setReadValue(value.toString());
    setStatus("read_success");
  }catch(e) {
    setStatus("read_failed");
    console.eroor(e);
  }
}
return (
  <div  className = " flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <h1 className = "text-2xl font-bold mb-4"> afdsfas</h1>
  {account ? (
  <p className = "mb-2"> Status :{status}</p>
  {account ? (
    <p className ="mb-2">Status : {status}</p>
    ) : (
    <button 
onClick = { connectWallet}
      className = 'bg-blue-500 text-white px-4 py-2 rounded-xl shadow">
  Connect Wallet</button>
   )}

    
