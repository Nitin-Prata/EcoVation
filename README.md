<p align="center">
  <img src="./ecovation_flow.png" width="800" alt="EcoVation Flow">
</p>

<div align="center">
  <h1 align="center">EcoVation: Making Every Product Choice Sustainable</h1>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>🗂️ Table of Contents</summary>
  <ol>
    <li><a href="#mission">🎯 Mission</a></li>
    <li>
      <a href="#about-ecovation">🌍 About EcoVation</a>
      <ul>
        <li><a href="#features">⭐️ Features</a></li>
        <li><a href="#vision">🔮 Vision</a></li>
      </ul>
    </li>
    <li>
      <a href="#workflow">🌈 Workflow Diagram</a>
    </li>
    <li>
      <a href="#get-started">🚀 Setup Instructions</a>
    </li>
    <li>
      <a href="#tech-stack">🛠️ Tech Stack</a>
    </li>
    <li>
      <a href="#about-us">🤖 About Us</a>
      <ul>
        <li><a href="#team">👥 Team</a></li>
      </ul>
    </li>
  </ol>
</details>

<a name="mission"></a>

## 🎯 Mission

Welcome to **EcoVation**!  
We believe the best solutions for sustainability come from everyday choices — the snacks we buy, the bottles we throw away, and the things we decide to reuse instead of trashing.

EcoVation helps you:
- **Understand** what’s inside the products you buy,
- **See** their impact on your health and the planet, and
- **Transform** “waste” into fun, meaningful DIY projects.

One scan at a time, we want to make sustainable living *simple, informative, and fun*.

---

<a name="about-ecovation"></a>

## 🌍 About EcoVation

EcoVation is a web app inspired by the original **Sustain-ify** project, rebuilt as a modern dashboard experience.

Using **Google Gemini** and real‑time web search, EcoVation lets you:

- Scan packaged products and understand their **ingredients, health impact, and environmental footprint**.
- Turn everyday items into **DIY upcycling projects** at different difficulty levels.
- Analyze medical reports to get **personalized, health‑aware shopping guidance** (aligned with the original Health Reports idea).

The core idea stays the same as Sustain-ify — we just give it a fresh UI and a web‑friendly stack.

---

<a name="features"></a>

## ⭐️ Features

### 1. 🛰️ EcoAgent – Product Scan

- Upload a **photo or short video** of any packaged product.
- EcoVation analyzes:
  - **Product details & ingredients**
  - **Nutritional summary**
  - **Environmental impact** (packaging, recyclability, footprint signals)
  - **Health impact** (positives & negatives based on ingredients)
- Powered by **Gemini + Tavily** web search for richer context.

### 2. 🛠️ DIY Generator – Upcycle Anything

- Upload an **image of an item** (like a can, bottle, jar, box, etc.).
- EcoVation generates **three DIY project ideas**:
  - Easy
  - Medium
  - Hard
- For each difficulty level you get:
  - A **clear project title**
  - **Materials required** with quantities
  - **Step‑by‑step instructions** with time + safety tips
  - A **difficulty explanation**
- Designed to mirror the original “DIY Repurposing” feature.

### 3. 📋 Report Analysis – Health‑Aware Suggestions

- Upload a **medical report** (PDF / image / video; depends on your setup).
- EcoVation extracts key information using Gemini.
- This information is used to **inform health‑aware product suggestions** in the EcoAgent flow (conceptually aligned with the original Health Reports feature).
- Current implementation focuses on extraction + structure; Firebase storage can be plugged in later.

---

## 📸 Example Screens (placeholders)

> Replace image paths with your actual screenshots in this repo.

- Product scan result:
  - `![Product Scan](./images/product_scan.png)`
- Environmental & Health impact:
  - `![Environment Impact](./images/environment_impact.png)`
  - `![Health Impact](./images/health_impact.png)`
- DIY generator:
  - `![DIY Generator](./images/diy_generator_easy.png)`

---

<a name="vision"></a>

## 🔮 Vision: Sustainability for Everyone

EcoVation aims to:

- Make **sustainable shopping** a default, not an afterthought.
- Show that **upcycling is fun**, not just “extra work”.
- Connect **personal health** with **planet health**, so people feel the impact of their choices both inside and outside.

Long‑term, EcoVation can power:
- Reward systems for upcycling,
- Community‑shared DIY ideas,
- Deeper integrations with health data and carbon‑aware shopping.

---

<a name="workflow"></a>

## 🌈 Workflow Diagram

<p align="center">
  <img src="./ecovation_flow.png" alt="EcoVation Workflow Diagram" width="800">
</p>

High‑level flow:

1. **User uploads**:
   - Product image/video → EcoAgent  
   - Item image → DIY Generator  
   - Medical report → Report Analysis  
2. **Backend (FastAPI)** calls Gemini + Tavily.
3. **Structured responses** are formatted for the dashboard.
4. Results are shown in three tabs:
   - Product details
   - Environment impact
   - Health impact / DIY recipes

---

<a name="get-started"></a>

## 🚀 Setup Instructions

### 1. Clone the Repository
git clone https://github.com/YourUsername/EcoVation.git
cd EcoVation


### 2. Backend Setup (FastAPI + Gemini)

From the project root:

cd backend_api
pip install -r ../requirements.txt

Create a .env file inside backend_api:

GEMINI_API_KEY=your_gemini_key_here
TAVILY_API_KEY=your_tavily_key_here

# Recommended default (good free tier)
GEMINI_MODEL=gemini-2.5-flash-lite

Run the backend:
cd backend_api
uvicorn main:app --reload

Backend runs at: http://localhost:8000

3. Frontend Setup (React + Vite)
From the project root:

cd web_app
npm install
npm run dev

Frontend runs at: http://localhost:5173
Make sure the backend is running before testing Scan Product / DIY Generator.

<a name="tech-stack"></a>

🛠️ Tech Stack
AI & Backend
<p align="center">
<img src="https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini"/>
<img src="https://img.shields.io/badge/Tavily_Search-4caf50?style=for-the-badge" alt="Tavily"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
</p>
Frontend
<p align="center">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
</p>
Optional / Planned Integrations
Firebase – media + report storage (future / optional).
MongoDB – for scalable user + product history (future / optional).
<a name="about-us"></a>
🤖 About Us
EcoVation is built on top of the original Sustain-ify concept.
The same spirit, with a new implementation.
<a name="team"></a>
👥 Team
> Keep or update these to your actual team details.
<p align="center">Surya</p>
<p align="center">
<img src="https://github.com/S0L009/COMIC-IFY_OneAPI/blob/main/Streamlit/surya.jpg" alt="Surya's Picture" width="150">
</p>
<p align="center">
<a href="https://www.linkedin.com/in/surya-santhosh-64a08b297/">
<img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
</a>
<a href="https://www.instagram.com/ss.surya.ss/">
<img src="https://img.shields.io/badge/Instagram-Follow-red?style=flat-square&logo=instagram" alt="Instagram">
</a>
</p>
<p align="center">Amrit</p>
<p align="center">
<img src="https://github.com/S0L009/COMIC-IFY_OneAPI/blob/main/Streamlit/amrith.jpg" alt="Amrit's Picture" width="150">
</p>
<p align="center">
<a href="https://www.linkedin.com/in/macromrit/">
<img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
</a>
<a href="https://www.instagram.com/amritsubramanian.c/">
<img src="https://img.shields.io/badge/Instagram-Follow-red?style=flat-square&logo=instagram" alt="Instagram">
</a>
</p>
<p align="center">Navneet</p>
<p align="center">
<img src="https://github.com/S0L009/COMIC-IFY_OneAPI/blob/main/Streamlit/me.jpg" alt="Navneet's Picture" width="150">
</p>
<p align="center">
<a href="https://www.linkedin.com/in/navneet-krishna-669000279/">
<img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
</a>
<a href="https://www.instagram.com/krrishh/">
<img src="https://img.shields.io/badge/Instagram-Follow-red?style=flat-square&logo=instagram" alt="Instagram">
</a>
</p>
<p align="center">Srikar</p>
<p align="center">
<img src="https://github.com/S0L009/COMIC-IFY_OneAPI/blob/main/Streamlit/srikar.jpg" alt="Srikar's Picture" width="150">
</p>
<p align="center">
<a href="https://www.linkedin.com/in/kottakki-srikar-vamsi/">
<img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
</a>
<a href="https://www.instagram.com/srikarvamsi1230/">
<img src="https://img.shields.io/badge/Instagram-Follow-red?style=flat-square&logo=instagram" alt="Instagram">
</a>
</p>
<div align="center">
<p align="right"><a href="#readme-top">↑ Back to Top ↑</a></p>
<p align="left">Made with ❤️ for a sustainable future.</p>
</div>