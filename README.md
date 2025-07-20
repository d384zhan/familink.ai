# 🌟 Familink.ai – Strengthening Family Bonds with AI

![Familink Chat P### Configuration

⚠️ **SECURITY NOTE**: All API keys are now properly secured using environment variables.

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Copy `.env.example` to `.env` in the project root
4. Add your Firebase configuration values to `.env`

### OpenAI Setup (Optional)

1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Add `VITE_OPENAI_API_KEY=your_key_here` to your `.env` file
3. Without this, the app will use default conversation starterseenshots/chat.png)

Familink.ai is a modern web application designed to bring families closer through **personalized one-on-one interactions**. With daily AI-generated prompts, the app fosters meaningful conversations that evolve over time—helping family members stay connected in a way that feels natural and personal.

💬 **Currently, Familink.ai supports private 1-on-1 chats**, but we're building toward a future where families can engage in richer, more dynamic interactions.

---

## 🚀 Features

### ✅ One-on-One Chats

- 🔹 Private chat channels for deeper, meaningful conversations between family members
- 🔹 Real-time messaging with a clean, intuitive interface

### 🤖 Daily Personalized Prompts

- 🔹 Smart, evolving prompts tailored to each relationship
- 🔹 AI learns from past interactions to make conversations more relevant over time

### 🔒 Secure & Scalable

- 🔹 **Firebase** ensures **real-time updates** and **secure** data storage
- 🔹 Designed to be **fast, lightweight, and intuitive**

---

## 🛠 Tech Stack

Familink.ai is built with modern web technologies:

- 🎨 **Frontend**: React 18 + Vite – Fast, modern UI
- 🔥 **Database**: Firebase Firestore – Real-time data sync
- 🧠 **AI Integration**: OpenAI API – Personalized conversation prompts
- 📦 **Build Tool**: Vite – Lightning-fast development
- 🔧 **Linting**: ESLint + Prettier – Code quality assurance

---

## �‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/familink.ai.git
   cd familink.ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Firebase and OpenAI credentials.

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## � Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Copy your config values to `.env`

### OpenAI Setup (Optional)

1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Add it to your `.env` file
3. Without this, the app will use default conversation starters

---

## 📁 Project Structure

```
familink.ai/
├── src/                  # React application source
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # React entry point
│   ├── index.css        # Global styles
│   └── firebase.js      # Firebase configuration
├── public/              # Static assets
├── screenshots/         # Project screenshots
├── .env.example         # Environment variables template
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── package.json         # Dependencies and scripts
```

---

## 🚧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

---

## 🌱 Future Plans

While Familink.ai currently supports **private 1-on-1 conversations**, we're working on exciting new features:

🚧 **Upcoming Features**:

- 👨‍👩‍👧 **Group Chats** – Foster family discussions & shared storytelling
- 🎭 **Interactive AI Conversations** – More engaging and dynamic question flows
- 📅 **Memory Timeline** – Capture and revisit past conversations
- 🔐 **User Authentication** – Secure family member profiles
- 📱 **Mobile App** – Native iOS and Android applications

---

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💙 Thanks for Checking Out Familink.ai!

Built with ❤️ for UofTHacks 12
