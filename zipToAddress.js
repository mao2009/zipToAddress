const fetch_jsonp = document.createElement( 'script' );
fetch_jsonp.type = 'text/javascript';
fetch_jsonp.src = "https://cdn.jsdelivr.net/npm/fetch-jsonp@1.1.3/build/fetch-jsonp.min.js";
document.body.appendChild(fetch_jsonp);
let zipToAddress = null;

fetch_jsonp.onload = () => {
    zipToAddress = (zip1, zip2, prefecture, city = "", street = "", func = "") =>{
        const API_URL = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

        let zip = "";
        if (zip1 === null) {
            return;
        }

        zip = document.querySelector(zip1).value;
        if (zip2 !== "") {
            zip += document.querySelector(zip2).value;
        }

        zip = zip.replace(/[０-９]/g, function(str) {
            return String.fromCharCode(str.charCodeAt(0) - 0xFEE0);
        });

        zip = zip.match(/\d/g).join("");

        const url = API_URL + zip;
        const addressInput = document.querySelector(prefecture);

        fetchJsonp(url, {
            timeout: 10000,
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.status === 400) {
                console.log(data.message);
            } else if (data.results === null) {
                console.log("郵便番号から住所が見つかりませんでした");
            } else {
                const reslutPref =  data.results[0].address1;
                const reslutCity = data.results[0].address2;
                const reslutStreet = data.results[0].address3;

                const prefInput = document.querySelector(prefecture);

                if (prefInput.nodeName  === "SELECT"){
                    const options = prefInput.options;
                    const reslutPref =  data.results[0].address1;

                    for (let i = 0; i < options.length; i++) {
                        if (options[i].innerHTML == reslutPref) {
                            options[i].selected = true;
                        }
                    }
                } else {
                    prefInput.value = reslutPref;
                }

                if (city === "") {
                    if (prefInput.nodeName  !== "SELECT"){
                        prefInput.value += reslutCity;
                    }
                } else {
                    document.querySelector(city).value = reslutCity;
                }

                if (street === "") {
                    if(city === "") {
                        if (prefInput.nodeName  !== "SELECT"){
                            prefInput.value += reslutStreet;
                        }
                    } else {
                        document.querySelector(city).value += reslutStreet;
                    }
                } else {
                    document.querySelector(street).value = reslutStreet;
                }

                if (func !== "") {
                    func(data);
                }
            }
        }).catch((e) => {
            console.log(e);
        });
    }
}