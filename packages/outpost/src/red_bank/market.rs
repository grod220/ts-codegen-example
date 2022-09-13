use cosmwasm_std::{Decimal, Uint128};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Market {
    pub denom: String,
    pub max_loan_to_value: Decimal,
    pub liquidation_threshold: Decimal,
    pub liquidation_bonus: Decimal,
    pub reserve_factor: Decimal,
    pub borrow_index: Decimal,
    pub liquidity_index: Decimal,
    pub borrow_rate: Decimal,
    pub liquidity_rate: Decimal,
    pub indexes_last_updated: u64,
    pub debt_total_scaled: Uint128,
    pub deposit_enabled: bool,
    pub borrow_enabled: bool,
    pub deposit_cap: Uint128,
}

impl Default for Market {
    fn default() -> Self {
        Market {
            denom: "".to_string(),
            borrow_index: Decimal::one(),
            liquidity_index: Decimal::one(),
            borrow_rate: Decimal::zero(),
            liquidity_rate: Decimal::zero(),
            max_loan_to_value: Decimal::zero(),
            reserve_factor: Decimal::zero(),
            indexes_last_updated: 0,
            debt_total_scaled: Uint128::zero(),
            liquidation_threshold: Decimal::one(),
            liquidation_bonus: Decimal::zero(),
            deposit_enabled: true,
            borrow_enabled: true,
            deposit_cap: Uint128::MAX,
        }
    }
}
