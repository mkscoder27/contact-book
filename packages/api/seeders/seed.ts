async function executeSeeders() {
    try {
        // add seeders from here
        console.log("All seeders executed successfully!");
    } catch (error) {
        console.error("Error occurred during seeding:", error);
    }
}

executeSeeders().catch((error) => {
    console.error(error);
});
