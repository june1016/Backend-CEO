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