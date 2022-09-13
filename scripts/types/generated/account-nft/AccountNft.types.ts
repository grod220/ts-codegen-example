// @ts-nocheck
/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.15.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  minter: string;
  name: string;
  symbol: string;
  [k: string]: unknown;
}
export type ExecuteMsg = {
  propose_new_owner: {
    new_owner: string;
    [k: string]: unknown;
  };
} | {
  accept_ownership: {
    [k: string]: unknown;
  };
} | {
  mint: {
    user: string;
    [k: string]: unknown;
  };
} | {
  transfer_nft: {
    recipient: string;
    token_id: string;
    [k: string]: unknown;
  };
} | {
  send_nft: {
    contract: string;
    msg: Binary;
    token_id: string;
    [k: string]: unknown;
  };
} | {
  approve: {
    expires?: Expiration | null;
    spender: string;
    token_id: string;
    [k: string]: unknown;
  };
} | {
  revoke: {
    spender: string;
    token_id: string;
    [k: string]: unknown;
  };
} | {
  approve_all: {
    expires?: Expiration | null;
    operator: string;
    [k: string]: unknown;
  };
} | {
  revoke_all: {
    operator: string;
    [k: string]: unknown;
  };
} | {
  burn: {
    token_id: string;
    [k: string]: unknown;
  };
};
export type Binary = string;
export type Expiration = {
  at_height: number;
} | {
  at_time: Timestamp;
} | {
  never: {
    [k: string]: unknown;
  };
};
export type Timestamp = Uint64;
export type Uint64 = string;
export type QueryMsg = {
  proposed_new_owner: {};
} | {
  all_debt_shares: {
    limit?: number | null;
    start_after?: [string, string] | null;
  };
} | {
  owner_of: {
    include_expired?: boolean | null;
    token_id: string;
  };
} | {
  approval: {
    include_expired?: boolean | null;
    spender: string;
    token_id: string;
  };
} | {
  approvals: {
    include_expired?: boolean | null;
    token_id: string;
  };
} | {
  all_operators: {
    include_expired?: boolean | null;
    limit?: number | null;
    owner: string;
    start_after?: string | null;
  };
} | {
  num_tokens: {};
} | {
  contract_info: {};
} | {
  nft_info: {
    token_id: string;
  };
} | {
  all_nft_info: {
    include_expired?: boolean | null;
    token_id: string;
  };
} | {
  tokens: {
    limit?: number | null;
    owner: string;
    start_after?: string | null;
  };
} | {
  all_tokens: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  minter: {};
};
export type Uint128 = string;
export type ArrayOf_SharesResponseItem = SharesResponseItem[];
export interface SharesResponseItem {
  denom: string;
  shares: Uint128;
  token_id: string;
  [k: string]: unknown;
}
export interface AllNftInfoResponseForEmpty {
  access: OwnerOfResponse;
  info: NftInfoResponseForEmpty;
  [k: string]: unknown;
}
export interface OwnerOfResponse {
  approvals: Approval[];
  owner: string;
  [k: string]: unknown;
}
export interface Approval {
  expires: Expiration;
  spender: string;
  [k: string]: unknown;
}
export interface NftInfoResponseForEmpty {
  extension: Empty;
  token_uri?: string | null;
  [k: string]: unknown;
}
export interface Empty {
  [k: string]: unknown;
}
export interface OperatorsResponse {
  operators: Approval[];
  [k: string]: unknown;
}
export interface TokensResponse {
  tokens: string[];
  [k: string]: unknown;
}
export interface ApprovalResponse {
  approval: Approval;
  [k: string]: unknown;
}
export interface ApprovalsResponse {
  approvals: Approval[];
  [k: string]: unknown;
}
export interface ContractInfoResponse {
  name: string;
  symbol: string;
  [k: string]: unknown;
}
export interface MinterResponse {
  minter: string;
  [k: string]: unknown;
}
export interface NumTokensResponse {
  count: number;
  [k: string]: unknown;
}
export type String = string;