import { RadixNetworkConfig } from '@radixdlt/radix-dapp-toolkit';

const network = RadixNetworkConfig["Stokenet"];

if (!network) throw new Error('Invalid network')

const networkConfig = {
  Mainnet: {
    dAppDefinitionAddress:
      'account_rdx12x2n7jr3cg5dduen9e9sshlkw7uz962jr05erlcxp56pkt04rzv476',
    addresses: {
      waterBearComponent:
        'component_rdx1cz8sufk6wunsnnnh5ckrhrn3n6stl4ve6dctrphaa8zf3q06kle6hv',
      waterBearStakeIdResource:
        'resource_rdx1ngzqt45zkhrrhetevsuhhnp09fvh6sa86gfskx7wekme7qntg87yrm',
      stakePoolComponent:
        'component_rdx1cz8sufk6wunsnnnh5ckrhrn3n6stl4ve6dctrphaa8zf3q06kle6hv',
      waterBearResource:
        'resource_rdx1ngzqt45zkhrrhetevsuhhnp09fvh6sa86gfskx7wekme7qntg87yrm',
    },
  },
  Stokenet: {
    dAppDefinitionAddress:
      'account_tdx_2_12yuarmrpvd9kkl99qqk6czw8xf6rzg6h80nf7xa7gdf0fegk49a30s',
    addresses: {
      waterBearComponent:
        'component_tdx_2_1cqh6ktv53ktlq9fcjwmerh55jee86qyg23w9avfl6vk04nmlzqlc7g',
      waterBearStakeIdResource:
        'resource_tdx_2_1nfk3devv4zat0dgn0q00v9fe0ggpmkuaeq8wtzl662m60wuvs59dml',
      stakePoolComponent:
        'component_tdx_2_1cz5wzsgmcwwhx4vl5e70jtenjn9mf28hyxn8ung2kwmlkdutttl5s2',
      waterBearResource:
        'resource_tdx_2_1n2khts5x5l632l9ehtm0724erlh8rmch0xu7fq5q8mrfcsftnkvj89',
    },
  },
}[network.networkName]

if (!networkConfig)
  throw new Error(
    `Could not find addresses for network: ${network.networkName}`
  )

export const config = {
  network,
  ...networkConfig,
}

console.log(JSON.stringify(config, null, 2))
