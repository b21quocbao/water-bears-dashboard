import { RadixNetworkConfig } from '@radixdlt/radix-dapp-toolkit';

const network = RadixNetworkConfig["Mainnet"];

if (!network) throw new Error('Invalid network')

const networkConfig = {
  Mainnet: {
    dAppDefinitionAddress:
      'account_rdx12xuv9umzdhmtmdumtfcvt2mgu2gw3zgl6hnt08vvvsfphvj7tcqv3n',
    addresses: {
      waterBearComponent:
        'component_rdx1czkg9u5ap0dpdklz9llqq6arer2ned5jj06y7dweu6yj9m0u9ejys2',
      waterBearResource:
        'resource_rdx1nguyesjve2e0wql8d9cepx7u63jtevdg05a7n5fc5m767mn4vkxpeq',

      stakePoolComponent:
        'component_rdx1cqthlhz89njtzgp6zrmm93dyej3ll2fq6yrq0yfj2j99d7tpsxtgc7',
      waterBearStakeIdResource:
        'resource_rdx1ng5tup3hhugln0ajlu3pdvl6t7l26qe2laz9wkfatxwkp6rpe0vdf4',
      dnaResource:
        'resource_rdx1th9txt2hxdlc740ypf9uj8ghgwwmhf7wdnxafhxa3uxmmus56nusxs',

      testTubeComponent:
        'component_rdx1cztegh0j733zgv452uhe4avthvxu5ld00fer77awt05a87h98zkkn8',
    },
  },
  Stokenet: {
    dAppDefinitionAddress:
      'account_tdx_2_12yuarmrpvd9kkl99qqk6czw8xf6rzg6h80nf7xa7gdf0fegk49a30s',
    addresses: {
      waterBearComponent:
        'component_tdx_2_1crlhtxmur02mz25ly9g682z00daxw0nrlkr6vj0jccdntpkrg4r5ap',
      waterBearStakeIdResource:
        'resource_tdx_2_1ntr9s8ea8m6k5dqe6hlw8wh9cl9vpjf37me7upsc33paws5s9j6hug',
      stakePoolComponent:
        'component_tdx_2_1crqntmap3fztduqaxug0ne3xzwd2mpf2yn9uvp9y65jaslz8jvjz0v',
      waterBearResource:
        'resource_tdx_2_1n2k6qtnlvl65dhhlf45sjn5uwzxmf7ny9qnezv7v8c47pyhvtua7y9',
      dnaResource:
        'resource_tdx_2_1th9lefh8vkxc428kthlneedvrytvnxcm20hgjrhjts0sklc650j0z5',
      testTubeComponent:
        'component_tdx_2_1cqcdpckfc5h9ym9wtwp3wr6tkys0cckw6eap3qawur5fv5wn8hak65',
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
