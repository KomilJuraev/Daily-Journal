let BASE_URL = "";

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://localhost:4000";
  } else if (process.env.NODE_ENV === "production") {
    BASE_URL = process.env.REACT_APP_BASE_URL;
  }
  
//Gets all the data from database
export function fetchArticles() {
    return fetch(`${BASE_URL}/`)
        .then((res) => res.json())
        .catch((error) => {
            console.log("Error fetching data:", error);
            return [];
        });
}

//Gets specific article from the database by id
export async function getSpecificArticle(id, pageName) {
    try {
        const response = await fetch(`${BASE_URL}/${pageName}/${id}`);
        const data = await response.json();
        console.log("Success", data);
        return data;
    } catch (error) {
        console.log("Error fetching data:", error);
        return null;
    }
}

//Post an Article
export async function postArticle(dataToSend, navigate) {
    try {
        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })

        const data = await response.json();
        if (data.success) {
            console.log("Success", data);
            navigate("/")
        } else {
            console.log("Failed", data.message);
        }
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

//Patch Article
export async function updateArticle(id, dataToSend, navigate) {
    try {
      const response = await fetch(`${BASE_URL}/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        console.log("Success", response);
        navigate("/");
      } else {
        console.log("Failed", response.message);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
  
//Delete specific article from the database by id
export async function deleteSpecificArticle(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) { 
            console.log("Successfully deleted");
            return id; // Return the id after successful deletion
        } else {
            console.error("Failed to delete article");
            return null;
        }
    } catch (error) {
        console.log("Error deleting data:", error);
        return null;
    }
}
