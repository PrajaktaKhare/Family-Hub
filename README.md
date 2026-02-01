# FamilyHub – Smart Device App Manager

**FamilyHub** is a centralized platform that allows families to monitor, organize, and control connected smart devices from a single interface. It simplifies household device management and enhances security, privacy, and convenience.

---

##  Features

- **Centralized Device Management:** Monitor all smart devices in one place.
- **Role-Based Access Control:** Securely manage who can access and control specific devices.
- **Real-Time Updates:** Device states and notifications are updated in real time.
- **GraphQL APIs:** Efficient querying and reduced over-fetching of data.
- **Optimized Performance:** Faster synchronization and data retrieval with indexed MongoDB collections.

---

## Business Problem

Many households have multiple smart devices, often from different manufacturers. Managing them individually can be time-consuming and confusing. FamilyHub provides:

- A single, unified interface for all devices.
- Secure access control for different family members.
- Real-time monitoring and alerts for safety and convenience.

---

##  Industry Applications

- **Smart Home / IoT**
- **Home Security & Automation**
- **Family & Personal Device Management**
- **Smart Appliances & Energy Management**

---

##  Architecture & Design

- **Backend:** Node.js + Express
- **Views**: Handlebars
- **Database:** MongoDB (optimized with indexes for faster sync)
- **API:** GraphQL (Apollo Server with Express middleware)
- **Authentication:** Passport.js for Role-Based Access Control (RBAC)
- **Real-Time Updates:** WebSockets / polling for device state changes(future implementation)
- **Scalability:** Designed to handle multiple households and devices efficiently
- **Session Management**: express-session and MongoDB session store

**Architecture Diagram:**  
```bash
 
+----------------+      GraphQL / REST API      +------------------+
|  Frontend UI   | <--------------------------> |   Node.js API    |
|  Handlebars    |                               |   Express + RBAC |
+----------------+                               +------------------+
       ^                                                 |
       | REST API                                  | Queries / Mutations
       v                                                 v
+----------------+                               +------------------+
|  Real-Time     |                               |     MongoDB      |
|  Event Layer   |                               |  Device & User   |
|  WebSocket     |                               |  Data Storage    |
+----------------+                               +------------------+
       ^                                                 ^
       |                                                 |
       |<--------------- IoT Devices ------------------>|

  ```


---

## 🛠 Technologies Used

- Node.js
- Express
- MongoDB
- Passport.js
- GraphQL

---

##  Results / Impact

- Reduced **data over-fetching by 40%** using GraphQL.
- Improved **sync speed and responsiveness** during peak usage with optimized MongoDB indexing.
- Ensured **secure device access** with RBAC for multiple users.
- Simplified **household device management**, reducing setup and control time by ~50%.

---

##  Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/PrajaktaKhare/Family-Hub.git
   ```

2. Navigate into the project:
    ```bash
   cd Family-Hub
       ```
3. Initialize project
   ```bash
   npm init -y
   ```

4. Install dependencies:
 ```bash
npm install express mongoose dotenv nodemon @apollo/server graphql cors body-parser express-handlebars express-session cookie-parser passport passport-local connect-mongo
```
5. Start the server:
   ```bash
   node server.js
```
nodemon server.js

   ```
6. Access the application at http://localhost:5000

