export declare type DeploySeedPhrase = string;
export declare type DeployBase64String = string;
export declare type DeployAnchor = string;
export declare type DeployAddress = string | null;
export declare type DeployBalance = number;
export declare type DeployChainId = 'W' | 'T';
export interface DeployContractInitScriptArg {
    type: 'binary' | 'integer' | 'boolean' | 'string';
    value: string | number | boolean;
}
export declare type DeployContractInitScript = {
    [s: string]: DeployContractInitScriptArg[];
} | null;
export interface DeployContractRawModel {
    script: DeployBase64String;
    seed?: DeploySeedPhrase;
    address?: DeployAddress;
    balance?: DeployBalance;
    requestBalance?: DeployBalance;
    init?: DeployContractInitScript;
    anchor?: DeployAnchor;
}
export interface DeployContractModel {
    script: DeployBase64String;
    seed: DeploySeedPhrase;
    address: DeployAddress;
    balance: DeployBalance;
    requestBalance: DeployBalance;
    isNew: boolean;
    init: DeployContractInitScript;
}
export interface DeployConfigModel {
    node: string;
    chainId: DeployChainId;
    deposit: DeploySeedPhrase;
    contracts: DeployContractRawModel[] | DeployContractModel[];
}
