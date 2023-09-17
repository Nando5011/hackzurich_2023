## Inspiration
Even though the challenge by Logitech does not specify a particular problem, we decided to tackle their broader goal of "making the world more interactive". With this in mind, we decided to utilize the data available about the users' interactions with their devices to optimize their work life. Human Interface Devices are the most direct and common way for humans to interact with computers. By analyzing this data, we can gain insights into the current state of user productivity. This data-driven approach enables us to suggest breaks to users, helping them stay productive throughout the day.

Additionally, we aimed to address another common workplace challenge: time tracking. While crucial, it is often tedious and time-consuming. By analyzing keyboard and mouse data, we can detect how much time is spent in each application, simplifying the task of time tracking. Combining these features enhances user productivity and saves valuable time for more critical tasks.

### What it does (To be added later)

### How we built it

The project is structured into several components:

#### Asynchronous Logger
We developed an asynchronous logger for various types of user interactions. This logger is implemented using the Python library, pynput, which allows us to capture key and mouse events. 

#### Custom Application Logger
In addition to key and mouse logging, we implemented a custom application logger. This logger detects which application is currently in focus. Implementing this component for multiple operating systems presented a challenge, as the method for determining the currently focused application differs across platforms.

### Challenges we ran into
The decision to avoid vendor lock-in led us to create a custom solution for key, mouse, and application logging. While this allowed us to use the data precisely as needed, it presented technical challenges. Ensuring compatibility with major operating systems was a complex task. The key and mouse logger benefited from the abstraction provided by the pynput library, but the application logger required platform-specific solutions.

## Accomplishments that we're proud of
Within the limited timeframe of HackZurich, we successfully established a stable foundation for using interaction data to optimize user workflows. Our proudest achievement is the development of a functional prototype in this short period.

## What we learned
Building a multi-OS application with system-level access is a formidable task. We gained valuable insights into various methods and encountered diverse challenges during this process. Sharing our learnings can aid others attempting similar projects.

## What's next for Efficiency Boost: Cloud-Powered Options+ Workflow
Our next steps involve exploring the full potential of the data we collect. The timeframe of the hackathon allowed us to only scratch the surface of possible metrics and analyses. Moving forward, we aim to delve deeper and uncover valuable insights from the collected data. Potential collaborations and partnerships are also on our horizon.
