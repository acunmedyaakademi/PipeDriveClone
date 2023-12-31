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
const dealsCount = document.querySelector('#deal-count')
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
let deal;
let targetElId;
let changeAreaId;
let targetEl;
let targetElVal;
let deleteBtns;

function renderCards(){
    let draggedItem = null;
    bodySection.innerHTML= ""
    tableList.style.display="none"
    cardsData.forEach(cardData=>{
        // debugger
        let total = 0;
        bodySection.innerHTML+=`
            <div class="project qualified" id="${cardData.id}">
                <h3>${cardData.title}</h3>
                <p class="project-total">₺<span class="total${cardData.id}">${total}</span></p>
                <ul class="product droptarget" id="product${cardData.id}"></ul>
                <button class="project-add">+</button>
            </div>`;

            

        product = document.querySelector('#product'+cardData.id); 
        const projectAddBtns = document.querySelectorAll('.project-add')
        const closeBtn = document.querySelector('.reset');
        cardTotal = document.querySelector(".total"+cardData.id);
        cardTotal.innerText="0"
        projectAddBtns.forEach(projectAddBtn => projectAddBtn.addEventListener('click', addDeal))
        closeBtn.addEventListener('click', closeDialog)
        dealsData.forEach(dealData=> {   
            if(dealData.stage=== cardData.id) {
                let findedPerson =contactsData.find(person => person.id === dealData.contactPersonId)
                product.innerHTML+= `
                    <li class="deal" value="${dealData.id}" draggable="true" id="deal${dealData.stage}">
                        <h4><span class="${dealData.title}">${dealData.title}</span></h4>
                        <div class="detail">
                            <span class="${dealData.companyId}">${dealData.title}</span>,<span id="contact ${dealData.contactPersonId}"> ${findedPerson.firstName} ${findedPerson.lastName} </span>
                        </div>
                        <div class="deal-footer">
                            <span id="${dealData.cost}">₺${dealData.cost.toLocaleString('en-US')}</span>
                            <button onclick="removeDeal(this)" class="deleteBtn">X</button>
                        </div>
                    </li>
                    `
                    deal = document.querySelector('#deal'+dealData.stage);
                    const dealFooter = document.querySelector(".deal-footer")
                    total += dealData.cost;
                    cardTotal.innerText = total.toLocaleString('en-US')
                    
                }     
                       
            });
            dealsCount.innerText=dealsData.length


            document.querySelectorAll('.deal').forEach(x => x.addEventListener('dragstart', function(){ draggedItem = this; } ))
            
    });



    document.querySelectorAll('.product').forEach(x => {
        x.addEventListener("drop", drop);
        x.addEventListener("dragover", dragover);
        x.addEventListener("dragstart", dragstart)
    });
    function dragstart (e){
        targetElId=e.target.id
        targetEl=e.target
        targetElVal=e.target.value
        const droptargets = document.querySelectorAll('.droptarget')
        droptargets.forEach(droptarget => {
            droptarget.style.border="1px solid gray";
            droptarget.style.borderRadius="10px";
        })
        
    }
    function dragover(e) {
        e.preventDefault();
        
    }
    function drop() {

        changeAreaId=this.id.substr(7)
        targetEl.removeAttribute("id")
        targetEl.setAttribute("id","deal"+changeAreaId)
        targetElId=parseInt(changeAreaId)

        this.appendChild(draggedItem)

        dataUpdate()
    }

}

let removeBtnId;

function removeDeal(e) {
    removeBtnId = e.parentElement.parentElement.value
    console.log("calistim");
    e.parentElement.parentElement.classList.add("removed-deal")
    dealsData.forEach(dealData => {
        if(removeBtnId === dealData.id){
            deleteDeal(dealData)
        }
    })
    
}

async function deleteDeal(dealData) {
    const response = await fetch(`https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/deals?id=eq.${removeBtnId}`, {
        method: 'DELETE',
        body: JSON.stringify({
                id: dealData.id,
                contactPersonId: dealData.contactPersonId,
                companyId: dealData.companyId,
                title: dealData.title,
                cost: dealData.cost,
                stage: dealData.stage,
                expectedCloseDate: dealData.expectedCloseDate
              }
        ),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorizationKey}`,
            'ApiKey': authorizationKey,
        },
    })
    reload();
}

function dataUpdate(){
    dealsData.forEach(x=>{
        if (targetElVal===x.id){
            renderUpdatedData(x)
        }
    })

}
async function renderUpdatedData (x){
    const response = await fetch(`https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/deals?id=eq.${targetElVal}`, {
        method: 'PUT',
        body: JSON.stringify({
                id: targetElVal,
                contactPersonId: x.contactPersonId,
                companyId: x.companyId,
                title: x.title,
                cost: x.cost,
                stage: targetElId,
                expectedCloseDate: x.expectedCloseDate
              }
        ),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorizationKey}`,
            'ApiKey': authorizationKey,
        },
    })
    reload()
}
let finded;
let findedCompanys;
function addDeal() {
    dialog.showModal()

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
    
    reload();
}
function reload() {
    window.location.reload()
    
}

const list = document.querySelector(".list");
const tableList = document.querySelector(".tableList")
const rotate = document.querySelector(".rotate");


list.addEventListener("click", getTable) 

function getTable() {
    bodySection.innerHTML="";
    tableList.style.display="block"
    rotate.addEventListener("click", renderCards);
    // bodySection.style.display="none";
    // const tableList = document.querySelector(".tableList").style.display = "block"

    tableList.innerHTML=`
    <div class="tableData">
        <div class="tableTitleColmn">
            <h4>Başlık</h4>
        </div>
        <div class="tableCostColmn">
            <h4>Değer</h4>
        </div>
        <div class="tableCompanyColmn">
            <h4>Kuruluş</h4>
        </div>
        <div class="tablePersonColmn">
            <h4>İrtibat Kişisi</h4>
        </div>
    </div>
    `
    const tableTitleColmn = document.querySelector(".tableTitleColmn")
    dealsData.forEach(dealData => {
        tableTitleColmn.innerHTML += `         
        
            <div class="tableTitleColmn">                
                <div class="table">
                    <p>${dealData.title}</p>
                </div>
            </div>                     
        
        `        
    });

    const tableCostColmn = document.querySelector(".tableCostColmn")
    dealsData.forEach(dealData => {
        tableCostColmn.innerHTML += `         
        <div class="tableCostColmn">
            <div class="table">
                <p> ₺ ${dealData.cost}</p>
            </div>
        </div> 
        `        
    });

  


    companysData.forEach(companyData => {
        tableCompanyColmn.innerHTML += `
        <div class="tableCompanyColmn">
            <div class="table">
                <p>${companyData.name}</p>
            </div>
        </div>
        `
    const tableCompanyColmn = document.querySelector(".tableCompanyColmn")

    })

    const tablePersonColmn = document.querySelector(".tablePersonColmn")

    contactsData.forEach(contactData => {
        tablePersonColmn.innerHTML += `
            <div class="tablePersonColmn">
                <div class="table">
                    <p>${contactData.firstName}</p>
                </div>
            </div>
        `
    });   
    
}

loadData();

