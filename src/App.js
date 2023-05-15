import "./App.css";
import { ethers } from "ethers";
import provylensFactory from "./artifacts/contracts/provylensFactory.sol/provylensFactory.json";
import provylens from "./artifacts/contracts/provylens.sol/provylens.json";
import { useState } from "react";

function App() {
  const make = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    console.log("Provider Signer created!");

    // create an instance of the provylensFactory contract
    const connectedContract = new ethers.Contract(
      "0x8464135c8F25Da09e49BC8782676a84730C318bC",
      provylensFactory.abi,
      signer
    );

    console.log("Contract connected!");

    // call the deployMyContract function to deploy a new instance of provylens
    const tx = await connectedContract.deployMyContract();
    const receipt = await tx.wait();
    if (receipt) {
      console.log("Factory Deployed!");
    }

    // get the address of the deployed contract instance associated with the signer address
    const deployedContractAddress = await connectedContract.getDeployedContract(
      signer.getAddress()
    );

    console.log("Address Received: " + deployedContractAddress);

    // create an instance of the provylens contract and connect it to the deployed contract address
    const myContract = new ethers.Contract(
      deployedContractAddress,
      provylens.abi,
      signer
    );

    console.log("Mycontract Instance created");

    // call a function on the provylens contract instance
    const txhello = await myContract.setTokenUriOnchain("hello bhaisaab");
    const helloReceipt = await txhello.wait();
    if (helloReceipt) {
      console.log("uri chaged");
    }

    const getValue = await myContract.uri(1);
    console.log(getValue);
  };
  const [fields, setFields] = useState([{ name: "", value: "" }]);

  const handleInputChange = (index, event) => {
    const values = [...fields];
    values[index].value = event.target.value;
    setFields(values);
  };

  const handleNameChange = (index, event) => {
    const values = [...fields];
    values[index].name = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    const values = [...fields];
    values.push({ name: "", value: "" });
    setFields(values);
  };

  let encodedData;
  const handleSaveData = () => {
    const jsonObject = {};

    fields.forEach((field) => {
      jsonObject[field.name] = field.value;
    });

    console.log(jsonObject);
    const jsonString = JSON.stringify(jsonObject);

    encodedData = btoa(jsonString);
    console.log("Encoded data:", encodedData);
  };
  const handleDecoding = () => {
    const decodedData = atob(encodedData);
    console.log("Decoded data:", decodedData);
  };

  const handleEncryption = () => {
    const decodedData = atob(encodedData);
    console.log("Decoded data:", decodedData);
  };

  return (
    <div>
      Hello
      <button onClick={() => make()}>Make</button>
      <div>
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Field Name"
              value={field.name}
              onChange={(e) => handleNameChange(index, e)}
            />
            <input
              type="text"
              placeholder="Field Value"
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
        <button onClick={handleAddField}>+</button>
        <button onClick={handleSaveData}>Save Data</button>
        <button onClick={handleDecoding}>decode</button>
      </div>
    </div>
  );
}

export default App;
