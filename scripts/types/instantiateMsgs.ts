import { InstantiateMsg as NftInstantiateMsg } from './generated/account-nft/AccountNft.types'
import { InstantiateMsg as RedBankInstantiateMsg } from './generated/mock-red-bank/MockRedBank.types'

export type InstantiateMsgs = NftInstantiateMsg | RedBankInstantiateMsg
