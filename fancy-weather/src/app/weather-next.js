const weaterNextF = (tMax, tMin) => Math.round((tMax + tMin) / 2);

const weaterNextC = (tMax, tMin) => Math.round((((tMax + tMin) / 2 - 32) * 5) / 9);

export { weaterNextF, weaterNextC };
