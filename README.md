# 🧠 SAHAYAK  
## An AI-Powered External Memory Companion  
### (Problem Statement 7: IoT & Automation)

---

## 🏫 Hackathon Details

**Event:** Hack The Winter – The Second Wave (Angry Bird Edition)  
**Organizer:** Graphic Era Hill University (GEHU), Bhimtal  
**Round:** Round 1 Submission  
**Domain:** IoT & Automation  

---

## 👥 Team Details

### **Team Name:** **Team Sicario**

---

### 🔹 **Tanish Aggarwal** — *Team Leader*  
📍 **College:** Vivekananda Institute of Professional Studies (VIPS), Delhi  
🔗 **LinkedIn:** https://www.linkedin.com/in/tanishaggarwal06/  

**Skills & Contributions:**  
- Hardware selection & integration  
- Edge AI deployment (on-device processing)  
- System reliability, privacy & architecture design  

---

### 🔹 **Yash Goel**  
🔗 **LinkedIn:** https://www.linkedin.com/in/yash-goelcs/  

**Skills & Contributions:**  
- Voice input/output systems  
- Natural conversation handling  
- Accessibility & UX through speech interfaces  

---

### 🔹 **Chakshu Arora**  
🔗 **LinkedIn:** https://www.linkedin.com/in/chakshuarora716/  

**Skills & Contributions:**  
- Episodic memory system design  
- Memory recall intelligence  
- AI agent orchestration  

---

### 🔹 **Anshuman Dutta**  
🔗 **LinkedIn:** https://www.linkedin.com/in/anshuman-dutta-b62b37339/  

**Skills & Contributions:**  
- Computer Vision pipeline design  
- Object & person understanding  
- Memory creation logic  

---

## 🧩 Problem Statement

### **Problem Statement 7: IoT & Automation**

Alzheimer’s and dementia patients suffer from progressive **episodic memory loss**, causing them to forget:
- Where they kept everyday objects (glasses, wallet, medicines)
- Who they are interacting with
- What actions they recently performed  

Existing IoT and automation solutions focus on **tracking** (GPS, reminders, alarms) but fail to address the **core cognitive problem** — **loss of memory itself**.

There is no system that:
- Continuously observes the environment  
- Understands context  
- Builds memory like a human brain  
- Allows recall through natural interaction  

---

## 💡 Our Solution — **SAHAYAK**

> **Sahayak is an AI-powered, wearable, on-device cognitive assistant that acts as an “External Hippocampus” for people suffering from memory loss.**

Instead of reminders or notifications, Sahayak:
- **Observes** the environment
- **Creates episodic memory** (WHAT + WHERE + WHEN + WHO)
- **Recalls memories through voice interaction**
- Works **fully on-device** for privacy and reliability

Example interaction:
> **User:** “Where are my glasses?”  
> **Sahayak:** “You kept your glasses on the sofa when Mishu was nearby.”

---

## 🧠 Core Innovation (USP)

### ❌ Traditional AI Assistants
- Answer from the internet  
- No understanding of personal context  
- No memory of user’s real life  

### ✅ **Sahayak**
- Builds **human-like episodic memory**
- Remembers **real experiences**
- Answers from the user’s **own past**
- Designed specifically for **assistive care**

👉 This makes Sahayak a **cognitive AI system**, not a chatbot.

---

## ⚙️ System Architecture (Hardware-Oriented)

### 🔹 Hardware Platform
- **Raspberry Pi 4 / 5** (Core Processing Unit)
- Camera Module (Vision input)
- Microphone (Voice input)
- Speaker / Bone-Conduction Audio (Voice output)
- Battery / Power bank (Wearable operation)

All processing is done **on-device**, ensuring:
- Low latency
- Offline functionality
- Complete user privacy

---

## 🧩 Software Architecture (Agent-Based Design)

Sahayak is built using **multiple AI agents**, each handling a specific cognitive role:

| Agent | Responsibility |
|-----|---------------|
| **Vision Agent** | Object & person detection |
| **Memory Agent** | Episodic memory creation |
| **Query Agent** | User intent understanding |
| **Voice Agent** | Speech-to-Text & Text-to-Speech |
| **Emergency Agent (Planned)** | Safety & alert handling |

---

## 🧠 Core Functional Modules (Detailed)

### 1️⃣ Vision & Object Understanding
- **YOLOv8** for object detection
- **CLIP embeddings** for object identity
- Tracks the *same object over time*

---

### 2️⃣ Object Identity Memory
- Assigns a unique ID (UID) to each object
- Prevents duplicate memory creation
- Maintains short-term perceptual memory

---

### 3️⃣ Episodic Memory Engine (CORE MODULE)
**Episodic Memory = WHAT + WHERE + WHEN + WHO**

Each memory stores:
- Object name  
- Location  
- Time  
- Nearby person  
- Natural language sentence  

This mimics **human memory formation**.

---

### 4️⃣ Memory Trigger Logic
Memory is created only when:
- Object is stable
- Seen consistently
- Not moving  

This avoids false or noisy memories.

---

### 5️⃣ Voice Interaction
- **Whisper (on-device)** for Speech-to-Text
- **Edge Neural TTS** for natural voice output
- Supports continuous conversation

---

### 6️⃣ Query & Recall Intelligence
- Intent detection (Where / Who / This is)
- Fuzzy keyword matching (glasses ↔ classes)
- Searches episodic memory and responds naturally

---

## 🔄 Complete Workflow

### 🟢 Memory Creation Flow
    Camera → Object Detection → Object Identity → Stability Check → Episodic Memory Creation → Stored

### 🔵 Memory Recall Flow
    User Voice → Speech to Text → Intent Detection → Memory Search → Answer Generation → Voice Output

### SYSTEM ARCHITECTURE DIAGRAM

┌──────────────────────────────────────────────────────────────┐
│                        USER (Patient)                        │
│                                                              │
│  🎤 Voice Queries                 👁️ Real-world Environment │
│  (Speech Input)                   (Objects & People)        │
└───────────────┬───────────────────────────────┬─────────────┘
                │                               │
                ▼                               ▼
┌──────────────────────────┐     ┌────────────────────────────┐
│        MICROPHONE         │     │        CAMERA MODULE        │
│      (Voice Input)        │     │    (Visual Perception)      │
└───────────────┬──────────┘     └───────────────┬────────────┘
                │                                │
                ▼                                ▼
┌──────────────────────────────────────────────────────────────┐
│             RASPBERRY PI – EDGE AI CORE                       │
│        (All AI Processing Happens On-Device)                  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    VOICE AGENT                         │  │
│  │  • Whisper (Speech → Text)                              │  │
│  │  • Edge Neural TTS (Text → Speech)                      │  │
│  └───────────────┬────────────────────────────────────────┘  │
│                  │                                           │
│  ┌───────────────▼────────────────────────────────────────┐  │
│  │                    QUERY AGENT                         │  │
│  │  • Intent Detection                                    │  │
│  │  • Fuzzy Keyword Matching                               │  │
│  │  • Natural Language Understanding                       │  │
│  └───────────────┬────────────────────────────────────────┘  │
│                  │                                           │
│  ┌───────────────▼────────────────────────────────────────┐  │
│  │                   MEMORY AGENT                         │  │
│  │  • Episodic Memory Engine                               │  │
│  │  • WHAT + WHERE + WHEN + WHO                            │  │
│  │  • Human-like Memory Recall                             │  │
│  └───────────────┬────────────────────────────────────────┘  │
│                  │                                           │
│  ┌───────────────▼────────────────────────────────────────┐  │
│  │                   VISION AGENT                         │  │
│  │  • YOLOv8 – Object Detection                            │  │
│  │  • CLIP – Object Identity Memory                        │  │
│  │  • Face Recognition – Person Awareness                  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │        EMERGENCY & SAFETY AGENT (Planned)               │  │
│  │  • Panic / Fall Detection                               │  │
│  │  • Inactivity Monitoring                                │  │
│  │  • Caregiver Alert System                               │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│        SPEAKER / BONE-CONDUCTION AUDIO OUTPUT                │
│            (Natural Voice Response to User)                 │
└──────────────────────────────────────────────────────────────┘



## 🧠 Key Features

- Human-like episodic memory
- Fully on-device AI (privacy-first)
- Voice-based interaction
- Object & person awareness
- Assistive, not intrusive
- Designed for elderly & cognitively impaired users

---

## 🚨 Emergency & Safety (Future Scope)
- Fall detection
- Panic voice detection
- Inactivity monitoring
- Automatic caregiver alerts

---

## 📈 Advantages

- No internet dependency
- Low latency responses
- Personalized memory recall
- Scalable wearable design
- Strong real-world impact

---

## ⚠️ Limitations

- Raspberry Pi compute constraints
- Performance depends on environment
- Requires calibration per user

---

## 🚀 Future Enhancements

- Persistent memory database
- Bone-conduction audio
- Multi-language support
- Caregiver companion mobile app
- Cloud sync (optional)
- Emotion-aware responses

---

## 🏁 Conclusion

**Sahayak is not just an AI assistant — it is a cognitive support system.**

By recreating episodic memory using **on-device AI, IoT, and automation**, Sahayak empowers Alzheimer’s and dementia patients to live with:
- Confidence  
- Independence  
- Dignity  

---

## 



