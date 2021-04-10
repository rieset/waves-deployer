import { DeployAddress, DeployConfigModel, DeployContractInitScript } from './deployer.model';
export declare class Deployer {
    private readonly node;
    private readonly chainId;
    private readonly network;
    private anchors;
    constructor(node: any, chainId: any);
    process(config: DeployConfigModel): Promise<{
        inited: boolean | (true | undefined)[];
        script: string;
        seed: string;
        address: DeployAddress;
        balance: number;
        requestBalance: number;
        isNew: boolean;
        init: DeployContractInitScript;
    }[]>;
    private setAnchor;
    private checkDeposit;
    private getAddress;
    private getBalance;
    private refillBalance;
    private convertScript;
    private deployContract;
    private checkTx;
    private initScripts;
}
