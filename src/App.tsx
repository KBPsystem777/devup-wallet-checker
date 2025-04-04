import { useEffect, useState } from "react";

import { Analytics } from "@vercel/analytics/react";

import "./App.css";

function App() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    const checkMetamask = async () => {
      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true);
        setIsMetaMaskInstalled(true);
      } else {
        setHasMetamask(false);
      }
    };

    // Initial check
    checkMetamask();

    const pollInterval = setInterval(checkMetamask, 1000);
    console.log(typeof window.ethereum);

    return () => clearInterval(pollInterval);
  }, []);

  console.log("MM: ", hasMetamask, isMetaMaskInstalled);

  const handleRemixRedirection = () => {
    // Redirect to Remix IDE URL
    window.open("https://remix.ethereum.org", "_blank");
  };

  const handleSonicTestnetRedirection = () => {
    // Redirect to Sonic testnet URL
    window.open("https://testnet.soniclabs.com", "_blank");
  };

  const handleCodeFilesRedirection = () => {
    // Redirect to Sonic testnet URL
    window.open("https://bit.ly/bitdev-codes", "_blank");
  };

  return (
    <>
      <div>
        <h1 className="bitDevHeader">BitDev</h1>
      </div>
      <div className="devUpContainer">
        {isMetaMaskInstalled ? (
          <div className="checkSteps">
            <p className="mmInstalled">
              ✅ Metamask is currently installed on this browser
            </p>

            <button
              className="sonic-testnet-button"
              type="button"
              onClick={handleSonicTestnetRedirection}
            >
              Sonic Testnet
            </button>

            <button
              className="code-btn"
              type="button"
              onClick={handleCodeFilesRedirection}
            >
              Starter code
            </button>
            <button
              className="remix-btn"
              type="button"
              onClick={handleRemixRedirection}
            >
              Go to Remix IDE 💻
            </button>
          </div>
        ) : (
          <p className="appWarning">
            ⚠️ Please install{" "}
            <a href="https://metamask.io/download/" target="_blank">
              Metamask
            </a>{" "}
            to continue
          </p>
        )}
      </div>
      <Analytics />
    </>
  );
}

export default App;
