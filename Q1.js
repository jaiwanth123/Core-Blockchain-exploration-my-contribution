const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider("https://rpc.coredao.org");
const dotenv = require('dotenv');
dotenv.config();

const nonces=async()=>{//function to retrieve the nonce  of that account
    try{
        
           const nonce=await provider.getTransactionCount(address);
           
    }catch(error){

           console.log("error fetching the nonce");//this prints the error if the code in try block fails to execute
    }
}

const transaction={
from:'0xa5Ae85d23e28c35F536308f60Db6F4CeB3acB698',
to:'0x91B2C4001d413E44cBbc50A24f1f7C06C0b279E1',
value: ethers.utils.parseEther('0.0000000001'),
nonce:nonces,
};



const gasCalculator= async ()=>{

const gasLimit=provider.estimateGas(transaction);
const gasPrice=await provider.getGasPrice();//this returns the gas price in gwei

const gasLimit1= gasLimit.toString();
const gasPrice1= gasPrice.toString();

const transactionFees=gasLimit1*gasPrice1;
console.log(transactionFees);
console.log(gasLimit1)
console.log(gasPrice1)

}

gasCalculator();//this function returns the total gas required for the transaction