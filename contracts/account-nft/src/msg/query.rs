use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;
#[allow(unused_imports)]
use cosmwasm_std::{Empty, StdError};
#[allow(unused_imports)]
use cw721::{
    AllNftInfoResponse, ApprovalResponse, ApprovalsResponse, ContractInfoResponse, NftInfoResponse,
    NumTokensResponse, OperatorsResponse, OwnerOfResponse, TokensResponse,
};
#[allow(unused_imports)]
use cw721_base::{MinterResponse, QueryMsg as ParentQueryMsg};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use std::convert::TryInto;

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    //--------------------------------------------------------------------------------------------------
    // Extended messages
    //--------------------------------------------------------------------------------------------------
    #[returns(String)]
    ProposedNewOwner {},

    /// Enumerate debt shares for all token positions; start_after accepts (token_id, denom)
    #[returns(Vec<SharesResponseItem>)]
    AllDebtShares {
        start_after: Option<(String, String)>,
        limit: Option<u32>,
    },

    //--------------------------------------------------------------------------------------------------
    // Base cw721 messages
    //--------------------------------------------------------------------------------------------------
    /// Return the owner of the given token, error if token does not exist
    #[returns(OwnerOfResponse)]
    OwnerOf {
        token_id: String,
        /// unset or false will filter out expired approvals, you must set to true to see them
        include_expired: Option<bool>,
    },

    /// Return operator that can access all of the owner's tokens.
    #[returns(ApprovalResponse)]
    Approval {
        token_id: String,
        spender: String,
        include_expired: Option<bool>,
    },

    /// Return approvals that a token has
    #[returns(ApprovalsResponse)]
    Approvals {
        token_id: String,
        include_expired: Option<bool>,
    },

    /// List all operators that can access all of the owner's tokens
    #[returns(OperatorsResponse)]
    AllOperators {
        owner: String,
        /// unset or false will filter out expired items, you must set to true to see them
        include_expired: Option<bool>,
        start_after: Option<String>,
        limit: Option<u32>,
    },
    /// Total number of tokens issued
    #[returns(NumTokensResponse)]
    NumTokens {},

    /// With MetaData Extension.
    /// Returns top-level metadata about the contract
    #[returns(ContractInfoResponse)]
    ContractInfo {},
    /// With MetaData Extension.
    /// Returns metadata about one particular token, based on *ERC721 Metadata JSON Schema*
    /// but directly from the contract
    #[returns(NftInfoResponse<Empty>)]
    NftInfo { token_id: String },
    /// With MetaData Extension.
    /// Returns the result of both `NftInfo` and `OwnerOf` as one query as an optimization for clients
    #[returns(AllNftInfoResponse<Empty>)]
    AllNftInfo {
        token_id: String,
        /// unset or false will filter out expired approvals, you must set to true to see them
        include_expired: Option<bool>,
    },

    /// With Enumerable extension.
    /// Returns all tokens owned by the given address, [] if unset.
    #[returns(TokensResponse)]
    Tokens {
        owner: String,
        start_after: Option<String>,
        limit: Option<u32>,
    },
    /// With Enumerable extension.
    /// Requires pagination. Lists all token_ids controlled by the contract.
    /// Return type: TokensResponse.
    #[returns(TokensResponse)]
    AllTokens {
        start_after: Option<String>,
        limit: Option<u32>,
    },

    /// Return the minter
    #[returns(MinterResponse)]
    Minter {},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct SharesResponseItem {
    pub token_id: String,
    pub denom: String,
    pub shares: Uint128,
}

impl TryInto<ParentQueryMsg> for QueryMsg {
    type Error = StdError;

    fn try_into(self) -> Result<ParentQueryMsg, Self::Error> {
        match self {
            QueryMsg::OwnerOf {
                token_id,
                include_expired,
            } => Ok(ParentQueryMsg::OwnerOf {
                token_id,
                include_expired,
            }),
            QueryMsg::Approval {
                token_id,
                spender,
                include_expired,
            } => Ok(ParentQueryMsg::Approval {
                token_id,
                spender,
                include_expired,
            }),
            QueryMsg::Approvals {
                token_id,
                include_expired,
            } => Ok(ParentQueryMsg::Approvals {
                token_id,
                include_expired,
            }),
            QueryMsg::AllOperators {
                owner,
                include_expired,
                start_after,
                limit,
            } => Ok(ParentQueryMsg::AllOperators {
                owner,
                include_expired,
                start_after,
                limit,
            }),
            QueryMsg::NumTokens {} => Ok(ParentQueryMsg::NumTokens {}),
            QueryMsg::ContractInfo {} => Ok(ParentQueryMsg::ContractInfo {}),
            QueryMsg::NftInfo { token_id } => Ok(ParentQueryMsg::NftInfo { token_id }),
            QueryMsg::AllNftInfo {
                token_id,
                include_expired,
            } => Ok(ParentQueryMsg::AllNftInfo {
                token_id,
                include_expired,
            }),
            QueryMsg::Tokens {
                owner,
                start_after,
                limit,
            } => Ok(ParentQueryMsg::Tokens {
                owner,
                start_after,
                limit,
            }),
            QueryMsg::AllTokens { start_after, limit } => {
                Ok(ParentQueryMsg::AllTokens { start_after, limit })
            }
            QueryMsg::Minter {} => Ok(ParentQueryMsg::Minter {}),
            _ => Err(StdError::generic_err(
                "Attempting to convert to a non-cw721 compatible message",
            )),
        }
    }
}
