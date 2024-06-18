import { BigNumber } from "bignumber.js"

export const transformFungibleTokens = async fungibles => {
  if (!fungibles || fungibles.items.length === 0) {
    return {}
  }

  return fungibles.items.reduce((acc, item) => {
    return {
      ...acc,
      [item.resource_address]: {
        type: "fungible",
        address: item.resource_address,
        value:
          item.vaults?.items
            .reduce((prev, next) => prev.plus(next.amount), new BigNumber(0))
            .toString() || "0"
      }
    }
  }, {})
}

export const transformNonFungibleTokens = async nonFungibles => {

  if (!nonFungibles || nonFungibles.items.length === 0) {
    return []
  }

  const transformedNonFungibles = []

  for (const nonFungible of nonFungibles.items) {
    for (const singleNftData of nonFungible.vaults.items) {
      for (const id of singleNftData.items || []) {
        transformedNonFungibles.push({
          type: "non-fungible",
          id: id,
          address: nonFungible.resource_address
        })
      }
    }
  }

  return transformedNonFungibles.reduce((acc, curr) => {
    const resourceManager = acc[curr.address] || []
    resourceManager.push(curr)
    return { ...acc, [curr.address]: resourceManager }
  }, {})
}
