
require('dotenv').config({ path: '.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require("web3")
const mnemonic = "1a1fd694570f84bcb670657d19b25e97bf441b9a638a89b69e11e125b1bbb48e";


var contract;
var projectContract;


const Artefact = require("../../build/contracts/Document.json");

// Set the provider you want from Web3.providers
const provider = new  HDWalletProvider(mnemonic, `https://eth-goerli.g.alchemy.com/v2/yLafHt5uip0F_4CLSvkI6grjY1VvLIDu`)

// Init web3
const web3 = new Web3(provider);



/* Init Contract and set default Variable *Contract* */
async function init() {
    try {

        contract = new web3.eth.Contract(Artefact.abi, Artefact.networks[5].address,  {
            from: '0xb954de63aAc9dc7D03f82046c4505EA27c16b5e1', // default from address
        })

    } catch (error) {
        throw "Unable to get contract instance";
    }
}


/* Create a project and return address */
exports.saveDocument = async (req, res) => {
    const body = req.body;
    console.log("body", body);
    try {
        await init(); // init the contract
        const doc = await contract.methods.addDocument(body.uuid, body.hash).send();
        return res.status(200).json({ msg: "Success", success: true, data: doc });
    } catch (error) {
        return res.status(500).json({ msg: "unable to get data", success: false, data: error.error });
    }
};


/*
*   Get Document data
*/
exports.getDocument = async (req, res) => {
    const body = req.body;
    try {
        await init();
        const document = await contract.methods.getDocument(body.uuid).call();
        console.log("document", document);
        return res.status(200).json({ msg: "Success", success: true, data: document });
    } catch (error) {
        return res.status(500).json({ msg: "unable to get data", success: false, data: error.error });
    }
}

/*
*   Get all document uuid
*/
exports.getAllDocuments = async (req, res) => {
    try {
        await init();
        const docs = await contract.methods.allDocuments().call();
        return res.status(200).json({ msg: "Success", success: true, data: docs });
    } catch (error) {
        return res.status(500).json({ msg: "unable to get data", success: false, data: error.error });
    }
}

// async function test(uuid, hash) {
//     try {
//         await init();
//         const doc = await contract.methods.addDocument(uuid, hash).send();;
//          console.log("data", doc);
//     } catch (error) {
//         console.log("error", error);
//     }
// }

// test("claude", "0x1234567890");