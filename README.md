# weather-tracker

# 06 Server-Side APIs: Weather Dashboard

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./Assets/06-server-side-apis-homework-demo.png)

## Grading Requirements

This homework is graded based on the following criteria:

### Technical Acceptance Criteria: 40%

- Satisfies all of the above acceptance criteria plus the following:

  - Uses the OpenWeather API to retrieve weather data.

  - Uses `localStorage` to store persistent data.

## Review

You are required to submit BOTH of the following for review:

- The URL of the functional, deployed application.

https://tracyewilhelm.github.io/weather-tracker/

- The URL of the GitHub repository. Give the repository a unique name and include a readme describing the project.

https://github.com/tracyewilhelm/weather-tracker

---

© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
