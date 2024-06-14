export const TransactionManifests = ({
    waterBearComponent,
    stakePoolComponent,
    waterBearResource,
    waterBearStakeIdResource,
    dnaResource,
    testTubeComponent
}) => {
    const buyWaterBear = ({ accountAddress, xrdAddress, amount }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "withdraw"
        Address("${xrdAddress}")
        Decimal("${45 * amount}")
    ;
    TAKE_ALL_FROM_WORKTOP
        Address("${xrdAddress}")
        Bucket("nft_bucket")
    ;
    CALL_METHOD
        Address("${waterBearComponent}")
        "buy_nft"
        Bucket("nft_bucket")
        Decimal("${amount}")
    ;
    CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    const stakeWaterBear = ({ accountAddress, id, waterBearStakeId }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${waterBearStakeIdResource}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${waterBearStakeId}")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("proof_1")
    ;
    CALL_METHOD
        Address("${accountAddress}")
        "withdraw_non_fungibles"
        Address("${waterBearResource}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${id}")
        )
    ;
    TAKE_ALL_FROM_WORKTOP
        Address("${waterBearResource}")
        Bucket("nft_bucket_1")
    ;
    CALL_METHOD
        Address("${stakePoolComponent}")
        "stake"
        Bucket("nft_bucket_1")
        Proof("proof_1")
    ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    const withdrawWaterBear = ({ accountAddress, id, waterBearStakeId }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${waterBearStakeIdResource}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${waterBearStakeId}")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("proof_1")
    ;
    CALL_METHOD
        Address("${stakePoolComponent}")
        "withdraw"
        NonFungibleLocalId("${id}")
        Proof("proof_1")
    ;
    CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    const claimRewards = ({ accountAddress, waterBearStakeId }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${waterBearStakeIdResource}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${waterBearStakeId}")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("proof")
    ;
    CALL_METHOD
        Address("${stakePoolComponent}")
        "claim_rewards"
        Proof("proof")
    ;
    CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    const createStakingId = ({ accountAddress }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${stakePoolComponent}")
        "create_id"
    ;
    CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    const buyTestTube = ({ accountAddress, id1, id2, amount }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${waterBearResource}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${id1}"),
            NonFungibleLocalId("${id2}")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("proof_1")
    ;
    CALL_METHOD
        Address("${accountAddress}")
        "withdraw"
        Address("${dnaResource}")
        Decimal("${300 * amount}")
    ;
    TAKE_ALL_FROM_WORKTOP
        Address("${dnaResource}")
        Bucket("bucket")
    ;
    CALL_METHOD
        Address("${testTubeComponent}")
        "buy_nft"
        Bucket("bucket")
        Decimal("${amount}")
        Proof("proof_1")
    ;
    CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    return { buyWaterBear, stakeWaterBear, claimRewards, withdrawWaterBear, createStakingId, buyTestTube }
}
