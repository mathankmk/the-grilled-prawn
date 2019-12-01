// Scroll to top of the current page
const returnToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// Raw html data to append the dynamic form field in newsletter
const formHtml = random => ` <div class="d--flex newsletter__content">
<div class="newsletter__item ">
    <label class="newsletter__label" for="name__${random}">Name</label>
    <input class="newsletter__input newsletter__name" id="name__${random}" type="text" />
</div>
<div class="newsletter__item">
    <label class="newsletter__label" for="surname__${random}">Surname</label>
    <input class="newsletter__input newsletter__surname" type="text" id="surname__${random}"/>
</div>
<div class="newsletter__item">
    <label class="newsletter__label" for="email__${random}">Email address</label>
    <input class="newsletter__input newsletter__email" type="text" id="email__${random}"/>
</div>
<div class="newsletter__item d--flex newsletter__removecontent hide">
    <div onClick="removeFriend(${random})" class="d--flex"><img class="newsletter__remove" alt="The Grilled Prawn - remove image" src="assets/images/delete.png" />
    <span class="cursor--ptr newsletter__removetext" >Remove</span></div>
</div>
<div class="newsletter__item d--flex  newsletter__addcontent">
    <button type="button" class="newsletter__addfrd" onClick="addFriend()"> Add Friend</button>
</div>
</div>`;

// Add display none to loading element - first time
// Hide or show the remove and add friend button
// Add class(newsletter--bdrbtm) to removable element
// Used to append the Raw data in newletter
const addFriend = () => {
  let dynamicValue = new Date().getTime();
  let dynamicHtml = formHtml(dynamicValue);

  let loadingElement = document.getElementById("newsletterloading");
  let deleteElement = document.querySelector(".newsletter__removecontent.hide");
  let addElement = document.querySelector(".newsletter__addcontent:not(.hide)");
  let parentsElement = document.querySelector(
    ".newsletter__content:not(.newsletter--bdrbtm)"
  );
  if (loadingElement.className.indexOf("hide") === -1) {
    loadingElement.classList.add("hide");
  }
  if (deleteElement) {
    deleteElement.classList.remove("hide");
  }
  if (addElement) {
    addElement.classList.add("hide");
  }
  if (parentsElement) {
    parentsElement.classList.add("newsletter--bdrbtm");
  }
  var nodeElement = document.createElement("div");
  nodeElement.id = `newletter__${dynamicValue}`;
  nodeElement.innerHTML = dynamicHtml;
  document.getElementById("newsletter__form").appendChild(nodeElement);
};

//First call to append First Form data
addFriend();

// Remove the selected row
const removeFriend = removableElementId => {
  document.getElementById(`newletter__${removableElementId}`).remove();
};

// Get the all input node - name, surname and email addres
const sendFormData = () => {
  let nameArray = document.querySelectorAll(".newsletter__name");
  let surnameArray = document.querySelectorAll(".newsletter__surname");
  let emailArray = document.querySelectorAll(".newsletter__email");
  let dataInstance = new FormFieldData(nameArray, surnameArray, emailArray);
  console.log(dataInstance.getData());
};

// Class for format the form field data
class FormFieldData {
  constructor(names = [], surnames = [], emails = []) {
    this.names = names;
    this.surnames = surnames;
    this.emails = emails;
  }
  getData() {
    let jsonData = [];
    for (let i = 0; i < this.names.length; i++) {
      jsonData.push({
        name: this.names[i].value,
        surname: this.surnames[i].value,
        email: this.emails[i].value
      });
    }
    return jsonData;
  }
}
