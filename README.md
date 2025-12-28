<div align="center">
  <br />
  <a href="https://github.com/YourUsername/Sahayak">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=0:00C9FF,100:92FE9D&height=250&section=header&text=SAHAYAK&fontSize=90&animation=fadeIn&fontAlignY=38&desc=The%20External%20Hippocampus%20for%20Dementia%20Care&descAlignY=55&descAlign=50" alt="Sahayak Banner" width="100%"/>
  </a>
  
  <br />
  
  <p align="center">
    <img src="https://img.shields.io/badge/Round-1_Submission-FF5722?style=for-the-badge&logo=firebase&logoColor=white" />
    <img src="https://img.shields.io/badge/Domain-IoT_%26_Automation-7E57C2?style=for-the-badge&logo=iot&logoColor=white" />
    <img src="https://img.shields.io/badge/Device-Raspberry_Pi_5-C51A4A?style=for-the-badge&logo=raspberrypi&logoColor=white" />
    <img src="https://img.shields.io/badge/AI-Edge_Computing-00C853?style=for-the-badge&logo=nvidia&logoColor=white" />
  </p>

  <h3 align="center">✨ Hack The Winter: The Second Wave (Angry Bird Edition) ✨</h3>
</div>

---

<details>
  <summary><b>📂 Table of Contents (Click to Expand)</b></summary>
  <br />
  
  1. [The Vision](#-the-vision)
  2. [Problem Statement](#-the-silent-epidemic)
  3. [Solution Architecture](#-solution-architecture)
  4. [Episodic Memory Engine](#-the-core-innovation-episodic-memory)
  5. [Team Sicario](#-meet-team-sicario)
  6. [Tech Stack](#-tech-arsenal)
  7. [Setup & Installation](#-installation)
</details>

---

## 🔮 The Vision

> *"Memory is the diary that we all carry about with us." — Oscar Wilde*

But what happens when that diary starts losing pages? 

**SAHAYAK** is a cognitive support ecosystem designed to restore independence to Alzheimer's patients. Unlike passive trackers, Sahayak is an **active observer**. It "sees" what you see, "hears" what you hear, and builds a **Digital Episodic Memory** to answer questions about your daily life.

---

## 📉 The Silent Epidemic



Alzheimer's and Dementia strip away a person's ability to recall the **Context of Life**.

| 🚫 The Struggle | ❌ Existing "Smart" Tech | ✅ The Sahayak Way |
| :--- | :--- | :--- |
| **"Where is my wallet?"** | **GPS Trackers:** Only show map location. | **Visual Memory:** "You left it on the kitchen counter." |
| **"Who is this person?"** | **CCTV:** Passive recording. | **Face Rec:** "This is your grandson, Aryan." |
| **"Did I eat medicine?"** | **Alarms:** Ring blindly. | **Action Log:** "Yes, you took the blue pill at 2 PM." |

---

## ⚙️ Solution Architecture

We have engineered a **Modular Agent System** that runs entirely offline on the Edge.



```mermaid
graph LR
    subgraph Senses [Sense]
      A[👁️ Camera] -->|Frames| C(Vision Agent)
      B[👂 Mic] -->|Audio| D(Voice Agent)
    end

    subgraph Brain [Cognitive Core]
      C -->|Objects + People| E{Memory Engine}
      D -->|User Query| F(Query Agent)
      F <-->|Recall| E
    end

    subgraph Action [Act]
      E -->|Contextual Answer| G[🔊 Speech Output]
    end
    
    style Senses fill:#f9f,stroke:#333,stroke-width:2px
    style Brain fill:#bbf,stroke:#333,stroke-width:2px
    style Action fill:#bfb,stroke:#333,stroke-width:2px

```
## 🌟 Key Features: Why Sahayak stands out?

Sahayak is not just a reminder app; it is a **fully autonomous cognitive system**.

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🧠 Artificial Episodic Memory</h3>
      <p>Unlike standard assistants that fetch facts from Google, Sahayak builds a <b>personal timeline</b> of your life. It remembers <i>Who</i>, <i>What</i>, <i>Where</i>, and <i>When</i> an event happened using a custom JSON Event Indexer.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🔒 100% On-Device Privacy</h3>
      <p><b>"Your memories stay yours."</b> The entire system runs offline on a <b>Raspberry Pi</b>. No video or audio is ever uploaded to the cloud, ensuring complete data sovereignty for the patient.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>👁️ Semantic Vision Intelligence</h3>
      <p>Powered by <b>YOLOv8 + CLIP</b>, Sahayak doesn't just "detect" objects; it "understands" them. It distinguishes between <i>"Generic Glasses"</i> and <i>"MY Glasses"</i> and uses stability checks to avoid false memories.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🗣️ Zero-UI Voice Interaction</h3>
      <p>Designed for the elderly. No screens, no buttons. Just speak naturally. Using <b>OpenAI Whisper</b> (STT) and <b>Edge Neural TTS</b>, the conversation feels human, not robotic.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🤖 Multi-Agent Orchestration</h3>
      <p>A sophisticated backend where specialized AI Agents (Vision, Memory, Query) talk to each other. This modular design ensures that if one part fails, the system recovers automatically.</p>
    </td>
    <td width="50%" valign="top">
      <h3>⌚ Wearable & Assistive Design</h3>
      <p>Compact integration with <b>Bone Conduction Audio</b> ensures the user stays aware of their surroundings while receiving private memory cues directly into their ear.</p>
    </td>
  </tr>
</table>
---

## 🛠️ Tech Stack & Dependencies

Our system acts as a bridge between **Hardware** and **Advanced AI**.

### 🦾 Hardware Layer (The Body)
| Component | Specification | Functionality |
| :--- | :--- | :--- |
| **Compute Unit** | ![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-5-C51A4A?style=for-the-badge&logo=raspberrypi&logoColor=white) | The central brain handling all Edge AI processing offline. |
| **Vision Sensor** | ![Camera](https://img.shields.io/badge/Pi_Camera-Module_3-black?style=for-the-badge&logo=google-lens&logoColor=white) | Captures high-res frames for the Vision Agent. |
| **Audio Input** | ![Mic](https://img.shields.io/badge/Hardware-USB_Microphone-blue?style=for-the-badge&logo=micro-strategy&logoColor=white) | Captures user queries in real-time. |
| **Audio Output** | ![Speaker](https://img.shields.io/badge/Output-Bone_Conduction-orange?style=for-the-badge&logo=spotify&logoColor=white) | Delivers private, non-intrusive voice responses. |

### 🧠 AI & Perception Layer (The Mind)
| Technology | Model / Tool | Role in Sahayak |
| :--- | :--- | :--- |
| **Object Detection** | ![YOLOv8](https://img.shields.io/badge/YOLOv8-Ultralytics-00FFFF?style=for-the-badge&logo=yolo&logoColor=black) | Detects objects (keys, medicine, glasses) instantly. |
| **Semantic Understanding** | ![CLIP](https://img.shields.io/badge/OpenAI-CLIP-000000?style=for-the-badge&logo=openai&logoColor=white) | Understands context & identifies specific people. |
| **Speech-to-Text** | ![Whisper](https://img.shields.io/badge/OpenAI-Whisper_(Base)-74aa9c?style=for-the-badge&logo=openai&logoColor=white) | Converts voice to text locally (Offline). |
| **Text-to-Speech** | ![EdgeTTS](https://img.shields.io/badge/Microsoft-Edge_TTS-0078D4?style=for-the-badge&logo=microsoft-edge&logoColor=white) | Generates human-like natural voice output. |

### 💻 Core Software & Orchestration
| Component | Tech Stack | Description |
| :--- | :--- | :--- |
| **Language** | ![Python](https://img.shields.io/badge/Python-3.10-3776AB?style=for-the-badge&logo=python&logoColor=white) | Primary logic and agent orchestration. |
| **Vision Lib** | ![OpenCV](https://img.shields.io/badge/OpenCV-Computer_Vision-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white) | Image processing and frame handling. |
| **Memory Store** | ![JSON](https://img.shields.io/badge/Data-JSON_Structure-gray?style=for-the-badge&logo=json&logoColor=white) | Storing episodic events (Time, Loc, Object). |

---

### ⚡ Installation & Setup Guide

Follow these steps to deploy Sahayak on a Raspberry Pi 5 (or 4B).

## 📋 Prerequisites

Device: Raspberry Pi 5 (Recommended) or Pi 4 (8GB RAM)

OS: Raspberry Pi OS (64-bit)

Python: 3.9 or 3.10

Internet: Required for initial model downloads

## 🟢 Step 1: Clone the Repository

Open your terminal on the Raspberry Pi and run:

git clone https://github.com/YourUsername/Sahayak.git
cd Sahayak

## 🟡 Step 2: Install System Dependencies

We need system-level tools for Audio and Vision.

sudo apt-get update
sudo apt-get install python3-pyaudio portaudio19-dev libcamera-dev ffmpeg -y

## 🟠 Step 3: Set Up Virtual Environment

Keep dependencies isolated.

python3 -m venv venv
source venv/bin/activate

## 🔵 Step 4: Install Python Requirements

Install YOLO, Whisper, EdgeTTS, etc.

pip install --upgrade pip
pip install -r requirements.txt


Note: First install may take 5–10 minutes (PyTorch).

## 🟣 Step 5: Hardware Connection

Camera: Connect Pi Camera Module 3 to CSI port

Mic: Plug USB Microphone

Speaker: 3.5mm jack or Bluetooth Bone Conduction

## 🔴 Step 6: Launch Sahayak
python main.py

---

## 🕹️ Usage Instructions

Once the system is running, **Sahayak** becomes your active memory companion. No buttons needed—just speak.

### 🟢 1. Positioning the Device
* Wear the device (or place the camera) such that it has a clear view of your table/room.
* Ensure the microphone is not covered by clothing.



### 🔵 2. Voice Commands
Sahayak listens for natural language. You don't need robotic commands.

| **Intent** | **Example User Query** | **Sahayak's Response** |
| :--- | :--- | :--- |
| **Locate Object** | *"Where did I keep my glasses?"* | *"You left your glasses on the coffee table 10 minutes ago."* |
| **Identify Person** | *"Who is standing in front of me?"* | *"That is your grandson, Aryan."* |
| **Recall Action** | *"Did I take my medicine?"* | *"Yes, I saw you taking the red pill at 2:00 PM."* |
| **General Context** | *"What was I doing just now?"* | *"You were reading a newspaper on the sofa."* |

### 💡 Pro Tips for Best Results
* **Stability Matters:** The memory is only formed when an object is stable for **3 seconds**. Don't wave objects around quickly.
* **Lighting:** Ensure the room is reasonably lit for the Camera to detect objects accurately.
---
## 🧬 The Core Innovation: Episodic Memory

Standard AI creates data. **Sahayak creates Stories.**
We utilize a custom JSON structure to mimic the human brain's **"Event Indexing"**.

<div align="center">

| 🕰️ Time | 📦 Object | 📍 Location | 👤 Person | 📝 Generated Memory |
| --- | --- | --- | --- | --- |
| `06:54 PM` | `Glasses` | `Sofa` | `Mishu` | *"You kept your glasses on the sofa when Mishu was nearby."* |
| `07:10 PM` | `Keys` | `Dining Table` | `None` | *"Your car keys were last seen on the Dining Table."* |

</div>
---


## 📸 Screenshots & Demo

Here is Sahayak in action, processing the real world in real-time.

<div align="center">
  <a href="INSERT_YOUR_YOUTUBE_LINK_HERE">
    <img src="https://img.shields.io/badge/🎥_Watch_Full_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
  </a>
</div>

<br>

<div align="center">
  <table>
    <tr>
      <td align="center">
        <b>👁️ Computer Vision View</b><br>
        <img src="https://via.placeholder.com/400x200?text=Paste+YOLO+Detection+Image+Here" alt="YOLO Detection" width="400"/>
        <br><i>YOLOv8 detecting 'cup' and 'keys'</i>
      </td>
      <td align="center">
        <b>🧠 Terminal / Memory Log</b><br>
        <img src="https://via.placeholder.com/400x200?text=Paste+Terminal+Logs+Here" alt="Terminal Output" width="400"/>
        <br><i>System creating JSON memory logs</i>
      </td>
    </tr>
  </table>
</div>
---

## 🌍 Real-World Impact & Use Cases

Sahayak is designed specifically to address the **"Context Gap"** faced by dementia patients.



### 🏥 Primary Use Case: Alzheimer's Care
| Problem Scenario | Sahayak's Solution | Impact |
| :--- | :--- | :--- |
| **The "Lost Item" Anxiety**<br>Patient panics because they can't find their wallet. | **Visual Memory Recall**<br>"It is on the bedside table." | Reduces panic attacks and dependency on caregivers. |
| **Social Withdrawal**<br>Patient avoids guests because they don't recognize faces. | **Face Identity Whisper**<br>"This is Sharma Ji, your neighbor." | Restores social confidence and dignity. |
| **Repetitive Questioning**<br>Asking "What time is lunch?" 20 times. | **Patient Patience**<br>AI answers calmly every single time without getting frustrated. | Reduces caregiver burnout. |

### 🏘️ Secondary Use Cases
* **Visually Impaired Assistance:** Helping blind users locate objects in a room.
* **Smart Home Automation:** Triggering lights/fans based on user location (Future integration).
---
## 🚀 Future Scope & Roadmap

We have a clear vision to evolve Sahayak from a prototype to a medical-grade product.

### 🗓️ Phase 1: Immediate Enhancements (Next 2 Months)
- [ ] **🔋 Battery Optimization:** Implementing "Sleep Mode" when no motion is detected to extend battery life to 12+ hours.
- [ ] **🚨 Fall Detection:** Using the camera's pose estimation to detect sudden falls and alert family members instantly.
- [ ] **🗣️ Hindi Language Support:** Training a fine-tuned Whisper model for local Indian dialects.

### 🗓️ Phase 2: Long-Term Vision (6 Months+)
- [ ] **📱 Caregiver Companion App:** A mobile dashboard for doctors/family to view memory logs and set safety geofences.
- [ ] **❤️ Emotion Analysis:** Analyzing voice tonality to detect if the patient is stressed or confused and calming them down.
- [ ] **☁️ Optional Cloud Sync:** Secure, encrypted cloud backup for long-term memory retrieval (e.g., "What did I do last Christmas?").

> *"Our ultimate goal is to make Sahayak invisible—technology that helps you live, without getting in the way."*
---
## ⚔️ Meet Team Sicario

<div align="center">
<table>
  <tr>
    <td align="center" width="25%">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tanish&backgroundColor=b6e3f4" width="100px" alt="Tanish"/><br />
      <b>Tanish Aggarwal</b><br>
      <a href="https://www.linkedin.com/in/tanishaggarwal06/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a><br />
      👑 <i>Team Lead</i><br />
      Hardware & Edge Privacy
    </td>
    <td align="center" width="25%">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chakshu&backgroundColor=c0aede" width="100px" alt="Chakshu"/><br />
      <b>Chakshu Arora</b><br>
      <a href="https://www.linkedin.com/in/chakshuarora716/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a><br />
      🧠 <i>Memory Architect</i><br />
      Episodic Memory & Agents
    </td>
    <td align="center" width="25%">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yash&backgroundColor=ffdfbf" width="100px" alt="Yash"/><br />
      <b>Yash Goel</b><br>
      <a href="https://www.linkedin.com/in/yash-goelcs/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a><br />
      🗣️ <i>Voice Engineer</i><br />
      NLP & Accessibility
    </td>
    <td align="center" width="25%">
      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anshuman&backgroundColor=d1ffbd" width="100px" alt="Anshuman"/><br />
      <b>Anshuman Dutta</b><br>
      <a href="https://www.linkedin.com/in/anshuman-dutta-b62b37339/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a><br />
      👁️ <i>Vision Lead</i><br />
      Computer Vision (YOLO/CLIP)
    </td>
  </tr>
</table>

**College:** Vivekananda Institute of Professional Studies (VIPS), Delhi 🏛️
</div>

---

<div align="center">
    <br />

  <h3>🌟 If you find Sahayak interesting, please give it a Star! 🌟</h3>
  
  <p><i>"Preserving memories, one line of code at a time."</i></p>
  <br />
  <p>
    Made with ❤️ & ☕ by <b>Team Sicario</b><br>
    <b>Hack The Winter (Round 1)</b>
  </p>
</div>
