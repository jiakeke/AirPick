# AirPick

The project aims to develop an Airport Pickup Service Platform that allows customers to book airport pickups, recharge accounts, and place bids for services, while enabling drivers to manage and fulfill these orders, including sorting by price and withdrawing earnings.

## Group 7

## Members

- Ke Jia
- Qingyun Wang
- Runzhou Zhu
- Yang Yang

## Sprint 3: Deliverables
- [Front-End Code](./client)
- [Back-End Code](./server)
- [Sprint Ceremony Insights](./docs/SprintCeremonyInsights.md)
- [Team Contributions](./docs/TeamContributions.md)
- [Presentation Slides](./docs/AirPick-Presentation-final.pptx)
- [API Documentation](https://airpick-be.onrender.com/api-docs)
- [Backend Testing](./server/tests)
- [Frontend Deployment](https://airpick.onrender.com/)
- [Backend Deployment](https://airpick-be.onrender.com/)
- [Self-Assessment](./docs/SelfAssessment.md)



## Key Features:

- Customer Features:
    * Account Management: Registration, login, password recovery, and profile management.
    * Booking System: Booking airport pickups, recharging accounts, and bidding for services.
- Driver Features:
    * Driver Management: Registration, login, and profile management.
    * Order Management: Viewing, sorting, accepting orders, updating order status, and completing orders.
    * Financial Management: Ability to withdraw earnings.
- Order Status Tracking: Real-time updates on order status for both customers and drivers.

## Technical Considerations:

- Scalability: The platform should handle a large volume of users and transactions.
- Security: Secure payment processing, user authentication, and data protection.
- User Experience: Ensure a seamless experience for both customers and drivers.


## Backlogs

- See [Trello](https://trello.com/b/RTrhEkjZ/airpick) for more infomation.

## User Stories

- [User Stories](./docs/UserStories.md)

## Information Architecture

- [HTML Version](./docs/prototype-html) || [ZIP](./docs/prototype-html.zip), Axure extension needs to be installed.
- [Word Version](./docs/prototype.docx)

## Technical Structure

- [System Structure](./docs/Project-Structure.png)
- [Functional Structure](./docs/Project-Functions.png)


## Presentation

- [Sprint 1 (04.09.2024)](./docs/AirPick-Presentation-1st.pptx)
- [Sprint 2 (18.09.2024)](./docs/AirPick-Presentation-2nd.pptx)
- [Sprint 3 (09.10.2024)](./docs/AirPick-Presentation-final.pptx)


## API Call
We encapsulate the axios instance, called api, and put it in client/src/axios.js. It can automatically add the user token to the request header. The usage is as follows:

- `import useAxios from '../axios';` //Pay attention to the reference path here
- `const api = useAxios();` //Get the axios instance
- `const res = await api.get("/api/users")`

## Authentication
We now use useContext to manage and maintain user authentication information. If you want to determine whether the current user is logged in or what the category of the login user is, you can use it as below:

- `import { useAuth } from '../hooks/useAuth'; //Import the useAuth hook`
- `const { auth } = useAuth(); //Get authentication information from context.`
- `if (auth.isLoggedIn) {...}; //Determine whether the current user is logged in.`
- `if (auth.category === "passenger") {...}; //Determine what the category of the login user is.`

## DOTENV
- Copy the `.env.example` to `.env` and set the variables inside.
- Never put the `.env` into repository.

### Client Side:
```bash
VITE_API_BASE_URL=YOUR_API_BASE_URL // Modify the API base URL here
```

### Server Side:
```bash
PORT=4000
DBLINK=YOUR_MONGODB_LINK
JWT_SECRET=YOUR_JWT_SECRET
GOOGLE_MAP_KEY=YOUR_GOOGLE_MAP_KEY
MAIL_SMTP_HOST=YOUR_SMTP_HOST
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=YOUR_SMTP_USER
MAIL_SMTP_PASS=YOUR_SMTP_PASS
MAIL_SMTP_FROM=YOUR_SMTP_FROM
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET
FRONTEND_BASE_URL=YOUR_FRONTEND_BASE_URL // Set this only for the reset password link
```


## Database
- Set the mongoDB connection link in .env first.

## Directory Structure

- AirPick
    - docs
    - client
        - src
            - components
    - server
        - controllers
        - models
        - routes
