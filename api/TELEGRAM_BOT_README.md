# Telegram Bot Setup and Usage

This document describes the Telegram bot integration for receiving application notifications.

## Features

- 🔐 Password-protected bot authentication
- 📧 Automatic notifications for new application submissions
- 🖼 Product image attachments when available
- 👥 Multi-user support
- ✅ Enable/disable notifications per user

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
5. Copy the bot username (looks like: `your_bot_username`)

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the Telegram configuration:

```bash
cd api
cp .env.example .env
```

Edit `.env` file and set:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your-actual-bot-token-here
TELEGRAM_BOT_USERNAME=your_bot_username
TELEGRAM_BOT_PASSWORD=your-secure-password-here
```

⚠️ **Important**: Use a strong password and keep it secret!

### 3. Install Dependencies

```bash
cd api
composer install
```

### 4. Update Database

Run the database migrations to create the required tables:

```sql
-- telegram_users table
-- applications table
```

Or if using Docker:

```bash
docker-compose down
docker-compose up -d
```

The tables will be created automatically from `docker/mysql/init.sql`.

## Running the Bot

You have two options to run the bot:

### Option 1: Long Polling (Recommended for Development)

Run the bot in the foreground:

```bash
cd api
php bot.php
```

The bot will continuously poll for updates. Press `Ctrl+C` to stop.

### Option 2: Webhook (Recommended for Production)

1. Update `.env` with your webhook URL:

```env
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/webhook
```

2. Set the webhook:

```bash
php set_webhook.php
```

3. The webhook is automatically available at `/webhook` endpoint

4. To switch back to polling, delete the webhook:

```bash
php delete_webhook.php
```

## User Guide

### For Telegram Users

#### 1. Start the Bot

Open Telegram and find your bot by username (e.g., `@your_bot_username`)

#### 2. Authenticate

Send the start command with the password:

```
/start your-password-here
```

If the password is correct, you'll receive a confirmation message.

#### 3. Receive Notifications

Once authenticated, you'll automatically receive notifications when someone submits an application through the website.

#### 4. Commands

- `/start <password>` - Authenticate and subscribe to notifications
- `/stop` - Disable notifications
- `/help` - Show available commands

### Notification Format

When a new application is submitted, you'll receive a message like:

```
🆕 Новая заявка

📧 Email: user@example.com
👤 Имя: Иван Петров
🏙 Город: Москва
📝 Описание: Нужна мебель для офиса
🛒 Готов оформить заказ: ✅ Да

🛋 Товар: Офисный стол
📄 Описание товара: Современный офисный стол

⏰ Дата: 2026-01-12 15:30:45
```

If the application includes a product with an image, the image will be attached.

## API Endpoint

### Submit Application

**Endpoint:** `POST /applications`

**Request Body:**

```json
{
  "email": "user@example.com",
  "fullName": "Иван Петров",
  "city": "Москва",
  "description": "Нужна мебель для офиса",
  "readyToOrder": true,
  "productId": 5
}
```

**Fields:**

- `email` (required) - User's email address
- `fullName` (required) - User's full name
- `city` (required) - User's city
- `description` (required) - Application description
- `readyToOrder` (optional, default: false) - Whether user is ready to place an order
- `productId` (optional) - ID of the product the user is interested in

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "Иван Петров",
  "city": "Москва",
  "description": "Нужна мебель для офиса",
  "readyToOrder": true,
  "productId": 5,
  "createdAt": "2026-01-12 15:30:45"
}
```

### Admin Endpoints (Requires JWT Authentication)

- `GET /admin/applications` - List all applications
- `GET /admin/applications/{id}` - View specific application
- `DELETE /admin/applications/{id}` - Delete application

## Database Schema

### telegram_users

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| chat_id | BIGINT | Telegram chat ID (unique) |
| username | VARCHAR(255) | Telegram username |
| first_name | VARCHAR(255) | User's first name |
| last_name | VARCHAR(255) | User's last name |
| is_active | TINYINT(1) | Whether notifications are enabled |
| created_at | TIMESTAMP | When user was added |
| updated_at | TIMESTAMP | Last update time |

### applications

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| email | VARCHAR(255) | User's email |
| full_name | VARCHAR(255) | User's full name |
| city | VARCHAR(255) | User's city |
| description | TEXT | Application description |
| ready_to_order | TINYINT(1) | Ready to place order |
| product_id | INT | Related product ID (nullable) |
| created_at | TIMESTAMP | Submission time |
| updated_at | TIMESTAMP | Last update time |

## Troubleshooting

### Bot not receiving updates

1. Check if the bot is running: `ps aux | grep bot.php`
2. Check bot logs in `logs/app.log`
3. Verify bot token and username in `.env`
4. Delete webhook if using polling: `php delete_webhook.php`

### Users not receiving notifications

1. Verify users are in the database: `SELECT * FROM telegram_users WHERE is_active = 1`
2. Check `is_active` status
3. Review application logs for errors

### Database connection errors

1. Verify database credentials in `.env`
2. Ensure database is running
3. Check if tables exist: `SHOW TABLES;`

## Security Notes

- ⚠️ Keep your `.env` file secure and never commit it to version control
- 🔒 Use a strong, unique password for bot authentication
- 🛡️ The bot password is required for users to authenticate
- 🚫 Users can disable notifications at any time with `/stop`

## Development

### File Structure

```
api/
├── src/
│   ├── Domain/
│   │   ├── Application/          # Application domain model
│   │   └── TelegramUser/         # Telegram user domain model
│   ├── Infrastructure/
│   │   ├── Persistence/
│   │   │   ├── Application/      # Database repository
│   │   │   └── TelegramUser/     # Database repository
│   │   └── Telegram/
│   │       ├── Commands/         # Bot commands
│   │       │   ├── StartCommand.php
│   │       │   ├── StopCommand.php
│   │       │   └── HelpCommand.php
│   │       └── TelegramBotService.php
│   └── Application/
│       └── Actions/
│           └── Application/      # API actions
├── bot.php                       # Long polling script
├── webhook.php                   # Webhook handler
├── set_webhook.php              # Webhook setup
└── delete_webhook.php           # Webhook deletion
```

## Support

For issues or questions, please check the application logs:

```bash
tail -f api/logs/app.log
```
