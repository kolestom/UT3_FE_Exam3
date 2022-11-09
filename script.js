const input = document.getElementById('input')

const displayMoreLess = (e) => {
    if (e.target.nextElementSibling.style.display === 'block'){
        e.target.innerText = 'Show more'
        e.target.nextElementSibling.style.display = 'none'
    } else {
        e.target.innerText = 'Show less'
        e.target.nextElementSibling.style.display = 'block'
    }
}

const container = document.getElementById('cardContainer')
const createCard = (data) => {
    let cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    container.append(cardDiv)
    let img = document.createElement('img')
    img.src = data.avatar_url
    cardDiv.append(img)
    let name = document.createElement('p')
    name.innerText = data.login
    cardDiv.append(name)
    let button = document.createElement('button')
    button.id = data.id
    button.innerText = 'Show more'
    cardDiv.append(button)
    button.addEventListener('click', displayMoreLess)
    let moreInfo = document.createElement('div')
    moreInfo.id = `moreInfo`
    moreInfo.style.display = 'none'
    cardDiv.append(moreInfo)

    let rank = document.createElement('p')
    rank.innerText = `Rank: ${data.type}`
    moreInfo.append(rank)
    let admin = document.createElement('p')
    admin.innerText = `Admin: ${data.site_admin}`
    moreInfo.append(admin)
    // console.log(data);
}


const getData = async () => {
    let response = await fetch(`https://api.github.com/users`);
    const data = await response.json();
    return data
};

const loadGallery = async () => {
    container.innerHTML = ''
    const dataList =  await getData()
    
    for (const data of dataList) {
        createCard(data)  
    }
}

loadGallery()

const filterCards = async (e) =>{
    console.log(e.target.value);
    const allCards = document.querySelectorAll('.card')
    console.dir(allCards);
    for (const card of allCards) {
        const isVisible = card.childNodes[1].innerText.startsWith(e.target.value)
        if (isVisible) {
            card.style.display = 'flex'
        } else {
            card.style.display = 'none'
        }
    }   
}

input.addEventListener('input', filterCards)