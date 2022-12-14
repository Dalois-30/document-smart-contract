// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Document {
    address admin;

    mapping (string => Document) documents; // mapping of the structure document
    string[] documentByUuid;


    struct Document {
        string uuid; // uuid of the document
        string hash; // hash containing the informations of the document
        uint timeStamp;
    }

    // constructor - runs once when contract is deployed
    constructor() public {
        admin = msg.sender;
    }
    // modifier to allow only admin to execute a function
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not the admin");
        _;
    }
    
   

    // function to add document in the blockchain
    function addDocument(string memory uuid, string memory hash) public {

        // ensure that no duplicate document save
        require(keccak256(abi.encodePacked(uuid)) != keccak256(abi.encodePacked("")) // uuid must be different of "" and " "
            && keccak256(abi.encodePacked(uuid)) != keccak256(abi.encodePacked(" "))
            && keccak256(abi.encodePacked(hash)) != keccak256(abi.encodePacked("")) // hash must be different of "" 
            && bytes(documents[uuid].uuid).length == 0, 
            "either document already exist or uuid number entered was null");
        
        // save the data in the mapping object
        documents[uuid].uuid = uuid;
        documents[uuid].hash = hash;
        documents[uuid].timeStamp = block.timestamp;
        
        // update the table of document
        documentByUuid.push(uuid);
    }

  
    // function to display details of document
    function getDocument(string memory uuid) public view returns (string memory, string memory, uint) {
        return (documents[uuid].uuid, documents[uuid].hash, documents[uuid].timeStamp);
    }

    // function to displays all documents
    function allDocuments() public view returns (string[] memory) {
        return documentByUuid;
    }
}








