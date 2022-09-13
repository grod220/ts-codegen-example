import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { DeploymentConfig } from '../../types/config'
import { printGray, printGreen } from '../../utils/chalk'
import { ARTIFACTS_PATH, Storage } from './storage'
import fs from 'fs'
import { InstantiateMsgs } from '../../types/instantiateMsgs'
import assert from 'assert'
import {
  ExecuteMsg as NftExecuteMsg,
  InstantiateMsg as NftInstantiateMsg,
  QueryMsg as NftQueryMsg,
} from '../../types/generated/account-nft/AccountNft.types'
import { InstantiateMsg as RedBankInstantiateMsg } from '../../types/generated/mock-red-bank/MockRedBank.types'
import { MockRedBankQueryClient } from '../../types/generated/mock-red-bank/MockRedBank.client'

export class Deployer {
  constructor(
    private config: DeploymentConfig,
    private client: SigningCosmWasmClient,
    private deployerAddr: string,
    private storage: Storage,
  ) {}

  async saveStorage() {
    await this.storage.save()
  }

  async upload(name: keyof Storage['codeIds'], file: string) {
    if (this.storage.codeIds[name]) {
      printGray(`Wasm already uploaded :: ${name} :: ${this.storage.codeIds[name]}`)
      return
    }
    const wasm = fs.readFileSync(ARTIFACTS_PATH + file)
    const uploadResult = await this.client.upload(this.deployerAddr, wasm, 'auto')
    this.storage.codeIds[name] = uploadResult.codeId
    printGreen(`${this.config.chainId} :: ${name} : ${this.storage.codeIds[name]}`)
  }

  async instantiate(name: keyof Storage['addresses'], codeId: number, msg: InstantiateMsgs) {
    if (this.storage.addresses[name]) {
      printGray(`Contract already instantiated :: ${name} :: ${this.storage.addresses[name]}`)
      return
    }

    const { contractAddress } = await this.client.instantiate(
      this.deployerAddr,
      codeId,
      msg,
      `mars-${name}`,
      'auto',
    )
    this.storage.addresses[name] = contractAddress
    printGreen(
      `${this.config.chainId} :: ${name} Contract Address : ${this.storage.addresses[name]}`,
    )
  }

  async instantiateNftContract() {
    const msg: NftInstantiateMsg = {
      minter: this.deployerAddr,
      name: 'credit-manger-accounts',
      symbol: 'rover-nft',
    }
    await this.instantiate('accountNft', this.storage.codeIds.accountNft!, msg)
  }

  async instantiateMockRedBank() {
    const msg: RedBankInstantiateMsg = {
      coins: [{ denom: this.config.baseDenom, liquidation_threshold: '0.9', max_ltv: '0.8' }],
    }
    await this.instantiate('mockRedBank', this.storage.codeIds.mockRedBank!, msg)
  }

  async mintNft() {
    const tokenQuery: NftQueryMsg = { tokens: { owner: this.deployerAddr } }
    const queryBefore = (await this.client.queryContractSmart(
      this.storage.addresses.accountNft!,
      tokenQuery,
    )) as { tokens: string[] }

    const mintMsg: NftExecuteMsg = {
      mint: {
        user: this.deployerAddr,
      },
    }

    await this.client.execute(
      this.deployerAddr,
      this.storage.addresses.accountNft!,
      mintMsg,
      'auto',
    )

    const queryAfter = (await this.client.queryContractSmart(
      this.storage.addresses.accountNft!,
      tokenQuery,
    )) as { tokens: string[] }

    assert.equal(queryAfter.tokens.length, queryBefore.tokens.length + 1)
  }

  async queryMarket() {
    const client = new MockRedBankQueryClient(this.client, this.storage.addresses.mockRedBank!)
    const res = await client.market({ denom: this.config.baseDenom })
    printGreen(JSON.stringify(res))
  }
}
