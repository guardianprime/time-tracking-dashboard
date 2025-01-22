document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links");
    const currentElements = document.querySelectorAll(".current");
    const previousElements = document.querySelectorAll(".previous");



    navLinks.forEach((link) => {
        link.addEventListener("click", async (e) => {
            const period = e.target.textContent.toLowerCase();
            const dataPromises = Array.from(currentElements).map((_, index) => getData(index));
            const data = await Promise.all(dataPromises);

            currentElements.forEach((element, index) => {
                const cleanInfo = data[index].timeframes[period].current;
                let elementString = cleanInfo <= 1 ? `${cleanInfo}hr` : `${cleanInfo}hrs`;
                element.textContent = elementString;
            });

            previousElements.forEach((element, index) => {
                const cleanInfo = data[index].timeframes[period].previous;
                const oldDateMap = {
                    daily: "Yesterday",
                    weekly: "Last week",
                    monthly: "Last month"
                };
                const oldDate = oldDateMap[period];
                const elementString = `${oldDate} - ${cleanInfo}hr${cleanInfo !== 1 ? 's' : ''}`;
                element.textContent = elementString;
            });
        });
    });

    async function getData(number) {
        const res = await fetch(`http://localhost:3000/${number}`);
        const data = await res.json();
        return data;
    }



});