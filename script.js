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

const searchData = async (e) =>{
    container.innerHTML = ''
    console.log(e.target.value);
    const dataList = await getData()
    console.log(dataList[0].login);
    let filteredList = []
    for (let i =0; i<dataList; i++){
        if (dataList[i].login.startsWith(e.target.value)){
            filteredList.push(dataList[i])
        }
    }
    for (const data of filteredList) {
        createCard(data)  
    }
    // dataList.filter((item, input) => {item.login})
    
    console.log(dataList);

    
}

input.addEventListener('keyup', searchData)