export default async function fetchDataFromApi(setAllData) {
    try {
        const response = await fetch(
          BASE_API_URL+'/posts'
        );
        const jsonData = await response.json();
        localStorage.setItem("apiblogs", JSON.stringify(jsonData));
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }