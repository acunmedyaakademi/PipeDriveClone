const product = document.querySelector('.product')

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
    const dealsData = await fetch("https://gnxykanwlpxajcvrkych.supabase.co/rest/v1/deals?select=*", requestOptions).then(response => response.text())
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

loadData();

