document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links");
    const currentElements = document.querySelectorAll(".current");
    const previousElements = document.querySelectorAll(".previous");

    navLinks.forEach((link) => {
        link.addEventListener("click", async (e) => {
            // Remove "active" class from all list items
            navLinks.forEach(li => li.classList.remove("active"));

            // Add "active" class to the clicked item
            e.target.classList.add("active");

            const period = e.target.textContent.toLowerCase();
            const data = await getData();
            console.log(data);

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

    async function getData() {
        const res = await fetch(`./data.json`);
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }
        const data = await res.json();
        return data;
    }
});
