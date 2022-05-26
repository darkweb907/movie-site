// key
const key = "b92e268c1a6740e42adedeb3d9ca0b9b"
const Base_url = "https://api.themoviedb.org/3"
const Api = `${Base_url}/discover/movie?sort_by=popularity.desc&api_key=${key}`
let show= document.querySelector(".img")
let grid= document.querySelector(".grid")
let main= document.querySelector("#main")
let form= document.querySelector("#search")
let path= "https://image.tmdb.org/t/p/w500/"
// fetch the api

let movie = async (url) => { 
    const response = await fetch(url)
    const time = await response.json()
    let data= time.results
    return data 
}
let card;
movie(Api).then((dams) => {
    dams.forEach(dam => {
        let image = document.createElement('div')
        let paste = document.createElement("img")
        card = document.createElement("div")
        card.setAttribute("class", "card")
            card.innerHTML = `
                <div class="card-img">
                    <img src="${path+dam.poster_path}" alt="img1">
                </div>
                <div class="card-body">
                        <div>
                            <h3>${dam.title}</h3>
                        </div>
                        <div class="rating"  ${getRating(dam.vote_average)}>
                            <h4>${dam.vote_average}</h4>
                        </div>
                </div>
                <div class="overview">${dam.overview}
                <h1 class="release">Release Date : ${dam.release_date}</h1>
                <button class="btn">Play Movie</button>
                </div>
                `
                       
            
            grid.appendChild(card)


            
                //play video
    
        play(dam.id)
        // paste.src = `https://image.tmdb.org/t/p/w500/${dam.poster_path}`
        // image.append(paste)
        // show.append(image)
    });
})

 //check the video average

let play = (id) => {
    let btns = document.querySelectorAll(".btn")
    btns.forEach(btn => { 
        btn.addEventListener("click", () => {
            const played = async () => { 
                const response = await fetch(`${Base_url}/movie/${id}/videos?api_key=${key}`)
                const time = await response.json()
                let data = time.results
                console.log(time)
                return time 
            }
            played().then((date) => {
                let data = date.results
                data.forEach(dat => {
                    if (date.id === id) {
                        let video = document.createElement("iframe")
                        video.setAttribute("src", `https://www.youtube.com/embed/${dat.key}`)
                        video.setAttribute("frameborder", "0")
                        video.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture")
                        video.setAttribute("allowfullscreen", "")
                        main.append(video)
                    } else {
                        console.log("no video")
                    
                     }
                   
                })
            })
        })
    })
}



// search

form.addEventListener("input", (e) => { 
    e.preventDefault();
    let search = e.target.value
    if(search.length > 0){
        let url = `${Base_url}/search/movie?query=${search}&api_key=${key}`
        movie= async (url) => { 
            const response = await fetch(url)
            const time = await response.json()
            let data= time.results
              console.log(data)
            return data 
        }
        movie(url).then((dam) => {
            grid.innerHTML = ""
            dam.forEach(dam => {
                let image = document.createElement('div')
                let paste = document.createElement("img")
                let card = document.createElement("div")
                card.setAttribute("class", "card")
                if (dam.poster_path == null) {
                    card.setAttribute("class", "d-none")
                }
                    card.innerHTML = `
                        <div class="card-img">
                            <img src="${path+dam.poster_path}" alt="img1">
                        </div>
                        <div class="card-body">
                                <div>
                                    <h3>${dam.title}</h3>
                                </div>
                                <div class="rating" ${getRating(dam.vote_average)}>
                                   <h4>${dam.vote_average}</h4>
                                </div>
                        </div>
                        <div class="overview">${dam.overview}
                             <h1 class="release">Release Date : ${dam.release_date}</h1>
                              <button class="btn">Play Movie</button>
                        </div>`
                
                    
                    grid.appendChild(card)
                // paste.src = `https://image.tmdb.org/t/p/w500/${dam.poster_path}`
                // image.append(paste)
                // show.append(image)

                play(dam.id)
            });
        })
    }
})

// get anime site

let click = document.querySelector("#click")

click.addEventListener("click", (e) => {
    e.preventDefault();
    const pie = `${Base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${key}`
    movie= async (url) => { 
        const response = await fetch(url)
        const time = await response.json()
        let data= time.results
        return data 
    }
    movie(pie).then((den) => { 
         grid.innerHTML = ""
        den.forEach(dam => {
                console.log(dam)
                let image = document.createElement('div')
                let paste = document.createElement("img")
                let card = document.createElement("div")
                card.setAttribute("class", "card")
                if (dam.poster_path == null) {
                    card.setAttribute("class", "d-none")
                }
                    card.innerHTML = `
                        <div class="card-img">
                            <img src="${path+dam.poster_path}" alt="img1">
                        </div>
                        <div class="card-body">
                                <div>
                                    <h3>${dam.title}</h3>
                                </div>
                                <div class="rating" ${getRating(dam.vote_average)}>
                                   <h4 >${dam.vote_average}</h4>
                                </div>
                        </div>
                        <div class="overview">${dam.overview}
                            <h1 class="release">Release Date : ${dam.release_date}</h1>
                            <button class="btn" id="hello">Play Movie</button>
                        </div>`
                
                    
                    grid.appendChild(card)
                // paste.src = `https://image.tmdb.org/t/p/w500/${dam.poster_path}`
                // image.append(paste)
                // show.append(image)

               play(dam.id)

            });
    })
})
  

const getRating = (vote) => {
            let rating= document.querySelectorAll('.rating')
            rating.forEach(rate => {
                if(vote >= 8){
                    rate.style.color = "green"
                }else if(vote >= 5){
                    rate.style.color = "orange"
                } else {
                      rate.style.color = "red"
                }
            }

            )  }