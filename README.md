# 🚀 DSA-Instructor — AI-Powered DSA Chat Assistant

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p>
  <img src="https://img.shields.io/github/stars/rishabhbishtuk12/DSA-Instructor?style=for-the-badge" alt="Stars">
  <img src="https://img.shields.io/github/forks/rishabhbishtuk12/DSA-Instructor?style=for-the-badge" alt="Forks">
  <img src="https://img.shields.io/github/issues/rishabhbishtuk12/DSA-Instructor?style=for-the-badge" alt="Open Issues">
  <img src="https://img.shields.io/github/issues-pr/rishabhbishtuk12/DSA-Instructor?style=for-the-badge" alt="Pull Requests">
  <img src="https://img.shields.io/github/contributors/rishabhbishtuk12/DSA-Instructor?style=for-the-badge" alt="Contributors">
  <img src="https://img.shields.io/github/license/rishabhbishtuk12/DSA-Instructor?style=for-the-badge" alt="License">
  <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/graphs/contributors">
    <img src="https://img.shields.io/badge/Contributions-Welcome-2ea44f?style=for-the-badge" alt="Contributions Welcome">
  </a>
</p>

**DSA-Instructor** is a full-stack AI-powered learning assistant built to simplify **Data Structures & Algorithms** learning using **Google Gemini AI**.

It provides well-structured answers, clean markdown formatting, explanations, code snippets, error-handling, and a modern chat interface built with **React + Vite + TailwindCSS**.

---

![project gif](assets/dsa.gif)

---

## ✨ Features

### 🧠 AI-Powered DSA Explanations

- Uses **Google Gemini** to generate accurate DSA explanations.
- Provides structured output with headings, code blocks, lists, and examples.

### 💬 Interactive Chat UI

- Real-time typing animation
- “Thinking…” bubble animation
- Stop generation button
- Auto-scroll + scroll-to-bottom button
- Smooth & responsive Tailwind UI
- Syntax highlighting for code

### 🔒 Authentication

- JWT-based Login & Register
- Secure storage

### ⚙️ Backend with Flask

- Complete API handling
- Error classification (network, rate limit, bad request, etc.)
- Logging, monitoring, and consistent error responses
- Modular code structure: routes, services, utils, models

### 🗄 MongoDB Integration

- Fully connected auth system
- User storage
- Scalable structure

### ⚡ Error Handling

- Friendly UI messages
- Retry button
- Stops AI typing instantly
- Bubble shows reasons & suggestions

---

## 📦 Tech Stack

### **Frontend**

- React 18
- Vite
- TailwindCSS 4.1
- Highlight.js
- Marked.js (Markdown parser)
- React Icons

### **Backend**

- Python
- Flask
- JWT Authentication
- MongoDB + pymongo
- Google Gemini API
- Python-dotenv
- Error-handling architecture

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
   git clone https://github.com/rishabhbishtuk12/DSA-Instructor.git
   cd DSA-Instructor
```

### 2. Backend Setup (Flask)

Navigate to /backend folder:

```bash
cd backend
```

#### a. Install backend dependencies

```bash
  pip install -r requirements.txt
```

### c. Setup your .env file

```bash
cp .env.example .env
```

Add:

```bash
API_KEY_GOOGLE=your_gemini_api_key
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### d. Start Flask Backend

```bash
   python app.py
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

### 3. Frontend Setup (React + Vite)

Navigate to /frontend folder:

```bash
cd frontend
```

### a. Install frontend dependencies

```bash
  npm install
```

### b. Setup your .env file

Create:

```bash
VITE_API_BASE=http://127.0.0.1:8000
```

### c. Run Vite Server

```bash
   npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

## 🔧 Troubleshooting

### Common Issues and Solutions

**API Key Issues:**

- **Error**: "Invalid API configuration. Please contact support."
- **Solution**: Ensure your `API_KEY_GOOGLE` is correctly set in the `.env` file and is valid.

**Rate Limiting:**

- **Error**: "Rate limit exceeded. Please wait a moment before trying again."
- **Solution**: Wait a few minutes before making new requests. Consider upgrading your API plan if this persists.

**Network Issues:**

- **Error**: "Network error. Please check your connection and try again."
- **Solution**: Check your internet connection and try the retry button.

**Service Unavailable:**

- **Error**: "API service is temporarily unavailable. Please try again in a few minutes."
- **Solution**: The Gemini API service may be experiencing downtime. Wait and retry.

### Logging

The application logs all activities to `app.log` and the console. Check these logs for detailed error information:

- **Authentication errors**: Invalid API key issues
- **Rate limiting**: API quota exceeded
- **Network errors**: Connection timeouts and failures
- **Service errors**: API service unavailability

### Testing Error Handling

Run the included test script to verify error handling:

```bash
cd backend && python test_error_handling.py
```

## Project Structure

```sql
DSA-Instructor/
│
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── config.py
│   ├── requirements.txt
│   └── test_error_handling.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── api/
│   │   ├── components/
│   │   └── context/
│   │   ├── hooks/
│   │   ├── services/
│   ├── public/
│   ├── index.html
│   └── package.json
│
├── assets/
│   └── dsa.gif
│
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

## 🌱 Contributing

We welcome your help in making DSA-Instructor better. Whether it’s fixing bugs, writing tests, improving UX, or building new features, your contributions are valuable.
Please first read:

- [CONTRIBUTING.md](./CONTRIBUTING.md) — how to contribute to this project
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — community rules & etiquette

### ⭐ Example Queries

- “Explain merge sort in the simplest way.”
- “How does BFS differ from DFS?”
- “Give me optimized code for binary search in Python.”

- Browse open issues — look for labels like good first issue or help wanted
- Discuss before large changes — open an issue to propose your idea so maintainers and community can give feedback
- Fork → Create a branch → Commit → Open a Pull Request
- Write tests & follow coding style
- Be responsive to review feedback — maintainers may request changes or clarifications
- Celebrate & credit — your name gets added to changelog or contributor list when a PR merges

## 🎯 Why Contribute?

- Improve the quality, stability, and features of DSA-Instructor
- Learn by working with real-world code (Flask backend, frontend, AI APIs)
- Collaborate with other developers, get feedback, grow your open source profile
- Be part of a tool that helps students and developers learn DSA

## Example

Ask questions such as:

- "How does quicksort work?"
- "What is the difference between a stack and a queue?"
- "Write code for binary search in Python."

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rishabhbishtuk12"><img src="https://avatars.githubusercontent.com/u/224134759?v=4?s=100" width="100px;" alt="Rishabh Bisht"/><br /><sub><b>Rishabh Bisht</b></sub></a><br /><a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=rishabhbishtuk12" title="Code">💻</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/issues?q=author%3Arishabhbishtuk12" title="Bug reports">🐛</a> <a href="#ideas-rishabhbishtuk12" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-rishabhbishtuk12" title="Project Management">📆</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/pulls?q=is%3Apr+reviewed-by%3Arishabhbishtuk12" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kapilsinghnegi"><img src="https://avatars.githubusercontent.com/u/124447041?v=4?s=100" width="100px;" alt="Kapil Singh Negi "/><br /><sub><b>Kapil Singh Negi </b></sub></a><br /><a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=kapilsinghnegi" title="Code">💻</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/issues?q=author%3Akapilsinghnegi" title="Bug reports">🐛</a> <a href="#ideas-kapilsinghnegi" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-kapilsinghnegi" title="Maintenance">🚧</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/pulls?q=is%3Apr+reviewed-by%3Akapilsinghnegi" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Shreyanshsingh23"><img src="https://avatars.githubusercontent.com/u/149963387?v=4?s=100" width="100px;" alt="Shreyansh Singh Gautam"/><br /><sub><b>Shreyansh Singh Gautam</b></sub></a><br /><a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=Shreyanshsingh23" title="Code">💻</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=Shreyanshsingh23" title="Tests">⚠️</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=Shreyanshsingh23" title="Documentation">📖</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/issues?q=author%3AShreyanshsingh23" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/asmasayed"><img src="https://avatars.githubusercontent.com/u/177089214?v=4?s=100" width="100px;" alt="Asma Sayed"/><br /><sub><b>Asma Sayed</b></sub></a><br /><a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=asmasayed" title="Documentation">📖</a> <a href="#example-asmasayed" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gaurang-2305"><img src="https://avatars.githubusercontent.com/u/199749300?v=4?s=100" width="100px;" alt="gaurang-2305"/><br /><sub><b>gaurang-2305</b></sub></a><br /><a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=gaurang-2305" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## ⚖ License & Legal

This project is licensed under the MIT License. See [LICENCE](./LICENSE) for details.

## ❤️ Thank You

If you like this project, give it a star ⭐
Your support motivates continuous updates & improvements.
