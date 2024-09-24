import { useEffect, useState } from "react"

import "./App.css"

import routerLogo from "./assets/router.svg"
import devUpLogo from "./assets/devup.png"

const SEPOLIA_CHAINID = "0xaa36a7"

function App() {
  const [hasMetamask, setHasMetamask] = useState(false)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState("")

  const isSepolia: boolean =
    SEPOLIA_CHAINID.toLowerCase() === currentNetwork.toLowerCase()

  useEffect(() => {
    const checkMetamask = async () => {
      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true)
        setIsMetaMaskInstalled(true)
      } else {
        setHasMetamask(false)
      }
    }

    const getCurrentNetwork = async () => {
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          })
          setCurrentNetwork(chainId)
        } catch (error) {
          console.error("Error: ", error)
        }
      } else {
        setHasMetamask(false)
        setIsMetaMaskInstalled(false)
      }
    }

    // Initial check
    checkMetamask()
    getCurrentNetwork()

    const pollInterval = setInterval(checkMetamask, 1000)
    console.log(typeof window.ethereum)

    return () => clearInterval(pollInterval)
  }, [])

  console.log("MM: ", hasMetamask, isMetaMaskInstalled, isSepolia)

  const switchToSepolia = async () => {
    if (window.ethereum) {
      try {
        // Request MetaMask to switch to Sepolia test network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xAA36A7" }], // Sepolia chain ID in hex (0xAA36A7 = 11155111 in decimal)
        })
        window.location.reload()
      } catch (error: any) {
        // This error code means the chain has not been added to MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xAA36A7",
                  chainName: "Sepolia Test Network",
                  nativeCurrency: {
                    name: "Sepolia ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://sepolia.infura.io/v3/"], // Replace with your preferred RPC URL
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                },
              ],
            })
          } catch (addError) {
            console.error("Failed to add Sepolia network", addError)
          }
        } else {
          console.error("Failed to switch to Sepolia network", error)
        }
      }
    }
  }

  return (
    <>
      <h1>DevUp! - Router Protocol</h1>
      <w3m-button />
      <div className="devUpContainer">
        {isMetaMaskInstalled ? (
          <div className="checkSteps">
            <p className="mmInstalled">
              ✅ Metamask is currently installed on this browser
            </p>
            {!isSepolia ? (
              <button onClick={switchToSepolia}>Switch to Sepolia</button>
            ) : (
              <p className="mmInstalled">✅ Active network is Sepolia</p>
            )}
          </div>
        ) : (
          <p className="appWarning">
            ⚠️ Please install{" "}
            <a href="https://metamask.io/download/">Metamask</a> to continue
          </p>
        )}
      </div>

      <footer>
        <a href="https://www.devup.academy">
          <img src={devUpLogo} className="logo" alt="DevUp! logo"></img>
        </a>
        <a href="https://www.routerprotocol.com">
          <img
            src={routerLogo}
            className="logo"
            alt="Router Protocol logo"
          ></img>
        </a>
      </footer>
    </>
  )
}

export default App
