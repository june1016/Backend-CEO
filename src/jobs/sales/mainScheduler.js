import cron from 'node-cron';

import { getAllUsers } from '../../app/services/userService.js';
import { simulateSalesForUser } from './simulateUserSales.js';


const runSalesScheduler = (io) => {
  cron.schedule('* * * * *', async () => {
    const users = await getAllUsers();

    users.forEach(user => {
      const delay = Math.floor(Math.random() * 30000);

      setTimeout(() => {
        simulateSalesForUser(user);
      }, delay);
    });

    io.emit('salesUpdated');
  });
};

export default runSalesScheduler;
