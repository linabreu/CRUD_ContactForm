/* data structure to send to endpoint
    *id
    *name
    *phoneNumber
    *email
    *birthday
    *location
*/


const isNotBlank = (element) => { //can use this same one for name, location and birthday, just want it to not be blank

    let userInput = $(`#${element}`);
    if (userInput.val() == ""  || userInput.val() == null ) //name cannot be empies
    {
        userInput.addClass("error-input");
        return false
    }
    else
    {
        return true
    }


}
const isValidPhoneNumber = () => 
{
    let phoneInput = $('#phone');
    let filter = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;    
    if (filter.test(phoneInput.val())) 
    {
        return true;
    }
    else 
    {
        phoneInput.addClass("error-input");
        return false;
    }
}

const isValidEmail = () => {
    let emailInput = $('#email');
    var pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(!pattern.test(emailInput.val()))
    {
        emailInput.addClass("error-input")
        return false;
    }
    else
    {
        
        return true;
    }
}

const validateInput = () => 
{

    let elementUpdateList = ["name", "email", "phone", "location", "birthday"]
    isNotBlank('name');
    isNotBlank('location')
    isNotBlank('birthday')
    isValidEmail();
    isValidPhoneNumber();
    if( isNotBlank('name') == false || isNotBlank('location') == false || isNotBlank('birthday') == false ||  isValidPhoneNumber() == false || isValidEmail() == false)
    {
       console.log('invalid inputs')
    }
    else //if everything is valid - create the contact
    {
        DomManager.createContact()
        for(let i = 0; i < elementUpdateList.length; i++) //once we create the contact- remove all of the error styling
        {
            
            let currentElement = $(`#${elementUpdateList[i]}`);
            currentElement.toggleClass('error-input', false)
        }
        
    }
}

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

    }

    static createContact(contact)
    {
        return $.post(this.url, contact);
    }

    
    static updateContact(id)
    {

       $.ajax(`${this.url}/${id}`, {
        method: 'PUT',
        data: {
            name: $(`#name-text-${id}`).text(),
            email:$(`#email-text-${id}`).text(), 
            phone:$(`#phone-text-${id}`).text(), 
            location:$(`#location-text-${id}`).text(), 
            birthday: $(`#birthday-text-${id}`).text()
        }
       });

       let actionMessage = $(`#action-message-${id}`);
       actionMessage.toggleClass("change-text", false);
       actionMessage.text('Contact has been edited!');

       DomManager.getAllContacts();
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
    // helper functions for changing the fields in the contact cards when editing

        static updateCardMessage = (id) =>
        {
            let actionMessage = $(`#action-message-${id}`);
            actionMessage.toggleClass("change-text", false);
            actionMessage.addClass('confirm-text');
            actionMessage.text('Please click submit when you are finished editing');
        }

        //helper function referenced in update contact
        static updateName = (element, id, updateValue) => 
        {
            //console.log("checkbox clicked!")
            let toChange = $(`#${element}`);
            toChange.replaceWith(`<h5 class="card-title mt-3 mb-3" id= "name-text-${id}">${updateValue}</h5>`);
            DomManager.updateCardMessage(`${id}`);
        }

        //helper function referenced in update contact
        static updateLocation = (element, id, updateValue) =>
        {
            let toChange = $(`#${element}`);
            toChange.replaceWith(`<p class="text-center" id = "location-text-${id}">${updateValue}</p>`);
        }

        static updateEmail = (element, id, updateValue) =>
        {
            let toChange = $(`#${element}`);
            toChange.replaceWith
            (`<div class ="mb-3" id="email-container-${id}">
            <i class=" card-icon fa fa-envelope fa-lg mr-3"></i>
            <p class ="card-text" id= "email-text-${id}">${updateValue}</p>`);
        }

        static updatePhone = (element, id, updateValue) =>
        {
            let toChange = $(`#${element}`);
            toChange.replaceWith
            (`<div class ="mb-3" id="phone-container-${id}">
            <i class=" card-icon fa fa-phone fa-lg mr-3"></i>
            <p class ="card-text" id = "phone-text-${id}">${updateValue}</p>`);
        }

        static updateBirthday = (element, id, updateValue) =>
        {
            let toChange = $(`#${element}`);
            toChange.replaceWith
            (`<div class ="mb-3" id="birthday-container-${id}">
            <i class=" card-icon fa fa-birthday-cake fa-lg"></i>
            <p class ="card-text" id = "birthday-text-${id}">${updateValue}</p>`);


        }



    static updateContact(id)
    {
        let actionMessage = $(`#action-message-${id}`);
        actionMessage.addClass('change-text')
        actionMessage.text('Please click on the field you wish to update');

        let name = $(`#name-text-${id}`);
        let location = $(`#location-text-${id}`);
        let email = $(`#email-container-${id}`);
        let phone = $(`#phone-container-${id}`);
        let birthday = $(`#birthday-container-${id}`);
        let updateButton = $(`#update-button-${id}`);

        updateButton.replaceWith
        (`<button type="button" class="btn btn-success contact-button" id ="submit-update-button" onclick = "ContactService.updateContact(${id})">Submit</button>`)
        
        name.on( "click", ()=> 
        {
            name.replaceWith
            (`
                <div class = "form-floating mb-3" id ="name-${id}">
                <i class=" icon fa fa-check fa-lg" id = "name-confirm" onclick = "DomManager.updateName('name-${id}', ${id}, $('#nameInput').val())"></i>
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
                <i class=" icon fa fa-check fa-lg" id = "location-confirm" onclick = "DomManager.updateLocation('location-${id}', ${id}, $('#locationInput').val())"></i>
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
                <i class=" icon fa fa-check fa-lg" id = "email-confirm" onclick = "DomManager.updateEmail('email-${id}', ${id}, $('#emailInput').val())"></i>
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
                <i class=" icon fa fa-check fa-lg" id = "phone-confirm" onclick = "DomManager.updatePhone('phone-${id}', ${id}, $('#phoneInput').val())"></i>
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
                <i class=" icon fa fa-check fa-lg" id = "birthday-confirm" onclick = "DomManager.updateBirthday('birthday-${id}', ${id}, $('#birthdayInput').val())"></i>
                <input placeholder="Birthday" type="text" onfocus="(this.type = 'date')"  id="birthdayInput" class = "form-control">
                <label for = "birthdayInput">New Birthday</label>
                </div>
            `)

        });
    }

    static render(contacts) {
        this.contacts= contacts;
        $('#app').empty();
        for (let contact of contacts)
        {
            $('#app').prepend(
            `<div class = "col-sm-3">
                <div class="card text-center mt-5">
                    <div class="card-body contact-card" id ="card-${contact.id}">
                    <p class = "text-center" id="action-message-${contact.id}"><p>
                      <h5 class="card-title mt-3 mb-3" id="name-text-${contact.id}">${contact.name}</h5>
                      <p class="text-center" id= "location-text-${contact.id}">${contact.location}</p>
                      <i class="fa fa-user-circle large-icon mb-3 text-center"></i>
                      <div class ="mb-3" id="email-container-${contact.id}">
                        <i class=" card-icon fa fa-envelope fa-lg mr-3"></i>
                        <p class = "card-text" id= "email-text-${contact.id}">${contact.email}</p>
                      </div>
                      <div class ="mb-3" id = "phone-container-${contact.id}">
                        <i class=" card-icon fa fa-phone fa-lg"></i>
                        <p class ="card-text" id= "phone-text-${contact.id}">${contact.phone}</p>
                      </div>
                      <div class ="mb-3" id = "birthday-container-${contact.id}">
                        <i class=" card-icon fa fa-birthday-cake fa-lg"></i>
                        <p class ="card-text" id="birthday-text-${contact.id}">${contact.birthday}</p>
                      </div>
                      <div class="col-md-12 text-center">
                        <button type="button" class="btn btn-primary mt-3 mb-3 p-2 contact-button" id="update-button-${contact.id}" onclick = "DomManager.updateContact('${contact.id}')">Update</button>
                        <button type="button" class="btn btn-danger mt-3 mb-3 p-2 contact-button" id ="delete-button-${contact.id}" onclick = "DomManager.deleteContact('${contact.id}')">Delete</button>
                    </div>
                    </div>
                </div>
            </div>`)
        }
    }
}

//

