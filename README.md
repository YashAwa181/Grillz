# Jewelry Order Management System

A comprehensive desktop application for managing jewelry business operations, including client appointments, custom orders, revenue tracking, and client management.

## Features

### 🗓️ Appointment Management
- Schedule and manage client appointments
- Calendar integration
- Appointment status tracking
- Client notifications

### 📦 Order Tracking
- Create and track custom jewelry orders
- Unique order IDs for each project
- Status tracking (Not Started, In Progress, Completed)
- Priority levels and due dates
- Order history and progress updates

### 👥 Client Management
- Comprehensive client database
- Client appointment and order history
- Contact information management
- Client search and filtering

### 💰 Revenue Management
- Track income and expenses
- Profit calculation per order
- Monthly and yearly reports
- Export functionality (CSV/JSON)
- Dashboard with financial insights

### 📊 Dashboard
- Real-time business overview
- Key performance indicators
- Recent activities
- Overdue order alerts

## Technology Stack

- **Frontend**: Electron.js (Desktop Application)
- **Backend**: Node.js with Express
- **Database**: SQLite (Local Storage)
- **UI Framework**: TailwindCSS
- **Icons**: Font Awesome

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Clone or navigate to the project directory**
   ```bash
   cd app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **For development mode (with DevTools)**
   ```bash
   npm run dev
   ```

## Project Structure

```
app/
├── main.js                 # Electron main process
├── preload.js             # Preload script for security
├── package.json           # Project dependencies and scripts
├── src/
│   ├── database/
│   │   └── database.js    # SQLite database setup and queries
│   └── controllers/
│       ├── appointmentController.js
│       ├── orderController.js
│       ├── clientController.js
│       └── revenueController.js
├── renderer/
│   ├── index.html         # Main application interface
│   ├── app.js            # Frontend JavaScript logic
│   └── styles.css        # Custom styles
└── data/                 # SQLite database files (auto-generated)
```

## Database Schema

### Clients Table
- `id` (Primary Key)
- `name`, `email`, `phone`, `address`, `notes`
- `created_at`, `updated_at`

### Appointments Table
- `id` (Primary Key)
- `client_id` (Foreign Key)
- `title`, `description`, `start_time`, `end_time`
- `status`, `notes`
- `created_at`, `updated_at`

### Orders Table
- `id` (Primary Key)
- `order_id` (Unique identifier)
- `client_id` (Foreign Key)
- `title`, `description`, `status`, `priority`
- `estimated_completion`, `actual_completion`
- `price`, `cost`, `profit`
- `notes`, `created_at`, `updated_at`

### Revenue Table
- `id` (Primary Key)
- `order_id` (Foreign Key)
- `type` (income/expense)
- `amount`, `description`, `date`
- `created_at`

### Order Status History Table
- `id` (Primary Key)
- `order_id` (Foreign Key)
- `status`, `notes`, `created_at`

## API Endpoints

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/overdue` - Get overdue orders

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client
- `GET /api/clients/search` - Search clients

### Revenue
- `GET /api/revenue` - Get revenue data
- `POST /api/revenue` - Add revenue entry
- `GET /api/revenue/reports` - Generate reports
- `GET /api/revenue/dashboard-stats` - Get dashboard statistics

## Usage Guide

### Getting Started
1. Launch the application
2. Start by adding clients to your database
3. Create appointments for client consultations
4. Create orders for custom jewelry pieces
5. Track revenue and expenses
6. Monitor your business through the dashboard

### Managing Appointments
- Click "Appointments" in the navigation
- Use "Add Appointment" to schedule new meetings
- Filter appointments by status or search by client name
- Edit or delete appointments as needed

### Managing Orders
- Click "Orders" in the navigation
- Create new orders with unique IDs
- Set priorities and estimated completion dates
- Update order status as work progresses
- Track overdue orders

### Managing Clients
- Click "Clients" in the navigation
- Add new clients with contact information
- View client history (appointments and orders)
- Search and filter clients

### Revenue Tracking
- Click "Revenue" in the navigation
- Add income and expense entries
- Link entries to specific orders
- Generate reports and export data
- View financial dashboard

## Development

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Database Backup
The SQLite database is stored in `data/jewelry_orders.db`. You can backup this file to preserve your data.

## Customization

### Adding New Features
1. Create new controller in `src/controllers/`
2. Add database tables in `src/database/database.js`
3. Update API routes in `main.js`
4. Add frontend components in `renderer/`

### Styling
- Modify `renderer/styles.css` for custom styles
- Uses TailwindCSS utility classes
- Custom CSS classes available for components

## Troubleshooting

### Common Issues

1. **Application won't start**
   - Check Node.js version (requires v14+)
   - Ensure all dependencies are installed
   - Check console for error messages

2. **Database errors**
   - Ensure write permissions in the app directory
   - Check if database file is corrupted
   - Restore from backup if necessary

3. **Port conflicts**
   - Default port is 3001
   - Change PORT constant in `main.js` if needed

### Support
For issues and feature requests, please check the project documentation or create an issue in the repository.

## License

This project is licensed under the MIT License.

## Future Enhancements

- Mobile app version (React Native)
- Cloud synchronization
- Calendar integration (Google Calendar, Outlook)
- Email notifications
- Advanced reporting and analytics
- Multi-user support
- Inventory management
- Customer portal 