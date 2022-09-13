import { SigningCosmWasmClient, SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { GasPrice } from '@cosmjs/stargate'
import { DeploymentConfig } from '../../types/config'
import { Deployer } from './deployer'
import { Storage } from './storage'
import { printGray } from '../../utils/chalk'

const getWallet = async (mnemonic: string, chainPrefix: string) => {
  return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: chainPrefix,
  })
}

// const generateRandomKey = async (): Promise<string> => {
//   const wallet = await DirectSecp256k1HdWallet.generate(24)
//   return wallet.mnemonic
// }
// const randomKey = await generateRandomKey()
// const deployerWallet = await getWallet(randomKey, config.chainPrefix)
// const deployerAddr = await getAddress(deployerWallet)
// const deployerClient = await setupClient(config, deployerWallet)
// await funderClient.sendTokens(funderAddr, deployerAddr, coins(1e6, config.baseDenom), 'auto')
// const deployerBalance = await funderClient.getBalance(deployerAddr, config.baseDenom)
// printBlue(
//   `Deployer addr: ${deployerAddr}, balance: ${deployerBalance.amount} ${deployerBalance.denom}`,
// )

const getAddress = async (wallet: DirectSecp256k1HdWallet) => {
  const accounts = await wallet.getAccounts()
  return accounts[0].address
}

const setupClient = async (config: DeploymentConfig, wallet: DirectSecp256k1HdWallet) => {
  const clientOption: SigningCosmWasmClientOptions = {
    gasPrice: GasPrice.fromString(`0.1${config.baseDenom}`),
  }
  return await SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, wallet, clientOption)
}

export const setupDeployer = async (config: DeploymentConfig) => {
  const wallet = await getWallet(config.deployerMnemonic, config.chainPrefix)
  const client = await setupClient(config, wallet)
  const addr = await getAddress(wallet)
  const balance = await client.getBalance(addr, config.baseDenom)
  printGray(`Deployer addr: ${addr}, balance: ${parseInt(balance.amount) / 1e6} ${balance.denom}`)

  const storage = await Storage.load(config.chainId)
  return new Deployer(config, client, addr, storage)
}
