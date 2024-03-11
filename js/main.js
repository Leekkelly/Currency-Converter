document.addEventListener('DOMContentLoaded', function(){
    const convert = document.querySelector('#convert');
    const amount = document.querySelector('#amount');
    const currencies = document.querySelector('#currencies');
    const exchangeCurrencies = document.querySelector('#exchangeCurrencies');
    const resultsDiv = document.querySelector('#results');

    convert.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(`amount:`, amount.value);
        console.log(`inputed:`, currencies.value);
        console.log(`exchange:`, exchangeCurrencies.value);

        const url = `https://api.frankfurter.app/latest?amount=${amount.value}&from=${currencies.value}&to=${exchangeCurrencies.value}`;

        axios.get(url).then(function(response){
            console.log(`response by url`, response.data);
            console.log(`base`, response.data.base);
            console.log(`rates`, response.data.rates);

            const exchangeResults = response.data.rates;

            let resultsHtml = `
                <div class="base">
                    <p>In today ${response.data.date} Amount of: ${response.data.amount} From ${response.data.base} exchange to`;

            // Loop through each exchange currency and append it to the HTML
            for (const currency in exchangeResults) {
                resultsHtml += ` ${currency}:${exchangeResults[currency]}`;
            }

            resultsHtml += `</p></div>`;

            resultsDiv.innerHTML += resultsHtml;
            
        })
        .catch(function(err){
            console.log(`error loading exchange results`, err);
            resultsDiv.innerHTML = 'An error performing exchange'
        });
    });
    
    

});