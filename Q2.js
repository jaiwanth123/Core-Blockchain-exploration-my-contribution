const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider("https://rpc.coredao.org");
const dotenv = require('dotenv');
dotenv.config();

const sender_privateKey = process.env.SENDER_PRIVATE_KEY;
const sponsor_privateKey = process.env.SPONSOR_SPRIVATE_KEY;

const senderWallet = new ethers.Wallet(sender_privateKey, provider);
const sponsorWallet=new ethers.Wallet(sponsor_privateKey, provider);

async function sponsorTransaction() {
    // Define transaction parameters
    const tx = {
    to: "0x91B2C4001d413E44cBbc50A24f1f7C06C0b279E1",  // The address to which ETH or tokens are sent
    value: ethers.utils.parseEther('0.000000001'),  // Amount to send (in this case, 0.1 ETH)
    gasLimit: 21000,  // Gas limit for a standard ETH transfer
    nonce: await provider.getTransactionCount(0xa5Ae85d23e28c35F536308f60Db6F4CeB3acB698),  // Nonce for the sender
        gasPrice: await provider.getGasPrice()  // Current gas price
    };

    // Sign the transaction with the sender's private key
    const signedTx = await senderWallet.signTransaction(tx);

    // Sponsor sends the signed transaction to the network
    const txResponse = await sponsorWallet.sendTransaction({
        
        from: senderWallet.address,
        data: signedTx
    });

    // Wait for the transaction to be mined
    const receipt = await txResponse.wait();

    console.log('Transaction successful with hash:', receipt.transactionHash);
}

sponsorTransaction().catch(console.error);
