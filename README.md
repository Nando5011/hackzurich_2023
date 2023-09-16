# HACKZURICH 2023

## **Features**

-**Tracking project hours in background**<br>
A task in the background should automatically record the minutes worked per project and write them into a file. The project could be selected via shortcut or via active window (or active desktop?)<br>
***Why?***<br>
This takes one annoying task off the shoulders of the developer, so he can focus more on his work

-**Smart analyze workflow and adapt environment based on efficiency for a healthy mental load and brain activity**<br>
Record user input (keyboard, mouse) and if possible use the camera to analyze the workflow of the user. If the workflow is really good, set the environment for a really effective and non-distracting workflow (disable notifications (maybe set teams status to busy?), turn down the lights a bit, disable any windows sound (enable noise cancelation?), stuff like that...)
If the user seems to be making a lot of careless mistakes or often confuses items and has to revert his changes a lot (a lot of typos), then try to get the user to make a break.<br>
***Why?***<br>
On the one hand, users might tend to either take too few breaks and therefore lose their productivity through their day, or they dont do breaks at all, which is even worse. On the other hand, if a user is really in the flow with his work, he might lose his focus and flow due to things like text messages or incoming calls. While being available is an important thing during the average work day, it sometimes could be better to delay the phone call for a few minutes, to make the most out of this productive phase. Therefore, when a user is getting "in the flow", set the enviromnent accordingly in order to make the most out of the users productive phase.

-**Help the user get back to work**<br>
Record a history of what the user was doing in the last few minutes, and tell the user what he was working on before he left for break. (Maybe the user could also be prompted to write down some key information before he takes a break). When the user gets back from his break, give the information of what he was doing beforehand to him. This should make it easier for the user to re-orient himself in the work and therefore optimize his workflow early on.<br>
***Why?***<br>
Some people tend to not take a break because they are afraid they might lose their productive flow or because they might forget what they head in mind in that moment. To make sure that the user is taking enough breaks, therefore ensuring good efficiency and productivity, try to make the break as attractive to the user as possible.

-**Make day history available to the user**<br>
At the end of the day, show the user what he has achieved and how his day looked like in terms of productivity and workflow, on what projects he worked on for how long etc.<br>
***Why?***<br>
Motivate the user

## **Typing Quality Metrics**
Different metricvs which give an insight into the typing quality of the user. This could be used to determine the mental load of the user, or to determine if the user is in the flow or not. This could also be used to determine if the user is getting tired or not, and therefore if he should take a break.

The input cata consists of a list ok KeyEvents.

### **Typing Speed**

-   **WPM** (Words per Minute)<br>
    The average number of words typed per minute. This is calculated by dividing the number of characters typed by 5 (the average word length) and then dividing the result by the time in minutes.

-   **CPM** (Characters per Minute)<br>
    The average number of characters typed per minute. This is calculated by dividing the number of characters typed by the time in minutes.

### **Typing Accuracy**

-   **CER** (Character Error Rate)<br>
    The percentage of characters typed incorrectly. This is calculated by dividing the number of characters typed incorrectly (backspce use) by the total number of characters typed.

-  **ABU** (Absolute Backspace Usage)<br>
    The number of backspaces used per minute. This is calculated by dividing the number of backspaces used by the time in minutes.

