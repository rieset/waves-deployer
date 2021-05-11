# Waves Contract Deployer

This package helps to deploy smart contracts to the blockchain Waves

## Configure

```yml
{
  "host": "https://nodes-testnet.wavesnodes.com",
  "chainId": "T", // W for mainnet and T for testnet
  
  // Address with a non-zero balance for deployment operations contracts
  "deposit": "seed phrase", 
  "contracts": [
    {
      // Required. path to local file
      "script": "path to contract file",

      // Optional. Use in other contracts like ENV vaariable ${MAIN_CONTRACT_ADDRESS}
      "anchor": "MAIN_CONTRACT_ADDRESS"

      // Optional. The amount that must be sent to the contract for it to work
      // 1400000 fee for contract deploy
      // >= 900000 per transaction
      "requestBalance": 10000000,

      // Optional. If it does not exist or is null, then create a new address for the contract
      "seed": "seed phrase",

      // Optional. Initializing contract after deploy 
      "init": {
        "addMember": [{
          "type": "string", // 'binary' | 'integer' | 'boolean' | 'string'
          "value": "...." // string | LONG | boolean
        }]
      }
    },
    // ...
    {
      "script": "path to contract file"
    }
  ]
}
```

## Use NPX
```
    npx waves-deployer contract-config.json
```

## Use in Github Action (Only for development environment and testing)
```
- name: Waves deployer
  uses: rieset/waves-deployer@v.1.1.0
  id: deploy
  with:
    config: './contracts-deploy-config.json'

# Optional. Output data
- name: Output data
  run: |
    echo "${{ steps.deploy.outputs.contracts }}" >> ./contracts.json
   
# Save output data as artifact after deploy    
- name: Artifacts
  uses: actions/upload-artifact@v2
  with:
    name: contracts
    path: ./contracts.json

```
