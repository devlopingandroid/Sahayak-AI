<div align="center">

# 🧠 SAHAYAK
### An AI-Powered External Memory Companion
#### *"Your External Hippocampus"*

![Project Status](https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Raspberry_Pi-C51A4A?style=for-the-badge&logo=raspberrypi&logoColor=white)
![Python](https://img.shields.io/badge/Built_With-Python_3.10-blue?style=for-the-badge&logo=python&logoColor=white)
![Focus](https://img.shields.io/badge/Focus-IoT_&_Automation-green?style=for-the-badge)

<br />

## 🏆 PROBLEM STATEMENT 7: IOT & AUTOMATION
**Hack The Winter – The Second Wave (Angry Bird Edition)** *Round 1 Submission*

</div>

---

## 📖 Table of Contents
- [About The Project](#-about-the-project)
- [The Team (Sicario)](#-team-sicario)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [System Architecture](#-system-architecture)
- [Key Innovation](#-key-innovation-episodic-memory)
- [Tech Stack](#-tech-stack)
- [Future Roadmap](#-future-roadmap)

---

## 💡 About The Project

**Sahayak** is not just an AI assistant; it is a **Cognitive Support System**.

Designed for patients suffering from **Alzheimer's and Dementia**, Sahayak acts as an "External Hippocampus." It is a wearable device that continuously observes the environment, creates human-like episodic memories, and allows the user to recall information naturally using their voice.

> **User:** "Where did I keep my glasses?"  
> **Sahayak:** "You kept your glasses on the sofa when Mishu was nearby at 6:54 PM."

---

## 👥 Team Sicario

| Team Member | Role & Expertise | Socials |
|:-----------|:-----------------|:-------:|
| **Tanish Aggarwal**<br>*(Team Leader)* | **Edge Deployment & Hardware Integration**<br>System reliability, privacy architecture, Raspberry Pi integration. | [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/tanishaggarwal06/) |
| **Yash Goel** | **Voice Interaction & UX**<br>Natural conversation handling, TTS/STT pipelines, Accessibility. | [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/yash-goelcs/) |
| **Chakshu Arora** | **Memory Architecture**<br>Episodic memory design, Agent orchestration, Recall intelligence. | [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/chakshuarora716/) |
| **Anshuman Dutta** | **Computer Vision**<br>CV pipeline design (YOLO/CLIP), Object & Person understanding. | [<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/anshuman-dutta-b62b37339/) |

**College:** Vivekananda Institute of Professional Studies (VIPS), Delhi

---

## 📉 The Problem

Alzheimer's is not just about forgetting data; it's about losing the **context of life**.
1.  **Memory Loss:** Forgetting where objects (wallet, medicine) are kept.
2.  **Object Confusion:** Inability to distinguish between safe and unsafe items.
3.  **Social Disorientation:** Difficulty recognizing familiar faces.

**Why existing tech fails:**
* **GPS Trackers:** Only track location, not context.
* **Reminder Apps:** Passive; they don't "see" what the user does.
* **Smart Speakers:** They fetch data from the internet, not the user's past experiences.

---

## 🚀 Our Solution

Sahayak solves this by implementing **On-Device Episodic Memory**.

### ✅ Core Features
* **👀 Sees:** Uses a camera to detect objects and people (YOLOv8 + CLIP).
* **👂 Hears:** Listens to user queries via an on-device microphone (Whisper).
* **🧠 Remembers:** Logs events in a structured memory format: `WHAT` + `WHERE` + `WHEN` + `WHO`.
* **🗣️ Speaks:** Responds via Bone-Conduction/Speaker using natural Edge TTS.
* **🔒 Private:** 100% Offline processing on Raspberry Pi. No cloud dependency.

---

## ⚙️ System Architecture

Sahayak operates on a **Modular Agent-Based Design**.

```mermaid
graph TD
    subgraph "Perception Layer"
    Cam[Camera Input] --> Vision[Vision Agent (YOLO + CLIP)]
    Mic[Mic Input] --> VoiceIn[Voice Agent (Whisper)]
    end

    subgraph "Cognitive Layer (Raspberry Pi)"
    Vision --> MemLogic{Is Object Stable?}
    MemLogic -- Yes --> Episodic[Memory Agent (Create Memory)]
    VoiceIn --> Query[Query Agent (Intent Detection)]
    Query <--> Episodic
    end

    subgraph "Interaction Layer"
    Episodic --> Response[Response Generation]
    Response --> TTS[Edge TTS Output]
    end

```

### The Workflow

1. **Observation:** Camera captures frames; Vision Agent identifies objects and people.
2. **Memory Formation:** If an object is stable (not moving), a memory entry is created.
3. **Recall:** User asks a question -> Query Agent fuzzy matches keywords -> Retrieves memory -> TTS speaks the answer.

---

## 🧠 Key Innovation: Episodic Memory

Most AI simply retrieves static data. Sahayak builds a **timeline of experiences**.

The **Episodic Memory Engine** stores data in this specific JSON structure:

```json
{
  "object": "glasses",
  "location": "sofa",
  "time": "06:54 PM",
  "person_nearby": "Mishu",
  "context_sentence": "You kept your glasses on the sofa when Mishu was nearby."
}

```

*This mimics the human brain's way of storing "episodes" rather than just data points.*

---

## 🛠 Tech Stack

| Domain | Technology Used | Purpose |
| --- | --- | --- |
| **Hardware** | Raspberry Pi 4/5 | Main Compute Unit (Edge AI) |
| **Vision** | YOLOv8 + CLIP | Object Detection & Semantic Understanding |
| **Voice (Input)** | OpenAI Whisper (Base) | Speech-to-Text (Offline) |
| **Voice (Output)** | Edge Neural TTS | Natural sounding Text-to-Speech |
| **Logic** | Python | Main orchestration language |
| **Memory** | JSON / Vector Store | Storing episodic events |

---

## 🔮 Future Roadmap

* [ ] **Fall Detection:** Using the camera to detect sudden falls.
* [ ] **Caregiver App:** A mobile dashboard for family members to monitor safety.
* [ ] **Multilingual Support:** Adding Hindi and regional language support.
* [ ] **Emotion Detection:** Analyzing voice tone to detect panic or anxiety.

---

<div align="center">

Made with ❤️ by **Team Sicario** for **Hack The Winter**

</div>
