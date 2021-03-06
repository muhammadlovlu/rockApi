async function search() {
    const emptyListing = document.getElementById("song-listing");
    emptyListing.innerHTML = "";
    const search = document.getElementById("search-text").value;
    const api = `https://api.lyrics.ovh/suggest/${search}`;
    const res = await fetch(api)
    const data = await res.json()
    displayAllSongs(data.data)

}


const displayAllSongs = songs => {
    const listing = document.getElementById("song-listing");
    songs.forEach(song => {
        const div = document.createElement("div");
        div.className = "search-result col-md-8 mx-auto py-4";
        const songListing = `
       <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 id="song-title" class="lyrics-name">${song.title}</h3>
                        <audio controls>
                        <source src="${song.preview}" type="audio/mp3">
                      </audio>
                        <p class="author lead">Album by <span id="artist">${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="FindLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div> 
       `;
        div.innerHTML = songListing;
        listing.appendChild(div)
    });

}


async function FindLyrics(artist, title) {
    const artistName = artist;
    const songTitle = title;
    const api = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`
    const res = await fetch(api)
    const data = await res.json()
    lyrics(data)

}


const lyrics = data => {
    const lyrics = document.getElementById("lyrics");
    const p = document.createElement("p");
    p.className = "container d-flex justify-content-center";
    p.style.fontFamily = "'Anton', sans-serif";
    p.style.letterSpacing = "1.5px";
    p.innerText = data.lyrics;
    lyrics.appendChild(p);
    const hideListing = document.getElementById("song-listing");
    hideListing.style.display = "none";
    const searchEmpty = document.getElementById("search-text");
    searchEmpty.value = "";
}


