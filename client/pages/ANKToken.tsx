import React, { useState, useEffect } from 'react'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import artifacts from "../utils/TokenSwap.json";
import { ethers } from "ethers";


function ANKToken() {

  const style = {
    upperInput: `bg-[#20242A] rounded-2xl p-5 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    inputbox: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl text-white`,
    lowerInput: `bg-[#20242A] text-white mb-3 rounded-2xl p-4 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    btn: `bg-[#2172E5] text-white my-2 rounded-2xl py-4 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`
  }

  const deployedAddress = "0xDdf77bCB2Cf4DAc28FA505C4A48ba96D35A3E1F5";
  const [connected, isConnected] = useState(false)
  const [celoAmount, setCeloAmount] = useState(0)
  const [tokenAmount, setTokenAmount] = useState(0)


  const connectWallet = async () => {
    try{
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' })
        isConnected(true)
      }
    }catch(error){
      console.log("Wallet Connection Error: ", error)
    }
  }


  useEffect(() => {
    let DANKTokenPrice = 0.001;
    setCeloAmount(DANKTokenPrice * tokenAmount)
  }, [tokenAmount])


  useEffect(() => {
    setTokenAmount(1000 * celoAmount)
  }, [celoAmount])


  const Swap = async () => {
    try{
      if (typeof window !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const myAddress = await signer.getAddress()
        const ABI = artifacts.abi
        const contract = new ethers.Contract(deployedAddress, ABI, signer)
        const tokenPrice = await contract.tokenPrice()
        const amount = (tokenAmount * tokenPrice)/ 10**18
        console.log("tokenPrice: ", tokenPrice)
        console.log("tokenAmount * tokenPrice: ", (tokenAmount * tokenPrice)/ 10**18)
        const buy = await contract.Buy(myAddress, tokenAmount, {value: ethers.utils.parseEther(`${amount}`)})
        console.log(myAddress)
      }
    }catch(error){
      console.log("Swap Token Error: ", error)
    }
  }

  useEffect(() => {
    const Asset = async () => {
      const tokenSymbol = "ANK"    // Token Symbol
      const tokenDecimals = 0.3   
      try {
        const wasAdded = window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', 
            options: {
              address: deployedAddress, 
              symbol: tokenSymbol, 
              decimals: tokenDecimals,
            },
          },
        });
          
        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
        console.log(error)
      }
    }
    Asset()
  }, [connected])

  return (
    <div className="bg-slate-700 w-screen h-screen m-0 p-0">
      <div className='flex justify-center '>
        <div className=' bg-slate-800 w-4/12 rounded-3xl flex flex-col'>
          <p className='text-white ml-5 mt-5 font-semibold text-lg'>Swap</p>
          <div className="flex flex-col p-4">
            <div className={style.upperInput}>
              <input type="number" 
                placeholder='Ether'
                className={style.inputbox}
                pattern='^[0-9]*[.,]?[0-9]*$'
                onChange={(e) => setCeloAmount(e.target.value)}
                value={celoAmount}
              />
            </div>
            <div className="flex justify-center items-center">
              <ArrowCircleDownIcon fontSize='large' className='m-0 p-0' />
            </div>
            <input type="number" 
              className={style.lowerInput}
              placeholder='ANK Token'
              onChange={(e) => setTokenAmount(e.target.value)}
              value={tokenAmount}
            />
            <div className="current">
              <p className='text-white'>1 ANK = 0.001 ETH</p>
            </div>
            {connected ? 
              <button className={style.btn} onClick={Swap}>Swap Tokens</button> : 
              <button className={style.btn} onClick={connectWallet}>Connect Wallet</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ANKToken