// Scroll to top of the current page
const returnToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

//Filter expand and collapse
const filterToggle = element => {
  let filterSection = document.querySelector(".recipes__filtercontainer");
  if (element.className.indexOf("recipes__filterhide") === -1) {
    element.classList.add("recipes__filterhide");
    filterSection.classList.add("recipes__sectionhide");
  } else {
    element.classList.remove("recipes__filterhide");
    filterSection.classList.remove("recipes__sectionhide");
  }
};
// hamburger menu toggle
const hamburgerMenuToggle = () => {
  let hamburgerElement = document.querySelector(".header__hamburgermenu");
  if (hamburgerElement.className.indexOf("header__hamburgershow") === -1) {
    hamburgerElement.classList.add("header__hamburgershow");
  } else {
    hamburgerElement.classList.remove("header__hamburgershow");
  }
};

// Raw html data to append the dynamic form field in newsletter
const formHtml = random => ` <div class="d--flex newsletter__content">
<div class="newsletter__item ">
    <label class="newsletter__label" for="name__${random}">Name</label>
    <input class="newsletter__input newsletter__name" id="name__${random}" Placeholder="Enter name" type="text" maxlength="50"/>
    <p class="name__${random} newsletter__error"></p>
</div>
<div class="newsletter__item">
    <label class="newsletter__label" for="surname__${random}">Surname</label>
    <input class="newsletter__input newsletter__surname" type="text" id="surname__${random}" maxlength="50" Placeholder="Enter surname"/>
    <p class="surname__${random} newsletter__error"></p>
</div>
<div class="newsletter__item">
    <label class="newsletter__label" for="email__${random}">Email address</label>
    <input class="newsletter__input newsletter__email" type="text" Placeholder="Enter email address" id="email__${random}"  maxlength="50"/>
    <p class="email__${random} newsletter__error"></p>
</div>
<div class="newsletter__item d--flex newsletter__removecontent hide">
    <div onClick="removeFriend(${random})" class="d--flex"><img class="newsletter__remove" alt="The Grilled Prawn - remove image" src="assets/images/delete.png" />
    <span class="cursor--ptr newsletter__removetext" >Remove</span></div>
</div>
<div class="newsletter__item d--flex  newsletter__addcontent">
    <button type="button" class="newsletter__addfrd cursor--ptr" onClick="addFriend()"> Add Friend</button>
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

  if (dataInstance.getData().length > 0) {
    console.log(dataInstance.getData());
    alert("Invitations sent successfully");
    for (let i = 0; i < nameArray.length; i++) {
      emailArray[i].value = surnameArray[i].value = nameArray[i].value = "";
    }
  }
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
    let isError = false;
    let emailErrorId = "";
    for (let i = 0; i < this.names.length; i++) {
      this.names[i].value = this.names[i].value.trim();
      this.surnames[i].value = this.surnames[i].value.trim();
      this.emails[i].value = this.emails[i].value.trim();
      document.querySelector(`.${this.names[i].id}`).innerHTML = "";
      document.querySelector(`.${this.surnames[i].id}`).innerHTML = "";
      document.querySelector(`.${this.emails[i].id}`).innerHTML = "";

      for (let object of jsonData) {
        if (object.email == this.emails[i].value) {
          emailErrorId = this.emails[i].id;
          break;
        }
      }
      if (
        this.names[i].value == "" ||
        !/^[A-Za-z ]+$/.test(this.names[i].value)
      ) {
        document.querySelector(
          `.${this.names[i].id}`
        ).innerHTML = `Please enter valid name`;
        isError = true;
        break;
      } else if (
        this.surnames[i].value == "" ||
        !/^[A-Za-z ]+$/.test(this.surnames[i].value)
      ) {
        document.querySelector(
          `.${this.surnames[i].id}`
        ).innerHTML = `Please enter valid surname`;
        isError = true;
        break;
      } else if (
        this.emails[i].value == "" ||
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.emails[i].value
        )
      ) {
        document.querySelector(
          `.${this.emails[i].id}`
        ).innerHTML = `Please enter valid email`;
        isError = true;
        break;
      } else if (emailErrorId.length > 0) {
        document.querySelector(
          `.${this.emails[i].id}`
        ).innerHTML = `Email Id already entered`;
        isError = true;
        break;
      }

      jsonData.push({
        name: this.names[i].value,
        surname: this.surnames[i].value,
        email: this.emails[i].value
      });
    }
    if (isError) return [];
    return jsonData;
  }
}
