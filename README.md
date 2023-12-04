# US-Tornado-Hazard-Report
This system is developed by Wan-Ting Liao, Xuehan Wang, Yiwen Lou, which provides the tornado occurrence and damage report from 2010 to 2022.

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

Variables used in the system design:
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


Data Transformation and Statistical Analysis:

After data cleaning,  Our dataset still contains up to 160,000 records since the records cover 12 years. Considering the potential impact on chart rendering speed due to the statistical and integration processes in JavaScript, we opted to preprocess the data using R studio. The data was aggregated by year, month, and state, facilitating ease of use in system design. To complete this, we conducted counts for tornado occurrences and casualties on a monthly basis, which is more insightful to examine the cumulative tornado count, injuries, and property losses than viewing with data points. Additionally, to gain a clearer understanding of tornado distribution across states, we conducted state-level statistics. After conducting these calculations on the data using R, additional basic statistics such as maximum and minimum values are computed using JavaScript.


## Intended Visualization Design

## Final Design and Implementation

<img width="500" alt="Screenshot 2023-12-04 at 5 48 20 PM" src="https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/aa8f6262-10ad-47b0-9ae9-8728a2b2a53f">
<img width="500" alt="Screenshot 2023-12-04 at 5 48 32 PM" src="https://github.com/xuehanw/US-Tornado-Hazard-Report/assets/132614570/e1b1fb39-a4ce-4c65-bb5d-749464734f2e">


## Story-telling with Our Data


## Discussion of Design and Development Process

## Ethical and Societal Considerations
