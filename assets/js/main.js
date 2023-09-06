const dialog = document.querySelector('.dialog')
const formSubmitBtn = document.querySelector("#add-btn");
const formContactPerson = document.querySelector("#contact-person");
const formCompany = document.querySelector("#company");
const formTitle = document.querySelector("#title");
const formCost = document.querySelector("#cost")
const formDate = document.querySelector("#date")
const formPhone = document.querySelector("#phone");
const formEmail = document.querySelector("#email");
const bodySection=document.querySelector(".section");
const cardStage = document.querySelector("#card-stage")
let dealsData=[];
let cardsData=[];
let contactsData=[];
let companysData=[];


async function loadData() {
    
    let myHeaders = new Headers();
    myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    dealsData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/deals", requestOptions).then(response => response.json())

    cardsData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/cards", requestOptions).then(response => response.json())
    contactsData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/contacts", requestOptions).then(response => response.json())
    companysData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/companys", requestOptions).then(response => response.json())
    console.log(cardsData)
    renderCards()
};

function renderCards(){
    let product;
    cardsData.forEach(cardData=>{
        bodySection.innerHTML+=`
        <div class="project qualified" id="${cardData.id}">
        <h3>${cardData.title}</h3>
        <p class="project-total">₺<span class="total">0</span></p>
        <ul class="product"></ul>
        <button class="project-add">+</button>

        </div>
        `
        product = document.querySelector('.product');
        const projectAddBtns = document.querySelectorAll('.project-add')
        const closeBtn = document.querySelector('.reset');
        projectAddBtns.forEach(projectAddBtn => projectAddBtn.addEventListener('click', addDeal))
        closeBtn.addEventListener('click', closeDialog)

    })
    renderDeals(product)

}


function renderDeals(product){
        dealsData.forEach(dealData => {
            product.innerHTML+= `
                <li class="deal">
                    <h4><span class="${dealData.title}">${dealData.title}</span> anlaşması</h4>
                    <div class="detail">
                        <span class="${dealData.companyId}">${dealData.title}</span>,<span id="contact ${dealData.contactPersonId}">${dealData.contactPersonId}</span>
                    </div>
                    <span id="${dealData.cost}">₺${dealData.cost}</span>
                </li>
                `
        })
}
function addDeal() {
    dialog.showModal()
    formContactPerson.innerHTML=`<option value="" disabled selected>Seçiniz</option>`
    contactsData.forEach(contactData => {
        formContactPerson.innerHTML += `
        <option value="${contactData.id}">${contactData.firstName} ${contactData.lastName}</option>
        `
    })
    formContactPerson.addEventListener("change", () => {
        const findPhone = contactsData.find(person=> person.id===parseInt(formContactPerson.value))
        formPhone.value=findPhone.phone
        formEmail.value=findPhone.email
    })
    cardStage.innerHTML=`<option value="" disabled selected>Seçiniz</option>`
    cardsData.forEach(cardData => {
        cardStage.innerHTML += `
        <option value="${cardData.id}">${cardData.title}</option>
        `
    })
}
function closeDialog() {
    dialog.close();
    
}

formSubmitBtn.addEventListener("click", getForm)

async function getForm() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "contactPersonId": 10,
      "companyName": "comp",
      "title": "tit",
      "cost": 10000,
      "stage": 1,
      "expectedCloseDate": "2023-12-11"
    });
    
    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
}

loadData();

