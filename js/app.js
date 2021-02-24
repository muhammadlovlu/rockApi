function search(){
    const searchText = document.getElementById("search-text").value;
    const api = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(api)
    .then(res => res.json())
    .then(data => console.log(data))
}