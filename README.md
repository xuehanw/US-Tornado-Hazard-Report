# US-Tornado-Hazard-Report
The tornado map system has been developed by Wan-Ting Liao, Xuehan Wang, and Yiwen Lou. It offers information on tornado occurrences and damage reports spanning from 2010 to 2022.

## Introduction
### Motivation
The aim for doing this project was inspired by a recent tornado event in North Carolina. One of our teammates has been here for a year and didn't know there’s tornado in North Carolina until the tornado disaster happened, and before that, she knew very little about the tornado risk in the United States. This experience motivated us to create a system that can assist people like her, newcomers or people considering relocation, in understanding the tornado risk associated with their intended locations. Furthermore, this system aims to provide valuable insights to government authorities. By offering a comprehensive understanding of tornado occurrences across various regions, it can aid in the formulation of appropriate countermeasures, the allocation of budgets for policy development, and the enhancement of disaster relief efforts. The ultimate goal is to empower both individuals and government agencies with the knowledge needed to make informed decisions and respond effectively to tornado hazards.

### Target
The primary goal of this project is to develop a comprehensive tornado hazard report for the United States. Using the interactive map, users will gain valuable insight into historical tornado occurrences and, through statistical analysis, assess the associated losses and casualties over the years. The study covered tornado records for every U.S. state between 2010 and 2022. In addition to providing a valuable resource for newly immigrant or relocating individuals to assess tornado risk in their intended area of residence, it is intended to provide the support necessary to inform government decision-making and develop effective disaster prevention and response strategies.

### Questions to answer
As this system provides yearly and monthly analyses of tornado trends, users might be interested in exploring specific aspects and expect answers to the following questions:

Tornado occurrence:
- Which state, in which year, has the highest occurrence of tornadoes?
- In which month do tornadoes occur most frequently?
- During which season do tornadoes have a higher occurrence, and in which regions do they mainly occur? For example, is there a difference in tornado occurrence between summer and winter?
- Is there any contrast between recent years and ten years ago?

Loss and Casualties:
- In which state, in which year, do tornadoes cause the highest property loss and casualties?
- In which month are the highest losses and casualties recorded?
- Does a higher occurrence of tornadoes correlate with increased property loss and casualties?

## Data Preprocessing
The tornado data from 1950 to 2022 is provided by the National Oceanic and Atmospheric Administration (NOAA). To ensure that our disaster analysis is both relevant and precise, we have chosen to focus exclusively on data from the most recent decade, covering the years 2010 to 2022. This decision was made because older climate change data may not provide as much utility due to its outdated nature.
All the data provided by NOAA are in .csv format. Each year of data not only includes fundamental tornado information, such as geolocation, range, and wind magnitude, but also details related to the losses and injuries caused by each tornado event.

Source of data: https://www.spc.noaa.gov/wcm/#data

Data definition: 
https://www.spc.noaa.gov/wcm/data/SPC_severe_database_description.pdf

### Variables used in the system design
Given our focus on the number of tornadoes and their impact on states, we filtered out specific variables during the data cleaning process for use in our system. Alongside variable selection, we conducted data cleaning to identify and address any NA values and ensure consistent data formats, such as checking if there’s any data type errors in numbers or dates. All these preprocessing steps were performed using R Studio.

| Variable  | Definition |
| --------- | -----------|
| yr    | year - from 2010 to 2022  |
| mo    | month |
| st    | state - two letter postal abbreviation |
| om    | tornado number |
| inj   | injuries |
| fat   | fatalities |
| loss  | estimated property loss information in millions of dollars |
| closs | estimated crop loss in millions of dollars |


### Data Transformation and Statistical Analysis
After data cleaning,  Our dataset still contains up to 160,000 records since the records cover 12 years. Considering the potential impact on chart rendering speed due to the statistical and integration processes in JavaScript, we opted to preprocess the data using R studio. The data was aggregated by year, month, and state, facilitating ease of use in system design. To complete this, we conducted counts for tornado occurrences and casualties on a monthly basis, which is more insightful to examine the cumulative tornado count, injuries, and property losses than viewing with data points. Additionally, to gain a clearer understanding of tornado distribution across states, we conducted state-level statistics. After conducting these calculations on the data using R, additional basic statistics such as maximum and minimum values are computed using JavaScript.


## Intended Visualization Design
As discussed in the previous section, our goal is to enable target users to identify states at a high risk of tornadoes. This information empowers them to make informed decisions about whether to reside in those areas or travel to them during specific seasons. After brainstorming, the prototype design is depicted in the following figures: 

![paper prototype_tornado](https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/79a6c23c-60c9-4ed7-9898-183d8d280cce)

Our initial idea is that our system will include two parts: the main map showing tornado information, and two small charts providing tornado statistics.
At the top of the map, there will be a drop-down menu for the year. If we change the year, the colors and data on the map will change accordingly. If a state has more tornadoes in the selected year, resulting in more casualties and damage, the color of the map for that state will be darker. When we hover the mouse over a state on the map, the amount of injuries and damages are shown as small squares. If we click on a specific state, two charts are displayed on the side of the map. The first chart depicts the number of tornadoes in that state over a ten-year period, with the x-axis showing the year and the y-axis showing the number of tornadoes. The second chart illustrates property damage per year, with the x-axis representing the year and the y-axis representing the amount of damage caused. These two charts are fixed for each state.

## Final Design and Implementation

### Header and Introduction
To facilitate user understanding of our system, we have included a project header, a brief introduction outlining our goals, and an explanation on how to use our system.

<img width="500" alt="Screenshot 2023-12-04 at 5 48 20 PM" src="https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/aa8f6262-10ad-47b0-9ae9-8728a2b2a53f">
<img width="500" alt="Screenshot 2023-12-04 at 5 48 32 PM" src="https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/e1b1fb39-a4ce-4c65-bb5d-749464734f2e">

### Map and Statistical Charts
Under the header and introduction are our tornado map and two statistical charts, which provide a statistical summary of tornado numbers and property loss caused by tornadoes.
<img width="1407" alt="Screenshot 2023-12-04 at 4 04 45 PM" src="https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/2a8d70e7-c6f9-43d4-af8a-c5ea509a6ee9">

### Color Design
Our original design of map was to use multiple colors to represent the number of tornadoes. However, we found that this design could be confusing and not easily convey the severity. Therefore, we changed the color to a 'gray and red' scale. Gray indicates that no tornadoes occurred in that state, while red indicates the occurrence of tornadoes. The darker the red color, the higher the tornado count.
Additionally, when we hover over a state, it will turn yellow, and a tooltip with more detailed information will appear. In the final design, we included more information than in the original design, including tornado number, injuries number, fatalities number, total loss, and total crop loss.

<img width="600" alt="Screenshot 2023-12-04 at 6 00 45 PM" src="https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/c2dfdbb0-d534-4a85-aef6-6f39dc7d612e">

### Drop-down Menu
There are three drop-down menus above the maps. In contrast to the original design, which only had the year as our selection, we have included month and state as additional selections. The purpose of this modification is to allow users to easily check the monthly number of tornadoes since tornado influences might vary in different seasons.

<img width="624" alt="tornado drop-down menu" src="https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/c5a97486-024c-4f0f-bd73-604642cdbb0d">

### Chart Design
In our original design, the intention was to present yearly statistics by state, with the x-axis representing years, not months. However, recognizing the meaningful insights that could arise from monthly comparisons within each state, we made a modification. The x-axis is now divided into 12 months, allowing users to easily observe variations between months in a year. Additionally, to enhance user readability, we have included numerical values above each bar in the bar chart, providing users with precise numbers for each month.


## Story-telling with Our Data
We provided two user cases as examples to help users understand how they can use our system to do any comparison and further analysis.

### Comparison of Tornado Occurrence in Different Seasons
In the first case, we envision users interested in determining which season poses a higher risk of tornadoes. This information can be easily discerned through the distribution of tornadoes on the map by adjusting the year and month settings. For this comparison, we use two years (2022 and 2021) as examples, defining December to February as the winter season and June to August as the summer season.
Upon comparison, we observed an increased occurrence of tornadoes in the south and southeast during the winter season of 2022. However, tornadoes were more widespread and frequent during the summer season. This pattern was consistent in 2021 as well. Based on these results, users can understand that tornadoes are more likely to occur in the summer. Consequently, if planning travel in the US, extra caution may be warranted during the summer months.

#### Tornado occurrence in 2022 winter
![tornadoes in winter(2022)](https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/0928c597-51c6-4be3-aa0d-e25168c2f33e)

#### Tornado occurrence in 2022 summer
![summer tornado in 2022](https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/6542c5a5-ab12-4902-8fd3-70aede2554be)

#### Tornado occurrence in 2021 winter
![winter tornado (2021)](https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/360e7f06-b927-4cb9-8859-451f1a4f8b3e)

#### Tornado occurrence in 2021 summer
![summer tornado in 2021](https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/29f11d39-1a52-447b-bc0a-5f0346547a89)

### Comparison Between Two States
In this case, we consider that users might be interested in comparing tornado occurrences in different states. To illustrate, we have chosen to compare statistical charts for North Carolina and Florida as an example. Instead of limiting the comparison to a single year, we have extended it to three years to capture long-term trends.
Upon comparison, we observed that Florida experiences tornadoes consistently throughout the year and across a broader range of times. This information suggests that, for users deciding between North Carolina and Florida as a place to live, the higher risk of tornadoes in Florida might discourage them from choosing that state.

#### Tornado occurrence in North Carolina from 2020 to 2022
![NC_tornado(2022-2020)](https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/2ded6379-8321-4fe7-b982-7f7eb0a96544)

#### Tornado occurrence in Florida from 2020 to 2022
![FL_tornado(2020-2022)](https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/c910d528-1dde-477d-8e66-9eb44b676955)


## Challenges and Solutions
### Data Inconsistency
While creating a bar chart illustrating property losses caused by tornadoes, we noticed that some bars extended beyond the expected range. Upon reviewing the original data, we identified a discrepancy: the data documentation specifies the unit as million dollars, yet certain values are recorded without this unit (e.g., 1000000). This inconsistency does not align with the intended scale, resulting in losses exceeding a trillion dollars for events in a single month. Approximately 250 data points exhibit this issue, particularly in the data recorded after 2015. We suspect that there might be an incorrect conversion in the data, leading to this discrepancy. To address this inconsistency, we have decided to rectify the values recorded after 2015 by dividing them by 1 million.

### Refining Data Visualization for Tornado Occurrences
Initially, we designed two statistical charts utilizing line charts to enhance trend observation. However, due to the sporadic nature of tornado occurrences, the inclusion of lines became less informative, especially when the number frequently reaches 0. As a result, we have decided not to include lines in our bar chart. This adjustment aims to better represent the data and provide a clearer visual presentation, particularly in cases where tornadoes are infrequently reported.

### Challenges in Implementation
Originally, our design included a feature where users could click on a state, prompting changes in the statistical charts. However, during implementation, we encountered difficulties in achieving this functionality. Subsequently, we modified the design to incorporate a drop-down menu, allowing users to select the state. While this compromise design achieves similar goals, it is somewhat less user-friendly. During testing, checking a single state posed no significant issues. However, when attempting to compare different states simultaneously, it became cumbersome to locate specific states within the drop-down options. Therefore, the optimal design would integrate both functions seamlessly into the system.


## Ethical and Societal Considerations
### Inconsistent Data Availability
Losses and injuries are not uniform across every state or month of the year. Initially, our focus was on discerning trends in different states over various years. However, the low frequency of tornadoes often results in zero data points, making trend identification challenging. This might lead to the misconception that certain states experience no losses or casualties. Therefore, reconsidering the analysis by state may be more appropriate.

### Scale of Losses and Visibility Concerns
The vast scale of losses poses a challenge, as extremely small values may be compressed in charts, hindering data visibility and affecting user judgment. Careful consideration of scale adjustments is essential for accurate data representation.

### Ensuring Accuracy of Information
To foster user trust, it is imperative to provide accurate and reliable data. Misinformation or errors in data visualization could lead to misunderstandings about tornado risks and preparedness. Regularly updating the data ensures alignment with the most current information, preventing misleading conclusions.

### Preventing Misuse of Data
Acknowledging the potential for data misuse is crucial. For instance, insurance companies might leverage tornado frequency data to justify premium increases in specific areas. It is essential to clearly state the intended use of the data and provide context to mitigate the risk of misuse.

### Avoiding Unnecessary Alarm
In the presentation of tornado data, it is crucial to prevent unwarranted panic or stress among the public. Accompanying visualizations with context and a proper risk assessment can contribute to maintaining a balanced perspective. By providing clear explanations and emphasizing the context of the data, users are better equipped to interpret the information without unnecessary alarm. This approach supports informed decision-making and fosters a more measured response to tornado-related insights.

