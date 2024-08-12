export const TransactionManifests = ({
    waterBearComponent,
    stakePoolComponent,
    waterBearResource,
    waterBearStakeIdResource,
    dnaResource,
    testTubeComponent,
    oldWaterBearStakeIdResource,
    oldStakePoolComponent,
    sludgeComponent,
    testTubeResource,
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
${id.map(x => `
            NonFungibleLocalId("${x}"),
`).join('')}
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
        Array<NonFungibleLocalId>(
${id.map(x => `
            NonFungibleLocalId("${x}"),
`).join('')}
        )
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

    const withdrawOldWaterBear = ({ accountAddress, id, waterBearStakeId }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${oldWaterBearStakeIdResource}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${waterBearStakeId}")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("proof_1")
    ;
    CALL_METHOD
        Address("${oldStakePoolComponent}")
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

    const claimOldRewards = ({ accountAddress, waterBearStakeId }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "create_proof_of_non_fungibles"
        Address("${oldWaterBearStakeIdResource}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${waterBearStakeId}")
        )
    ;
    POP_FROM_AUTH_ZONE
        Proof("proof")
    ;
    CALL_METHOD
        Address("${oldStakePoolComponent}")
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

    const buySludge = ({ accountAddress, xrdAddress, amount }) => {
        const transactionManifest = `
    CALL_METHOD
        Address("${accountAddress}")
        "withdraw"
        Address("${xrdAddress}")
        Decimal("${169 * amount}")
    ;
    TAKE_ALL_FROM_WORKTOP
        Address("${xrdAddress}")
        Bucket("nft_bucket")
    ;
    CALL_METHOD
        Address("${sludgeComponent}")
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

    const breedBaby = ({ accountAddress, id }) => {
        const transactionManifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw_non_fungibles"
            Address("${testTubeResource}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${id}")
            )
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${testTubeResource}")
            Bucket("bucket")
        ;
        CALL_METHOD
            Address("${waterBearComponent}")
            "breed"
            Bucket("bucket")
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

    const bid = ({
        auctionComponent, 
        accountAddress, 
        bidToken, 
        amount,
    }) => {
        const transactionManifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${bidToken}")
            Decimal("${amount}")
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${bidToken}")
            Bucket("bucket")
        ;
        CALL_METHOD
            Address("${auctionComponent}")
            "bid"
            Bucket("bucket")
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

    const increaseBid = ({
        auctionComponent,
        accountAddress,
        bidToken,
        amount,
        bidBadgeResource,
        bidBadgeId,
    }) => {
        const transactionManifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${bidToken}")
            Decimal("${amount}")
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${bidToken}")
            Bucket("bucket")
        ;
        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${bidBadgeResource}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${bidBadgeId}")
            )
        ;
        POP_FROM_AUTH_ZONE
            Proof("proof")
        ;
        CALL_METHOD
            Address("${auctionComponent}")
            "increase_bid"
            Bucket("bucket")
            Proof("proof")
        ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    const claimRewardNft = ({
        auctionComponent,
        accountAddress,
        bidBadgeResource,
        bidBadgeId,
    }) => {
        const transactionManifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw_non_fungibles"
            Address("${bidBadgeResource}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${bidBadgeId}")
            )
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${bidBadgeResource}")
            Bucket("bucket")
        ;
        CALL_METHOD
            Address("${auctionComponent}")
            "claim_nfts"
            Bucket("bucket")
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

    const claimFunds = ({
        auctionComponent,
        accountAddress,
        bidBadgeResource,
        bidBadgeId,
    }) => {
        const transactionManifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw_non_fungibles"
            Address("${bidBadgeResource}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${bidBadgeId}")
            )
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${bidBadgeResource}")
            Bucket("bucket")
        ;
        CALL_METHOD
            Address("${auctionComponent}")
            "cancel_bid"
            Bucket("bucket")
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

    return {
        buyWaterBear,
        stakeWaterBear,
        claimOldRewards,
        claimRewards,
        withdrawWaterBear,
        withdrawOldWaterBear,
        createStakingId,
        buyTestTube,
        buySludge,
        breedBaby,
        bid,
        increaseBid,
        claimRewardNft,
        claimFunds,
    }
}
