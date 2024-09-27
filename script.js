const apiKey = 'b15fa32dcb3747b08ae35bfd6aa78fe0';

const blogContainer = document.getElementById
("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apikey=${apiKey}`;
        const response = await fetch(apiUrl); 
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articless = await fetchnewsQuery(query);
            displayBlogs(articless);
        } catch(error){
            console.log("error fetching news by query", error);
        }
    }
});

async function fetchnewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl); 
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((articles) =>{
        const blogCard = document.createElement
        ("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = articles.title;
        
        const title = document.createElement("h2");
        const truncatedTitle = 
        articles.title.length > 30
         ? articles.title.slice(0, 30) +"...."
         :articles.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        
        // Check if description is present and handle undefined/null descriptions
        if (articles.description) {
            const truncatedDes = articles.description.length > 120
                ? articles.description.slice(0, 120) + "...."
                : articles.description;
            description.textContent = truncatedDes;
        } else {
            description.textContent = "Click Here for More Info"; // Fallback if description is missing
        }


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=>{
            window.open(articles.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}


(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news", error);
    }
}) ();