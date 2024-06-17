import { Buffer } from "buffer";

export const countAttributeValues = (data) => {
  const attributeCount = {};

  data.forEach((bear) => {
    bear.attributes.forEach((attr) => {
      const key = `${attr.trait_type}-${attr.value}`;
      if (attributeCount[key]) {
        attributeCount[key]++;
      } else {
        attributeCount[key] = 1;
      }
    });
  });

  return attributeCount;
};

export const calculateRarityPercentages = (attributeCount, totalWaterBears) => {
  const rarityPercentages = {};

  for (const key in attributeCount) {
    rarityPercentages[key] = (attributeCount[key] / totalWaterBears) * 100;
  }

  return rarityPercentages;
};

export const getRarityForWaterBear = (data, waterBearName) => {
  const totalWaterBears = data.length;
  const attributeCount = countAttributeValues(data);
  const rarityPercentages = calculateRarityPercentages(
    attributeCount,
    totalWaterBears
  );

  const waterBear = data.find((bear) => bear.name === waterBearName);
  if (!waterBear) {
    return `WaterBear with name ${waterBearName} not found.`;
  }

  const rarityForWaterBear = {};

  waterBear.attributes.forEach((attr) => {
    const key = `${attr.trait_type}-${attr.value}`;
    rarityForWaterBear[key] = rarityPercentages[key] || 0;
  });

  const sortedKeys = Object.keys(rarityForWaterBear).sort();

  const sortedRarity = {};
  sortedKeys.forEach((key) => {
    sortedRarity[key] = rarityForWaterBear[key];
  });

  return sortedRarity;
};

export const extractNumber = (str) => {
  const match = str.match(/_(\d+)>/);
  return match ? parseInt(match[1], 10) : null;
};

export const getAllAttributes = (data) => {
  const allAttributes = new Set();

  data.forEach((bear) => {
    bear.attributes.forEach((attr) => {
      allAttributes.add(attr.trait_type);
    });
  });

  return Array.from(allAttributes);
};

export const countAttributeValuesWithEmpty = (data) => {
  const attributeCount = {};

  data.forEach((bear) => {
    bear.attributes.forEach((attr) => {
      const key = `${attr.trait_type}-${attr.value}`;
      attributeCount[key] = attributeCount[key] ? attributeCount[key] + 1 : 1;
    });
  });

  return attributeCount;
};

export const calculateRarityPercentagesWithEmpty = (
  attributeCount,
  totalWaterBears
) => {
  const rarityPercentages = {};

  for (const key in attributeCount) {
    rarityPercentages[key] = (attributeCount[key] / totalWaterBears) * 100;
  }

  return rarityPercentages;
};

export const calculateRarityAcrossAll = (data) => {
  const totalWaterBears = data.length;
  const attributeCount = countAttributeValuesWithEmpty(data);
  const rarityPercentages = calculateRarityPercentagesWithEmpty(
    attributeCount,
    totalWaterBears
  );

  return rarityPercentages;
};

export const calculateRarityValue = (bear, rarityPercentages) => {
  const rarityValues = bear.attributes.map((attr) => {
    const key = `${attr.trait_type}-${attr.value}`;
    return rarityPercentages[key] || 0;
  });

  const rarityProduct = rarityValues.reduce(
    (total, rarity) => total * rarity,
    1
  );
  return rarityProduct;
};

export const calculateRarityValueForAll = (data, rarityPercentages) => {
  const rarityValues = {};

  data.forEach((bear) => {
    const rarityValue = calculateRarityValue(bear, rarityPercentages);
    rarityValues[bear.name] = rarityValue;
  });

  const rarityEntries = Object.entries(rarityValues);

  rarityEntries.sort(([, a], [, b]) => a - b);

  const sortedRarity = rarityEntries.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

  return sortedRarity;
};

export const getRankForWaterBearInSortedRarity = (
  sortedRarity,
  waterBearName
) => {
  const sortedKeys = Object.keys(sortedRarity);
  const rank = sortedKeys.indexOf(waterBearName) + 1;
  return rank;
};

export const encodeName = (text) => {
  const encoder = new TextEncoder();
  const encodedText = encoder
    .encode(text)
    .reduce((acc, val) => acc + ("0" + val.toString(16)).slice(-2), "");
  return encodedText + "787284";
};
