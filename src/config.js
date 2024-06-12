import { RadixNetworkConfig } from '@radixdlt/radix-dapp-toolkit';

const network = RadixNetworkConfig["Stokenet"];

if (!network) throw new Error('Invalid network')

const networkConfig = {
  Mainnet: {
    dAppDefinitionAddress:
      'account_rdx12x2n7jr3cg5dduen9e9sshlkw7uz962jr05erlcxp56pkt04rzv476',
    addresses: {
      waterBearComponent:
        'component_tdx_2_1crlhtxmur02mz25ly9g682z00daxw0nrlkr6vj0jccdntpkrg4r5ap',
      waterBearStakeIdResource:
        'resource_tdx_2_1n2vxkq7vp9fkmg3y9jvz2g799q6xqd534ypv5t0lk5clsmctdkjnv7',
      stakePoolComponent:
        'component_tdx_2_1cpum0hydfllv5r9ar48qwc0tctpz806yg8k9rhukgmtt5y38ku7xg4',
      waterBearResource:
        'resource_tdx_2_1n2k6qtnlvl65dhhlf45sjn5uwzxmf7ny9qnezv7v8c47pyhvtua7y9',
      dnaResource:
        'resource_tdx_2_1th9lefh8vkxc428kthlneedvrytvnxcm20hgjrhjts0sklc650j0z5',
      testTubeComponent:
        'component_tdx_2_1cqcdpckfc5h9ym9wtwp3wr6tkys0cckw6eap3qawur5fv5wn8hak65',
    },
  },
  Stokenet: {
    dAppDefinitionAddress:
      'account_tdx_2_12yuarmrpvd9kkl99qqk6czw8xf6rzg6h80nf7xa7gdf0fegk49a30s',
    addresses: {
      waterBearComponent:
        'component_tdx_2_1crlhtxmur02mz25ly9g682z00daxw0nrlkr6vj0jccdntpkrg4r5ap',
      waterBearStakeIdResource:
        'resource_tdx_2_1n2vxkq7vp9fkmg3y9jvz2g799q6xqd534ypv5t0lk5clsmctdkjnv7',
      stakePoolComponent:
        'component_tdx_2_1cpum0hydfllv5r9ar48qwc0tctpz806yg8k9rhukgmtt5y38ku7xg4',
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
