import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";

import { makeStyles } from '@material-ui/core/styles';

import { useWeb3Modal } from "../hooks/web3";

const truncateAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const ConnectWallet = () => {
  const classes = useStyles();

  const [signerAddress, setSignerAddress] = useState("");
  // const [isWaiting, setWaiting] = useState(false)
  // const [isSent, setSent] = useState(false)
  // const [walletNotDetected, setWalletNotDetected] = useState(false)

  const { connectWallet, disconnectWallet, provider, error } = useWeb3Modal();

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSignerAddress(address);
    }
    if (provider) getAddress();
    else setSignerAddress("");
  }, [provider]);

  const handleClickConnect = async () => {
    await connectWallet();
  };

  const handleClickAddress = () => {
    disconnectWallet();
  };

  return (
    <button
      className={classes.btn}
      onClick={signerAddress ? handleClickAddress : handleClickConnect}>
      <Blockies
        className={classes.img}
        seed={signerAddress.toLowerCase()}
        size={8}
        scale={3}
      />
      <div>
        {signerAddress ? truncateAddress(signerAddress) : "Connect Wallet"}
      </div>
    </button>
  );
}

const useStyles = makeStyles((theme) => ({
  btn: {
    background: 'rgb(183,192,238)',
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    borderRadius: 9999,
    height: 35,
    display: 'flex',
    alignItems: 'center'
  },
  img: {
    borderRadius: 999,
    marginRight: 5
  }
}));

export default ConnectWallet;