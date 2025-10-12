# DSA-Instructor

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

Welcome to _DSA-Instructor_ - a web-based AI chat application designed to help users learn and solve Data Structures and Algorithms (DSA) queries. Powered by Gemini AI, it provides clear, structured, and markdown-formatted solutions to DSA problems.

![project gif](assets/dsa.gif)

## Features

- Interactive Chat Interface: Ask any question related to Data Structures and Algorithms and get instant, well-formatted answers.
- AI-Powered Solutions: Utilizes Gemini AI to generate concise explanations and code samples.
- Markdown Support: Responses are provided in clean Markdown with headings, lists, bolding, and code blocks for clarity.
- User-Friendly UI: Modern, responsive design with smooth chat experience.

## 🚀 Quick Start

1 Clone the repository:

```bash
   git clone https://github.com/rishabhbishtuk12/DSA-Instructor.git
   cd DSA-Instructor
```

2 Install dependencies:

```bash
   pip install -r requirements.txt
```

3 Set up environment variables by creating your local file from the example:

```bash
   cp .env.example .env
```

4 Add your Google Gemini API key in the .env file:

```bash
   API_KEY_GOOGLE=your_gemini_api_key
```

5 Run the application:

```bash
   python app.py
```

6 Open your browser and go to `http://localhost:5000`.

## Project Structure

- app.py - Flask backend serving the chat interface and integrating Gemini AI.
- templates/ - HTML templates for the frontend.
- static/ - Contains CSS, JS, and image assets.
- CONTRIBUTING.md — Guidelines for contributing
- CODE_OF_CONDUCT.md — Community guidelines and expectations
- LICENSE — Project license (MIT)

## 🌱 Contributing

We welcome your help in making DSA-Instructor better. Whether it’s fixing bugs, writing tests, improving UX, or building new features, your contributions are valuable.
Please first read:

- [CONTRIBUTING.md](./CONTRIBUTING.md) — how to contribute to this project
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — community rules & etiquette

### Here’s how you can get started:

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
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rishabhbishtuk12"><img src="https://avatars.githubusercontent.com/u/224134759?v=4?s=100" width="100px;" alt="Rishabh Bisht"/><br /><sub><b>Rishabh Bisht</b></sub></a><br /><a href="https://github.com/rishabhbishtuk12/DSA-Instructor/commits?author=rishabhbishtuk12" title="Code">💻</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/issues?q=author%3Arishabhbishtuk12" title="Bug reports">🐛</a> <a href="#ideas-rishabhbishtuk12" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-rishabhbishtuk12" title="Maintenance">🚧</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/pulls?q=is%3Apr+reviewed-by%3Arishabhbishtuk12" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kapilsinghnegi"><img src="https://avatars.githubusercontent.com/u/124447041?v=4?s=100" width="100px;" alt="Kapil Singh Negi "/><br /><sub><b>Kapil Singh Negi </b></sub></a><br /><a href="#ideas-kapilsinghnegi" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-kapilsinghnegi" title="Project Management">📆</a> <a href="https://github.com/rishabhbishtuk12/DSA-Instructor/pulls?q=is%3Apr+reviewed-by%3Akapilsinghnegi" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## ⚖ License & Legal

This project is licensed under the MIT License. See [LICENCE](./LICENSE) for details.
