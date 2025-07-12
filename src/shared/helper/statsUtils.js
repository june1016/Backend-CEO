import Clients from "../../app/models/client.js";

export const getPoissonRandom = (lambda) => {
  const L = Math.exp(-lambda);
  let p = 1.0;
  let k = 0;

  do {
    k++;
    p *= Math.random();
  } while (p > L);

  return k - 1;
};

export const getRandomClient = async () => {
  const clients = await Clients.findAll({ logging: false });

  if (!clients.length) return null;

  const randomIndex = Math.floor(Math.random() * clients.length);
  return clients[randomIndex];
};

export const adjustLambdaByPrice = (baseLambda, unitCost) => {
  const averageCost = 100000;
  return baseLambda * (averageCost / unitCost);
};

export const quantityWeights = [
  { quantity: 1, weight: 30 },
  { quantity: 2, weight: 25 },
  { quantity: 3, weight: 20 },
  { quantity: 4, weight: 10 },
  { quantity: 5, weight: 7 },
  { quantity: 6, weight: 4 },
  { quantity: 7, weight: 2 },
  { quantity: 8, weight: 1 },
  { quantity: 9, weight: 0.5 },
  { quantity: 10, weight: 0.5 }
];