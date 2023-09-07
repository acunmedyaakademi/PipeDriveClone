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
const cardStage = document.querySelector("#card-stage");
const cardProject = document.querySelectorAll('.project');
let dealsData=[];
let cardsData=[];
let contactsData=[];
let companysData=[];

const authorizationKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs"

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
    renderCards()
};
let product;
let cardTotal;
let total = 0;

function renderCards(){
    bodySection.innerHTML= ""
    cardsData.forEach(cardData=>{
        bodySection.innerHTML+=`
        <div class="project qualified" id="${cardData.id}">
        <h3>${cardData.title}</h3>
        <p class="project-total">₺<span class="total">${total}</span></p>
        <ul class="product"></ul>
        <button class="project-add">+</button>
        </div>`
        product = document.querySelector('.product');
        const projectAddBtns = document.querySelectorAll('.project-add')
        const closeBtn = document.querySelector('.reset');
        cardTotal = document.querySelector(".total");
        projectAddBtns.forEach(projectAddBtn => projectAddBtn.addEventListener('click', addDeal))
        closeBtn.addEventListener('click', closeDialog)
    })
    renderDeals(product)
}
function renderDeals(product){
        
        dealsData.forEach(dealData => {
            let findedPerson =contactsData.find(person => person.id === dealData.contactPersonId)
            console.log(cardStage.id);
            console.log(findedPerson);
            product.innerHTML+= `
                <li class="deal" id="${cardStage.value}">
                    <h4><span class="${dealData.title}">${dealData.title}</span></h4>
                    <div class="detail">
                        <span class="${dealData.companyId}">${dealData.title}</span>,<span id="contact ${dealData.contactPersonId}"> ${findedPerson.firstName} ${findedPerson.lastName} </span>
                    </div>
                    <span id="${dealData.cost}">₺${dealData.cost}</span>
                </li>
                `
                // total += dealData.cost;
                // cardTotal.innerText = total;
                filterCards()
                
        })
        
}
function addDeal() {
    dialog.showModal()
    let finded;
    let findedCompanys;
    formContactPerson.innerHTML=`<option value="" disabled selected>Seçiniz</option>`
    contactsData.forEach(contactData => {
        formContactPerson.innerHTML += `
        <option value="${contactData.id}">${contactData.firstName} ${contactData.lastName}</option>
        `
    })
    formContactPerson.addEventListener("change", () => {
        formCompany.innerHTML=`<option value="" disabled selected>Seçiniz</option>`
        finded = contactsData.find(person=> person.id===parseInt(formContactPerson.value))
        findedCompanys=companysData.filter(companyData=> companyData.contactId===parseInt(formContactPerson.value))
        findedCompanys.forEach(find => {
            
            formCompany.innerHTML+=`<option id="${find.name}" value="${find.id}">${find.name}</option>`
        })
        formPhone.value=finded.phone
        formEmail.value=finded.email
        formCompany.addEventListener("change", (e) => {
            formTitle.value=e.target.querySelector(`option[value='${formCompany.value}']`).innerText + " anlaşması"

        })
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
    const response = await fetch('https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/deals', {
            method: 'POST',
            body: JSON.stringify( {
                    contactPersonId: formContactPerson.value,
                    companyId: formCompany.value,
                    title: formTitle.value,
                    cost: formCost.value,
                    stage: cardStage.value,
                    expectedCloseDate: formDate.value
                  }
            ),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authorizationKey}`,
                'ApiKey': authorizationKey,
            },
        })
    console.log(response);

    renderCards();
    closeDialog();
}

function filterCards() {
    cardsData
}

loadData();

