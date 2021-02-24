async function search() {
    const emptyListing = document.getElementById("song-listing");
    emptyListing.innerHTML = "";
    const search = document.getElementById("search-text").value;
    const api = `https://api.lyrics.ovh/suggest/${search}`;
    console.log(api)
    const res = await fetch(api)
    const data = await res.json()
    displayAllSongs(data.data)
}


const displayAllSongs = songs => {
    const listing = document.getElementById("song-listing");
    songs.forEach(song => {
        console.log(song)
        const div = document.createElement("div");
        div.className = "search-result col-md-8 mx-auto py-4";
        const songListing = `
       <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <audio controls>
                        <source src="${song.preview}" type="audio/mpeg">
                      Your browser does not support the audio element.
                      </audio>


                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success">Get Lyrics</button>
                    </div>
                </div> 
       `;
        div.innerHTML = songListing;
        listing.appendChild(div)
    });
}

