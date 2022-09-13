import { setupDeployer } from './setupDeployer'
import { printRed } from '../../utils/chalk'
import { DeploymentConfig } from '../../types/config'

export const taskRunner = async (config: DeploymentConfig) => {
  const deployer = await setupDeployer(config)
  try {
    // await deployer.assertDeployerBalance()

    // Upload contracts
    await deployer.upload('accountNft', 'account_nft-aarch64.wasm')
    await deployer.upload('mockRedBank', 'mock_red_bank-aarch64.wasm')

    // Instantiate contracts
    await deployer.instantiateNftContract()
    await deployer.instantiateMockRedBank()

    // Test basic user flows
    await deployer.mintNft()
    await deployer.queryMarket()
  } catch (e) {
    printRed(e)
  } finally {
    await deployer.saveStorage()
  }
}
