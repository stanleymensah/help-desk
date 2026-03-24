# Helpdesk App Folder Structure

```
helpdesk-app/
├── public/
│   ├── favicon.ico
│   └── logo.png
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── empty-state.svg
│   │   │   └── avatar-placeholder.png
│   │   └── icons/
│   │       ├── ticket.svg
│   │       └── notification.svg
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── tickets/
│   │   │   ├── TicketCard.jsx
│   │   │   ├── TicketList.jsx
│   │   │   ├── TicketDetails.jsx
│   │   │   ├── TicketForm.jsx
│   │   │   ├── TicketFilters.jsx
│   │   │   └── TicketStatus.jsx
│   │   │
│   │   ├── messages/
│   │   │   ├── MessageList.jsx
│   │   │   ├── MessageItem.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── FileAttachment.jsx
│   │   │
│   │   └── users/
│   │       ├── UserProfile.jsx
│   │       ├── UserList.jsx
│   │       └── UserCard.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   └── RecentActivity.jsx
│   │   │
│   │   ├── tickets/
│   │   │   ├── TicketsPage.jsx
│   │   │   ├── TicketDetailPage.jsx
│   │   │   └── CreateTicketPage.jsx
│   │   │
│   │   ├── settings/
│   │   │   ├── Settings.jsx
│   │   │   ├── ProfileSettings.jsx
│   │   │   └── NotificationSettings.jsx
│   │   │
│   │   └── NotFound.jsx
│   │
│   ├── hooks/
│   │   ├── useForm.js
│   │   ├── useTickets.js
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   ├── useModal.js
│   │   └── useNotifications.js
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── ticketService.js
│   │   ├── userService.js
│   │   └── fileUploadService.js
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── validation.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── routes/
│   │   ├── index.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── styles/
│   │   ├── index.css
│   │   ├── variables.css
│   │   └── utilities.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── jsconfig.json
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Folder Descriptions

### `public/`
Static assets that don't go through the build process (favicon, logos, etc.)

### `src/assets/`
Images, icons, and other media files used in the app

### `src/components/`
Reusable UI components organized by domain:
- **common/** - Generic reusable components (buttons, inputs, modals)
- **layout/** - Layout components (navbar, sidebar, footer)
- **tickets/** - Ticket-specific components
- **messages/** - Message/chat components
- **users/** - User-related components

### `src/pages/`
Full page views that map to routes:
- **auth/** - Login, register, password reset pages
- **dashboard/** - Main dashboard and stats
- **tickets/** - Ticket management pages
- **settings/** - User settings and preferences

### `src/hooks/`
Custom React hooks for reusable logic (forms, API calls, auth, etc.)

### `src/services/`
API calls and external service integrations (all fetch/axios calls go here)

### `src/utils/`
Pure utility functions (date formatting, validation, constants, helpers)

### `src/routes/`
Route configuration and route guards (protected routes, public routes)

### `src/styles/`
Global CSS files, variables, and utility classes

## Key Files

- **App.jsx** - Main app component with router, query client, and toasts
- **main.jsx** - Entry point that renders App into the DOM
- **vite.config.js** - Vite configuration (aliases, plugins)
- **tailwind.config.js** - Tailwind CSS configuration
- **jsconfig.json** - JavaScript configuration for import aliases
- **package.json** - Dependencies and scripts

## Development Workflow

1. Start with routes and basic pages
2. Build layout components (navbar, sidebar, footer)
3. Build service functions for API calls
4. Create custom hooks for state management
5. Build page-specific components
6. Add reusable common components as needed
