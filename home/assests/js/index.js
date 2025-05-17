const token = localStorage.getItem('token')
  async function getCategory() {
    try {
      const response = await fetch("https://localhost:7170/api/Categorys", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });

      const categorys = await response.json();
      localStorage.setItem("category", JSON.stringify(categorys))
      console.log (categorys)
    } catch (err) {
      console.log(err);
    }
  }
  getCategory();
