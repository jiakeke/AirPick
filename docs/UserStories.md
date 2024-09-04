# User Stories (Based on INVEST)

## Customer Side:

1. User Story: Customer Registration
    * As a new user,
    * I want to create an account by providing my email, phone number, and a secure password,
    * So that I can book airport pickup services and manage my bookings.
    * Evaluation (INVEST):
        * Independent: Standalone feature not dependent on other actions.
        * Negotiable: Can include optional fields like profile picture or address.
        * Valuable: Essential for accessing the platform.
        * Estimable: Easy to estimate time and effort.
        * Small: Simple feature, implementable in a short time.
        * Testable: Can be tested through form submission and data storage.

2. User Story: User Login
    * As a registered user,
    * I want to log in using my email and password,
    * So that I can access my account and manage my bookings.
    * Evaluation (INVEST):
        * Independent: Separate from other user actions but essential.
        * Negotiable: Can be extended with social logins or two-factor authentication.
        * Valuable: Critical for accessing personalized services.
        * Estimable: Clear scope and effort.
        * Small: Focused, straightforward feature.
        * Testable: Can be tested through login attempts and error handling.

3. User Story: Password Recovery
    * As a user who has forgotten my password,
    * I want to reset my password by receiving a recovery link via email or SMS,
    * So that I can regain access to my account.
    * Evaluation (INVEST):
        * Independent: Does not depend on other features.
        * Negotiable: The method of recovery can vary.
        * Valuable: Ensures user retention by providing access recovery.
        * Estimable: The effort for implementation is clear.
        * Small: This is a specific, small feature.
        * Testable: Testable by attempting password recovery and checking for errors.

4. User Story: Profile Management
    * As a registered user,
    * I want to update my profile information (e.g., name, email, phone number),
    * So that my account details are accurate.
    * Evaluation (INVEST):
        * Independent: Can be developed and tested separately.
        * Negotiable: Can include optional fields or information.
        * Valuable: Ensures data accuracy and personalized service.
        * Estimable: Clear in scope and effort.
        * Small: Small, well-defined feature.
        * Testable: Testable by updating fields and verifying changes.

5. User Story: Customer Booking System
    * As a customer,
    * I want to book an airport pickup by providing my flight details, pickup time, and location,
    * So that I can ensure a driver is available to pick me up.
    * Evaluation (INVEST):
        * Independent: Can be built and tested independently.
        * Negotiable: Additional features like special requests can be added later.
        * Valuable: Core feature for service usage.
        * Estimable: The scope is clear and can be estimated accurately.
        * Small: Can be broken down into manageable tasks.
        * Testable: Testable through mock bookings and edge cases.

6. User Story: Customer Recharge
    * As a customer,
    * I want to recharge my account using various payment methods,
    * So that I can use the balance to pay for airport pickup services.
    * Evaluation (INVEST):
        * Independent: Does not rely on other features.
        * Negotiable: Can support different payment gateways.
        * Valuable: Critical for enabling payments.
        * Estimable: Well-defined scope for effort estimation.
        * Small: Can be broken down into specific tasks.
        * Testable: Testable through transactions and payment confirmations.

7. User Story: Order Bidding
    * As a customer,
    * I want to place a bid for my airport pickup order,
    * So that drivers can accept my order based on the offered price.
    * Evaluation (INVEST):
        * Independent: Can be developed separately.
        * Negotiable: Can include minimum or maximum bid features.
        * Valuable: Enhances customer control over pricing.
        * Estimable: The bidding logic is straightforward to estimate.
        * Small: Specific, manageable feature.
        * Testable: Testable by placing bids and tracking driver responses.

## Driver Side:

8. User Story: Driver Registration
    * As a new driver,
    * I want to create an account by providing necessary details and vehicle information,
    * So that I can accept airport pickup orders.
    * Evaluation (INVEST):
        * Independent: Standalone feature for driver onboarding.
        * Negotiable: Can include additional verification steps.
        * Valuable: Enables drivers to join the platform.
        * Estimable: Clear scope for development.
        * Small: Well-defined and implementable in a short timeframe.
        * Testable: Testable through registration and verification processes.

9. User Story: Driver Login
    * As a registered driver,
    * I want to log in using my email and password,
    * So that I can access available orders.
    * Evaluation (INVEST):
        * Independent: A necessary feature for driver access.
        * Negotiable: Can be enhanced with additional security.
        * Valuable: Essential for accessing the driver dashboard.
        * Estimable: Straightforward in scope.
        * Small: Simple and focused feature.
        * Testable: Testable through login functionality.

10. User Story: Driver Order Management
    * As a driver,
    * I want to view a list of available pickup orders with details such as customer information, pickup time, and location,
    * So that I can decide which orders to accept based on my availability.
    * Evaluation (INVEST):
        * Independent: A self-contained feature.
        * Negotiable: Can be enhanced with filters or sorting options.
        * Valuable: Crucial for drivers to manage their workload.
        * Estimable: Can be broken down into easily estimable tasks.
        * Small: Can be implemented in parts (viewing, filtering, etc.).
        * Testable: Testable by viewing and interacting with the order list.

11. User Story: Accepting an Order
    * As a driver,
    * I want to accept a pickup order,
    * So that the system can assign the order to me and notify the customer.
    * Evaluation (INVEST):
        * Independent: Does not depend on other actions but is critical for order flow.
        * Negotiable: Acceptance logic can be adjusted (e.g., auto-assign based on proximity).
        * Valuable: Central to the driver's role in the service.
        * Estimable: Can be estimated based on existing assignment systems.
        * Small: Focused and manageable.
        * Testable: Testable through acceptance trials and notifications.

12. User Story: Price-Based Order Sorting
    * As a driver,
    * I want to sort available orders by the offered price,
    * So that I can prioritize higher-paying orders.
    * Evaluation (INVEST):
        * Independent: A feature that enhances order management.
        * Negotiable: Can include additional sorting/filtering options.
        * Valuable: Increases driver earnings efficiency.
        * Estimable: Sorting logic is simple to estimate.
        * Small: Specific, self-contained feature.
        * Testable: Testable by comparing sorting results.

13. User Story: Order Status Updates
    * As a driver,
    * I want to update the status of the order when I accept or complete it,
    * So that the customer can track the progress.
    * Evaluation (INVEST):
        * Independent: Crucial for communication between driver and customer.
        * Negotiable: Could include multiple status stages.
        * Valuable: Enhances user experience by keeping customers informed.
        * Estimable: The update mechanism is clear in scope.
        * Small: A small but significant feature.
        * Testable: Testable through status changes and notifications.

14. User Story: Completing the Pickup
    * As a driver,
    * I want to mark an order as completed after I have successfully picked up and dropped off the customer,
    * So that the order is finalized.
    * Evaluation (INVEST):
        * Independent: Completion is independent of other actions but marks the end of the order process.
        * Negotiable: The completion process (e.g., customer feedback) can be adjusted.
        * Valuable: Finalizes the service, enabling payment processing and feedback collection.
        * Estimable: The logic for marking an order as complete is straightforward.
        * Small: A narrow focus on order completion, making it small and manageable.
        * Testable: Completion can be tested by simulating a full order cycle from acceptance to completion.

15. User Story: Driver Withdrawal
    * As a driver,
    * I want to withdraw earnings from my account,
    * So that I can receive payments for completed orders.
    * Evaluation (INVEST):
        * Independent: The withdrawal process is independent but interacts with the driver’s earnings.
        * Negotiable: The withdrawal methods and conditions (e.g., minimum balance) can be adjusted.
        * Valuable: Ensures drivers can access their earnings, which is crucial for driver satisfaction.
        * Estimable: Payment processing and withdrawal logic are estimable based on known systems.
        * Small: The task is focused on the withdrawal process, making it small and feasible.
        * Testable: Withdrawal functionality can be tested by initiating withdrawals and checking the results.

