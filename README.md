1. What change I wanted to make in my application

In this lab, I wanted to improve how my application handles data and user interaction. In the previous lab, data fetching was done manually using useEffect, and the page did not update automatically after adding new data. This made the application less efficient and not very user-friendly.

To improve this, I decided to implement better data management using modern tools. I also added pagination so that large data can be displayed in smaller sections. Additionally, I added role management features, allowing users to create and delete roles in the system.

2. What tools I used to make this change

To make these improvements, I used TanStack Query, which helps in managing server data efficiently. It replaces manual API calls and automatically handles caching, fetching, and updating data using useQuery and useMutation.

I also used Clerk for authentication, which ensures that only signed-in users can perform actions like adding or removing roles. Logged-out users can only view the data.

On the backend, I used Express and Prisma to handle API requests and database operations such as creating and deleting roles. These tools helped me build a more structured and scalable application.

3. How this change affects the user experience

These changes greatly improve the user experience. The application now updates automatically after adding or deleting roles, so users do not need to refresh the page manually. This makes the app feel faster and smoother.

Pagination helps users navigate through data easily by showing a limited number of items per page instead of a long list. This improves readability and usability.

Also, authentication ensures that only authorized users can modify data, which makes the application more secure and realistic.

4. How this change affects my understanding of the application

This lab helped me understand the difference between managing data manually and using a tool like TanStack Query. I learned how server state can be handled more efficiently using caching and automatic updates.

I also gained a better understanding of how authentication works in real applications using Clerk. It showed me how to control access to different features based on user login status.

Overall, this lab improved my understanding of building scalable and maintainable applications, and how frontend and backend work together in a real-world project.