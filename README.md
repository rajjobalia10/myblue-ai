# BlueOcean AI - Next.js App with Sidebar

A modern AI chat interface built with Next.js, TypeScript, and Tailwind CSS featuring a responsive sidebar layout.

## Features

### Sidebar Component
- **Fixed 280px width** on desktop, full viewport height
- **New Chat button** with plus icon for starting conversations
- **Chats section** with conversation history
- **Responsive design** - collapses to icon-only mode on mobile (<768px)
- **Dark theme** with hover effects and smooth transitions
- **Scrollable chat list** with custom scrollbar styling

### Layout Integration
- **Proper spacing** - main content shifts right by 280px on desktop
- **Vertical centering** maintained for hero section
- **Mobile-first responsive** design with overlay and transitions
- **TypeScript interfaces** for type safety

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## File Structure

```
├── components/
│   ├── Sidebar.tsx          # Main sidebar component
│   └── Layout.tsx           # Layout wrapper with sidebar integration
├── pages/
│   ├── _app.tsx            # Next.js app wrapper
│   └── index.tsx           # Home page with hero section
├── styles/
│   └── globals.css         # Global styles and Tailwind imports
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## Key Components

### Sidebar.tsx
- **Props**: `chats`, `currentChatId`, `onNewChat`, `onSelectChat`, `onDeleteChat`
- **Features**: Responsive collapse, chat history, hover effects
- **Styling**: Dark theme (#1A1B1E), hover states (#2C2F33)

### Layout.tsx
- **Purpose**: Wraps all pages with sidebar
- **State Management**: Handles chat selection and new chat creation
- **Responsive**: Adjusts content area based on sidebar state

### useChats Hook
- **Mock Data**: Provides sample chat history
- **TODO**: Replace with real state management (Redux, Zustand, etc.)

## Customization

### Colors
The sidebar uses custom colors defined in `tailwind.config.js`:
- `sidebar-bg`: #1A1B1E (main background)
- `sidebar-hover`: #2C2F33 (hover states)
- `sidebar-border`: #3A3D42 (borders)

### Responsive Breakpoints
- **Desktop**: Full sidebar (280px width)
- **Mobile**: Collapsed sidebar (64px width) with overlay

## Integration Notes

### State Management
Currently uses mock data. To integrate with real state:

1. Replace `useChats` hook with your state management
2. Update `handleNewChat`, `handleSelectChat`, `handleDeleteChat` functions
3. Connect to your chat API or local storage

### Styling
- Uses Tailwind CSS with custom configuration
- Responsive design with mobile-first approach
- Smooth transitions and hover effects
- Custom scrollbar styling for chat list

## Browser Support
- Chrome, Firefox, Safari, Edge
- Mobile responsive (iOS Safari, Chrome Mobile)
- Cross-browser centering fixes applied

## Next Steps
1. Replace mock data with real chat state management
2. Add chat persistence (localStorage, database)
3. Implement real-time chat functionality
4. Add user authentication
5. Customize sidebar appearance and behavior
