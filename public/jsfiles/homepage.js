let infoStorage = [{carName:'AUDI V8',
    img:"/cars/audi.png",
    comfort: "comfortable and cozy",
    speed:"360km/hr - runner",
    mileage: "1000km/hr",
    price:177,
},
{carName:'JEEP WRANGLER',
    img:"/cars/JEEP-WRANGLER-RUBICON-.png",
    comfort: "Comfort and Balance",
    speed:"360km/hr - off-road",
    mileage: "1000km/hr",
    price:200,
},
{carName:'LAMBORGHINI',
    img:"/cars/lamborghini.png",
    comfort: "Comfort and Balance",
    speed:"360km/hr - flat",
    mileage: "1000km/hr",
    price:1000,
},
{carName:'PORSCHE',
    img:"/cars/porsche.webp",
    comfort: "Comfort and Balance",
    speed:"360km/hr - flat",
    mileage: "1000km/hr",
    price:1500,
},
{carName:'ROLLS ROYCE',
    img:"/cars/rolls royce.png",
    comfort: "Comfort and Balance",
    speed:"360km/hr - flat",
    mileage: "200km/hr",
    price:3000,
}
];

//this is used to close modal that shows cars info when clicked out side of the modal
dialog = document.querySelector('.infoDialog').addEventListener("click", e =>{
    if (e.target.classList.contains('infoDialog')) closeModal('infoDialog');
})


let containers = document.querySelectorAll('.cont');//we grab the three main containers that toggles on, on different button focus
let homepageContainer = document.querySelector('.homepageContainer'); //we grap a specific container

//this section listens for even on the carlisting section, particulary, each grid
let cars = document.querySelectorAll('.car1');
let childs = document.querySelectorAll('.child'); // grabbs all child element to disable event
let DialogContentMain = "";
childs.forEach(child => {
    child.style.pointerEvents = "none";
})

cars.forEach((car, buttonIndex)=>{
    car.addEventListener("click", event=>{

        //the aim of this code is to get the exact car name
        let rawText = event.target.textContent.trim();
        let cleanText = textCleaned(rawText); //a clean text is returned;

        let splitted = cleanText.split(' '); //we split cleanText into words inside array
        splitted.pop(splitted[splitted.length -1]) //we remmove the last element
        let result = splitted.join(' ') //we convert it back into string[ol]'
        retrieveFromDbAndDisplay(result, "infoDialog");
        
    })
})



//this function is for payment dialog section, it listens to event on the BOOKNOW button
let perDay; //this will be used to get the per day amount from the if block
let body = document.querySelector("body");
let bookNowButtons = body.addEventListener('click', (event)=>{
    if (event.target.textContent === "BOOK NOW"){
        openModal('paymentDialog');
        let bookNowDetails = event.target.parentElement.parentElement.textContent;
        let bookNowDetails4carName = event.target.parentElement.parentElement.parentElement.textContent;
        let cleanText = textCleaned(bookNowDetails); //clean text is returned from clicked element
        let cleanText2 = textCleaned(bookNowDetails4carName); //clean text is returned from clicked element
        let carName = extractCarName(cleanText2);
        retrieveFromDbAndDisplay(carName, "paymentDialog");

        perDay= selectMainPay(cleanText); //the actual amount per day is extracted from cleanText;
        console.log(perDay);
        
    }
})



//this function is to toggle between containers
function toggleContainers(inDex){
    containers.forEach((cont, index) =>{
        if (index === inDex) return;
        cont.style.display = "none";   
    })
    homepageContainer.style.display = "none";
    containers[inDex].style.display = "block";
}



//this function is used to retrieve info from data base above and then poopulate the frontend
function retrieveFromDbAndDisplay(identifier, whichDialog){
    //we then use the exact car name to fine it in our database and pupulate the  dialog
    if (whichDialog === "infoDialog"){
        infoStorage.forEach(item =>{
            if (item.carName === identifier){
                openModal('infoDialog');
                let DialogContent = ""; //for appending details
                for (let key in item){
                    console.log(item[key]);
                    DialogContent += `${item[key]} \n`; //values appended to DialogContent delimited by \n
                }
                DialogContent = DialogContent.split('\n'); //splitted by newline
    
                let dialogImg = document.querySelector('.dialogImg');
                let dialogCarname = document.querySelector('.dialogCarname');
                let dialogF1 = document.querySelector('.dialogF1');
                let dialogF2 = document.querySelector('.perSpeed');
                let dialogF3 = document.querySelector('.perKilo');
                let dialogPerday = document.querySelector('.perDay');
                //displaying to the frontend
                dialogImg.src = DialogContent[1];
                dialogCarname.textContent = DialogContent[0];
                dialogF1.textContent = DialogContent[2];
                dialogF2.textContent = DialogContent[3];
                dialogF3.textContent = DialogContent[4];
                dialogPerday.textContent = DialogContent[5]
                console.log(DialogContent);
            }
        })
    }
    else if (whichDialog === "paymentDialog"){
        infoStorage.forEach(item =>{
            let count = 0;
            if (item.carName === identifier){ //checks  if identifier matches a field in the database in this case, carname is the identifier
                let DialogContent = ""; //for appending details that will exposed to front end
                for (let key in item){
                    //console.log(item[key]);
                    DialogContent += `${item[key]} \n`; //details appended to DialogContent delimited by \n
                }
                DialogContent = DialogContent.split('\n'); //converted into an array
    
                let dialogImg = document.querySelector('.paymentdialogImg');
                let dialogCarname = document.querySelector('.paymentdialogCarname');
                let dialogF1 = document.querySelector('.paymentdialogF1');
                let dialogF2 = document.querySelector('.paymentperSpeed');
                let dialogF3 = document.querySelector('.paymentperKilo');
                let dialogPerday = document.querySelector('.paymentperDay');
                //displaying to the frontend
                dialogImg.src = DialogContent[1];
                dialogCarname.textContent = DialogContent[0];
                dialogF1.textContent = DialogContent[2];
                dialogF2.textContent = DialogContent[3];
                dialogF3.textContent = DialogContent[4];
                dialogPerday.textContent = DialogContent[5]
                //console.log(DialogContent);
                //console.log(DialogContent);
            }
        })
    }
}


//the aim of this code is to get a clean text  when a user clicks one of the grid element - it returns two words. carname and "DETAIL"
//this clean text is further processed to get actual data for other functions
function textCleaned(rawText){
        let cleanText = rawText.replace(/[\r\n]+/g, "").replace(/\s+/g, ' ').trim(); //used to remove all newlines and excess spacss
       return cleanText;
}

//this function essentially extracts the amount per day from the text returned by "function textCleaned(rawText)"
//which will be used by another function for further processsing
function selectMainPay(cleanText){
    //console.log(cleanText);
    let splitted = cleanText.split('PRICE$')[1].split('/day')[0]; //we split cleanText into words inside array
    splitted = +splitted;
    return splitted;
}


//this function closes a dialog by identifying which dialog is open 
function closeModal(whichDialog){
    if (whichDialog === "paymentDialog"){
        clearAllInput();
    }
    let modal = document.querySelector(`.${whichDialog}`);
    modal.close();
}

//this function opens a dialog by identifying which dialog needs to be opened
function openModal(whichDialog){
    let modal = document.querySelector(`.${whichDialog}`);
    modal.showModal();
}



//this function is used too extract the name of a vehicle for further use
//what it returns is inserted to retrieveFromDbAndDisplay(carName, "paymentDialog"); function to 
//check in database and populate the front end
    function extractCarName(text){
        let splitted = text.split("\n");
            splitted = splitted[0].split(" CLASS:")[0];
            return splitted;
    }
 
    
    // Store selected dates
    let selectedStart = null;
    let selectedEnd = null;

    // Function to calculate days when both dates are picked
    function calculateDifference() {
        totalAmount = document.querySelector('.totalAmount');

       if (selectedStart === selectedEnd){
            document.querySelector('.noOfDays').textContent = "1";
            totalAmount.textContent = `${perDay * 1}`;
           }
      else if (selectedStart && selectedEnd) {
        const start = new Date(selectedStart);
        const end = new Date(selectedEnd);

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const diff = end - start;
        const days = diff / (1000 * 60 * 60 * 24) + 1;
        document.querySelector('.noOfDays').textContent = `${days}`;
        totalAmount.textContent = `${perDay * days}`;
      }
      else if (selectedStart){
        document.querySelector('.noOfDays').textContent = "1";
        totalAmount.textContent = `${perDay}`;
      }

    }


    // Initialize flatpickr for both inputs
    const picker1 = flatpickr("#startDateInput", {
      altInput: true,
      enableTime: false,
      dateFormat: "Y-m-d",
      onChange: function(selectedDates, dateStr) {
        selectedStart = dateStr;
        calculateDifference();
      },
   
    });

    const picker2 = flatpickr("#stopDateInput", {
      altInput: true,
      enableTime: false,
      dateFormat: "Y-m-d",
      onChange: function(selectedDates, dateStr) {
        selectedEnd = dateStr;
        calculateDifference();
      }
    });

    //this function clears input in the booking details section og the payment dialog
    function clearAllInput(){
        picker1.clear();
        picker2.clear();
        document.getElementById('noOfDays').textContent= "";
        document.getElementById('totalAmount').textContent = "";
    }