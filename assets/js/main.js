const product = document.querySelector('.product');
const dialog = document.querySelector('.dialog')
const projectAddBtns = document.querySelectorAll('.project-add')
const closeBtn = document.querySelector('.reset');
const formSubmitBtn = document.querySelector("#add-btn");
const formContactPerson = document.querySelector("#contact-person");
const formCompany = document.querySelector("#company");
const formTitle = document.querySelector("#title");
const formCost = document.querySelector("#cost")
const formDate = document.querySelector("#date")
const formPhone = document.querySelector("#phone");
const formEmail = document.querySelector("#email")

async function loadData() {
    
    let myHeaders = new Headers();
    myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const cardsData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/cards", requestOptions).then(response => response.json())
    for (const cardData of cardsData) {
        
    }
    const dealsData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/deals", requestOptions).then(response => response.text())
    for (const dealData of dealsData) {
        
    }
    renderDeals();

};
function renderDeals(data) {
    product.innerHTML+= `
    <li class="deal">
        <h4><span class="company">bilmem ne</span> anlaşması</h4>
        <div class="detail">
            <span class="company">bilmem ne</span>,<span id="contact">furkan</span>
        </div>
        <span id="cost">₺5</span>
    </li>
    `
}

projectAddBtns.forEach(projectAddBtn => projectAddBtn.addEventListener('click', addDeal))
closeBtn.addEventListener('click', closeDialog)
function addDeal() {
    dialog.showModal()
}
function closeDialog() {
    dialog.close()
}

formSubmitBtn.addEventListener("click", getForm)

async function getForm() {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdueHlrYW53bHB4YWpjdnJreWNoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzQxMzgzOCwiZXhwIjoyMDA4OTg5ODM4fQ.5ovwvbi5g2eTaK8R2KauWEhw5hPJ8aQsieXA7RYKjXs");
    
    let formdata =  new FormData();
    formdata.append("companyName", "");
    formdata.append("title", "");
    formdata.append("cost", "");
    formdata.append("stage", "");
    formdata.append("expectedCloseDate", "");
    formdata.append("contactPersonId", "");
    
    console.log(formdata);

    let requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow'
    };
    
    
    const cardData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/cards", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      console.log(cardData);
}

loadData();

