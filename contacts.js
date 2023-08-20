/* data structure to send to endpoint
    *id
    *name
    *phoneNumber
    *email
    *birthday
    *location
*/

const apiEndPoint = "https://64d99efce947d30a260a2ccb.mockapi.io/unit2/contact";

class Contact //contact object
{
    constructor(name, email, phone, location, birthday) 
    {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.birthday = birthday;
    }
}

class ContactService 
{
    static url = "https://64d99efce947d30a260a2ccb.mockapi.io/unit2/contact";

    static getAllContacts() 
    {
        return $.get(this.url); //return all contacts from the server
    }

    static getContact(id)
    {
        return $.get(`${this.url}/${id}`)//endpoint of the specific contact
        //console.log(`${this.url}/1`)
        //return $.get(`${this.url}/1`)
    }

    static createContact(contact)
    {
        return $.post(this.url, contact);
    }

    static updateContact(contact)
    {
        return $.ajax({
            url: `${this.url}/${contact_id}`,
            dataType: 'json',
            data: JSON.stringify(contact),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteContact(id)
    {
        return $.ajax({
            url: `${this.url}/${id}`,
            type: 'DELETE'
        });
    }


}

class DomManager {
    static contacts; //all contacts

    static getAllContacts() 
    {
        ContactService.getAllContacts().then(contacts => this.render(contacts));
    }

    static deleteContact(id)
    {
        ContactService.deleteContact(id)
        .then(()=> 
        {
            return ContactService.getAllContacts();
        })
        .then((contacts) => this.render(contacts));
    }

    static createContact()
    {
        let name = $('#name').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let location = $('#location').val();
        let birthday = $('#birthday').val();

        let contactToCreate = new Contact(name,email,phone,location, birthday);
        ContactService.createContact(contactToCreate)

    }

    //helper function referenced in update contact
     static updateName = (element, updateValue) => 
     {
        //console.log("checkbox clicked!")
        let toChange = $(`#${element}`);
        toChange.replaceWith(`<h5 class="card-title mt-3 mb-3" id= "name-12">${updateValue}</h5>`);
    }

    //helper function referenced in update contact
    static updateLocation = (element, updateValue) =>
    {
        let toChange = $(`#${element}`);
        toChange.replaceWith(`<p class="text-center" id = "location-12">${updateValue}</p>`);
    }

    static updateEmail = (element, updateValue) =>
    {
        let toChange = $(`#${element}`);
        toChange.replaceWith
        (`<div class ="mb-3" id="email-container-12">
        <i class=" card-icon fa fa-envelope fa-lg mr-3"></i>
        <p class ="card-text" id = "${element}-12">${updateValue}</p>`);
    }

    static updatePhone = (element, updateValue) =>
    {
        let toChange = $(`#${element}`);
        toChange.replaceWith
        (`<div class ="mb-3" id="phone-container-12">
        <i class=" card-icon fa fa-phone fa-lg mr-3"></i>
        <p class ="card-text" id = "${element}-12">${updateValue}</p>`);
    }

    static updateBirthday = (element, updateValue) =>
    {
        let toChange = $(`#${element}`);
        toChange.replaceWith
        (`<div class ="mb-3" id="birthday-container-12">
        <i class=" card-icon fa fa-birthday-cake fa-lg"></i>
        <p class ="card-text" id = "${element}-12">${updateValue}</p>`);
    }

    static updateContact(id)
    {
        let currentCard = $(`#card-${id}`);
        currentCard.prepend(`<p class ="change-text">Please click on the field you wish to change to update information</p>`);

        let name = $(`#name-${id}`);
        let location = $(`#location-${id}`);
        let email = $(`#email-container-${id}`);
        let phone = $(`#phone-container-${id}`);
        let birthday = $(`#birthday-container-${id}`);
        let updateButton = $(`#update-button-${id}`);

        updateButton.replaceWith
        (`<button type="button" class="btn btn-success" id ="submit-update-button">Submit</button>`)
        
        name.on( "click", ()=> 
        {
            name.replaceWith
            (`
                <div class = "form-floating mb-3" id ="name-${id}">
                <i class=" icon fa fa-check fa-lg" id = "name-confirm" onclick = "DomManager.updateName('name-${id}', $('#nameInput').val())"></i>
                <input type = "text" class = "form-control form-control-sm mb-1" id = "nameInput" placeholder = "Please ender updated name">
                <label for = "changeName">New Name</label>
                </div>
            `
            );

        });

        location.on("click", ()=> 
        {
            location.replaceWith
            (`
                <div class = "form-floating mb-3" id ="location-${id}">
                <i class=" icon fa fa-check fa-lg" id = "location-confirm" onclick = "DomManager.updateLocation('location-${id}', $('#locationInput').val())"></i>
                <input type = "text" class = "form-control form-control-sm mb-1" id = "locationInput" placeholder = "Please enter updated location">
                <label for = "locationInput">New Location</label>
                </div>
            `)

        });

        email.on("click", ()=> 
        {
            email.replaceWith
            (`
                <div class = "form-floating mb-3" id ="email-${id}">
                <i class=" icon fa fa-check fa-lg" id = "email-confirm" onclick = "DomManager.updateEmail('email-${id}', $('#emailInput').val())"></i>
                <input type = "text" class = "form-control form-control-sm mb-1" id = "emailInput" placeholder = "Please enter updated email">
                <label for = "emailInput">New Email</label>
                </div>
            `)

        });

        phone.on("click", ()=> 
        {
            phone.replaceWith
            (`
                <div class = "form-floating mb-3" id ="phone-${id}">
                <i class=" icon fa fa-check fa-lg" id = "phone-confirm" onclick = "DomManager.updatePhone('phone-${id}', $('#phoneInput').val())"></i>
                <input type = "text" class = "form-control form-control-sm mb-1" id = "phoneInput" placeholder = "Please enter updated phone">
                <label for = "phoneInput">New Phone</label>
                </div>
            `)

        });

        birthday.on("click", ()=> 
        {
            birthday.replaceWith
            (`
                <div class = "form-floating mb-3" id ="birthday-${id}">
                <i class=" icon fa fa-check fa-lg" id = "birthday-confirm" onclick = "DomManager.updateBirthday('birthday-${id}', $('#birthdayInput').val())"></i>
                <input placeholder="Birthday" type="text" onfocus="(this.type = 'date')"  id="birthdayInput" class = "form-control">
                <label for = "birthdayInput">New Birthday</label>
                </div>
            `)

        });
    }

    static render(contacts) {
        this.contacts= contacts;
        $('#app').empty();

        let counter = 0;
        for (let contact of contacts)
        {
            $('#app').prepend(
            `<div class = "col-sm-3">
                <div class="card text-center mt-5">
                    <div class="card-body contact-card" id ="card-${contact.id}">
                      <h5 class="card-title mt-3 mb-3" id= "name-${contact.id}" =>${contact.name}</h5>
                      <p class="text-center" id= "location-${contact.id}">${contact.location}</p>
                      <i class="fa fa-user-circle large-icon mb-3 text-center"></i>
                      <div class ="mb-3" id="email-container-${contact.id}">
                        <i class=" card-icon fa fa-envelope fa-lg mr-3"></i>
                        <p class =" card-text">${contact.email}</p>
                      </div>
                      <div class ="mb-3" id = "phone-container-${contact.id}">
                        <i class=" card-icon fa fa-phone fa-lg"></i>
                        <p class ="card-text">${contact.phone}</p>
                      </div>
                      <div class ="mb-3" id = "birthday-container-${contact.id}">
                        <i class=" card-icon fa fa-birthday-cake fa-lg"></i>
                        <p class ="card-text">${contact.birthday}</p>
                      </div>
                      <div class="col-md-12 text-center">
                        <button type="button" class="btn btn-primary mt-3 mb-3 p-2 contact-button" id="update-button-${contact.id}" onclick = "DomManager.updateContact('${contact.id}')">Update</button>
                        <button type="button" class="btn btn-danger mt-3 mb-3 p-2 contact-button" id ="delete-button-${contact.id}" onclick = "DomManager.deleteContact('${contact.id}')">Delete</button>
                    </div>
                    </div>
                </div>
            </div>`)
            counter ++
        }
    }
}

//

