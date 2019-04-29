

$(document).ready(function () {

    let arrAllCountries = [];

    function AllCountries() {

        $("#searchContiner").html("");
        $("#titel").html("All Countries");
        WaitLoad("countriesContiner");

        $.ajax({

            type: "GET",
            url: "https://restcountries.eu/rest/v2/all",

            success: function (result) {

                arrAllCountries = result;

                $("#countriesContiner").empty();

                for (let i = 0; i < arrAllCountries.length; i++) {
                    CreateCardTemplet("countriesContiner", arrAllCountries[i].flag, arrAllCountries[i].name, arrAllCountries[i].topLevelDomain, arrAllCountries[i].capital, arrAllCountries[i].currencies[0].code, arrAllCountries[i].currencies[0].name, arrAllCountries[i].currencies[0].symbol);
                }

            }

        });

    }

    AllCountries();

    $("#allCountriesBtn").on("click", () => {

        AllCountries();

    })

    $("#searchBtn").on("click", () => {

        let valueSrerch = $("#searchInp").val();

        $("#countriesContiner").html("");
        $("#searchContiner").html("");

        if (valueSrerch == "") {
            AllCountries();
        }

        else {

            $("#titel").html(`Results for search '${valueSrerch}'`);
            $("#searchInp").val("");

            $.ajax({

                type: "GET",
                url: `https://restcountries.eu/rest/v2/name/${valueSrerch}`,

                success: function (result) {

                    for (let i = 0; i < result.length; i++) {
                        CreateCardTemplet("searchContiner", result[i].flag, result[i].name, result[i].topLevelDomain, result[i].capital, result[i].currencies[0].code, result[i].currencies[0].name, result[i].currencies[0].symbol);
                    }

                }

            });

        }

    })

    function CreateCardTemplet(idElemet, flag, name, topLevelDomain, capital, currenciesCode, currenciesName, currenciesSymbol) {


        $(`#${idElemet}`).append(`
                                    
                <div class="card" style="width: 21rem;">
                    <img src="${flag}" alt="flag">
                    <div class="card-body">
                    <h5 class="card-title">Name:</h5>
                    <p class="card-text">${name}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Top Level Domain: ${topLevelDomain}</li>
                    <li class="list-group-item">Capital: ${capital}</li>
                    <li class="list-group-item">
                    <div>Currencies:</div>
                    <div>${currenciesCode} / ${currenciesName} / ${currenciesSymbol}</div>    
                    </li>
                    </ul>
                </div>
    
            `);

    }

    function WaitLoad(idElemet) {

        $(`#${idElemet}`).html(`
        
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
           <span class="sr-only">Loading...</span>
        </div>

        `);

    }



});









