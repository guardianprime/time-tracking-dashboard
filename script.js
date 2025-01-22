document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links");
    const currentElements = document.querySelectorAll(".current");
    const previousElements = document.querySelectorAll(".previous");

    const timeData = {
        daily: {
            work: { current: "5hrs", previous: "7hrs" },
            play: { current: "1hr", previous: "2hrs" },
            study: { current: "0hrs", previous: "1hr" },
            exercise: { current: "1hr", previous: "1hr" },
            social: { current: "1hr", previous: "3hrs" },
            selfCare: { current: "0hrs", previous: "1hr" },
        },
        weekly: {
            work: { current: "32hrs", previous: "36hrs" },
            play: { current: "10hrs", previous: "8hrs" },
            study: { current: "4hrs", previous: "7hrs" },
            exercise: { current: "4hrs", previous: "5hrs" },
            social: { current: "5hrs", previous: "10hrs" },
            selfCare: { current: "2hrs", previous: "2hrs" },
        },
        monthly: {
            work: { current: "103hrs", previous: "128hrs" },
            play: { current: "23hrs", previous: "29hrs" },
            study: { current: "13hrs", previous: "19hrs" },
            exercise: { current: "11hrs", previous: "18hrs" },
            social: { current: "21hrs", previous: "23hrs" },
            selfCare: { current: "7hrs", previous: "11hrs" },
        },
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const period = e.target.textContent.toLowerCase();
            updateTimeData(period);
        });
    });

    function updateTimeData(period) {
        currentElements.forEach((element, index) => {
            const activity = element.closest(".main__item").classList[1];
            element.textContent = timeData[period][activity].current;
            previousElements[index].textContent = `Previous - ${timeData[period][activity].previous}`;
        });
    }
});