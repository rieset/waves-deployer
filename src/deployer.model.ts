export type DeploySeedPhrase = string;
export type DeployBase64String = string;
export type DeployAddress = string | null;
export type DeployBalance = number;
export type DeployChainId = 'W' | 'T';

export interface DeployContractInitScriptArg {
  type: 'binary' | 'integer' | 'boolean' | 'string',
  value: string | number | boolean
}

export type DeployContractInitScript = {[s: string]: DeployContractInitScriptArg[]} | null

export interface DeployContractRawModel {
  script: DeployBase64String
  seed?: DeploySeedPhrase
  address?: DeployAddress
  balance?: DeployBalance
  requestBalance?: DeployBalance
  init?: DeployContractInitScript
}

export interface DeployContractModel {
  script: DeployBase64String
  seed: DeploySeedPhrase
  address: DeployAddress
  balance: DeployBalance
  requestBalance: DeployBalance
  isNew: boolean
  init: DeployContractInitScript
}

export interface DeployConfigModel {
  node: string
  chainId: DeployChainId
  deposit: DeploySeedPhrase
  contracts: DeployContractRawModel[] | DeployContractModel[]
}
