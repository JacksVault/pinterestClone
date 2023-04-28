const searchForm = document.getElementById('search-form')!;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const main = document.querySelector('main')!;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value;
  const images = await fetchImages(query);
  main.innerHTML = '';
  images.forEach((imageUrl) => {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    main.appendChild(imageElement);
  });
});

async function fetchImages(query: string): Promise<string[]> {
  const apiKey = ''; // Replace with your API key
  const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.results.map((result: any) => result.urls.regular);
}

//Alternatively you can use this
/*async function fetchImages(query: string): Promise<string[]> {
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY}`);
  const data = await response.json();
  const images = data.results.map((result: any) => result.urls.regular);
  return images;
} */
