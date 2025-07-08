const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');
const Database = require('./src/database/database');
const AppointmentController = require('./src/controllers/appointmentController');
const OrderController = require('./src/controllers/orderController');
const ClientController = require('./src/controllers/clientController');
const RevenueController = require('./src/controllers/revenueController');

let mainWindow;
let server;
const PORT = 3001;

// Initialize Express server for API
function createServer() {
  const expressApp = express();
  
  expressApp.use(cors());
  expressApp.use(express.json());
  expressApp.use(express.static(path.join(__dirname, 'renderer')));

  // Initialize database
  const db = new Database();
  db.init();

  // Initialize controllers
  const appointmentController = new AppointmentController(db);
  const orderController = new OrderController(db);
  const clientController = new ClientController(db);
  const revenueController = new RevenueController(db);

  // API Routes
  // Appointments
  expressApp.get('/api/appointments', appointmentController.getAllAppointments.bind(appointmentController));
  expressApp.post('/api/appointments', appointmentController.createAppointment.bind(appointmentController));
  expressApp.put('/api/appointments/:id', appointmentController.updateAppointment.bind(appointmentController));
  expressApp.delete('/api/appointments/:id', appointmentController.deleteAppointment.bind(appointmentController));

  // Orders
  expressApp.get('/api/orders', orderController.getAllOrders.bind(orderController));
  expressApp.post('/api/orders', orderController.createOrder.bind(orderController));
  expressApp.put('/api/orders/:id', orderController.updateOrder.bind(orderController));
  expressApp.delete('/api/orders/:id', orderController.deleteOrder.bind(orderController));
  expressApp.get('/api/orders/overdue', orderController.getOverdueOrders.bind(orderController));

  // Clients
  expressApp.get('/api/clients', clientController.getAllClients.bind(clientController));
  expressApp.post('/api/clients', clientController.createClient.bind(clientController));
  expressApp.put('/api/clients/:id', clientController.updateClient.bind(clientController));
  expressApp.delete('/api/clients/:id', clientController.deleteClient.bind(clientController));

  // Revenue
  expressApp.get('/api/revenue', revenueController.getRevenueData.bind(revenueController));
  expressApp.post('/api/revenue', revenueController.addRevenueEntry.bind(revenueController));
  expressApp.get('/api/revenue/reports', revenueController.generateReport.bind(revenueController));
  expressApp.get('/api/revenue/dashboard-stats', revenueController.getDashboardStats.bind(revenueController));

  server = expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    title: 'Jewelry Order Management'
  });

  // Load the main page
  mainWindow.loadURL(`http://localhost:${PORT}`);

  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (server) {
    server.close();
  }
});

// IPC handlers for file operations
ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.filePaths[0];
});

ipcMain.handle('export-data', async (event, data) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: 'CSV Files', extensions: ['csv'] },
      { name: 'JSON Files', extensions: ['json'] }
    ]
  });
  return result.filePath;
}); 