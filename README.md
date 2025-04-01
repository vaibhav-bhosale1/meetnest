# MeetNest

MeetNest is a modern chat application built using the MERN stack. It provides real-time messaging, online user status updates, and secure authentication, making communication seamless and efficient.

## Features

- **Real-time Messaging**: Instant messaging with WebSockets for a smooth chat experience.
- **User Authentication**: Secure login and registration using JWT-based authentication.
- **Online Status Updates**: View users' online/offline status in real time.
- **Global State Management**: Zustand is used for efficient state management.
- **Responsive UI**: A sleek and intuitive user interface for a great user experience.

## Tech Stack

- **Frontend**: React.js, Zustand
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Real-time Communication**: WebSockets (Socket.io)

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- MongoDB

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vaibhav-bhosale1/meetnest.git
   cd meetnest
   ```

2. **Install Dependencies**
   ```bash
   npm install
   cd client
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server**
   ```bash
   npm run server
   ```

5. **Run the Client**
   ```bash
   cd client
   npm start
   ```

## Contributing

Contributions are welcome! Feel free to fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact
For any inquiries or support, reach out to [Vaibhav Bhosale](https://github.com/vaibhav-bhosale1).

