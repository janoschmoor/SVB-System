import IUser from "../../../../interfaces/user/user";

const compileUpdates = (form: any, user: IUser | undefined) => {
    if (user) {        
        var newUser: any = {
            // roles: form.get('roles') == user.roles ? null : form.get('roles'),
            // access_level: form.get('accessLevel') == user.access_level ? null : form.get('accessLevel'),
            status: form.get('status') == user.status ? null : form.get('status'),
            // discount: form.get('discount') == user.discount ? null : form.get('discount'),
            // special_pass: form.get('specialPass') == user.special_pass ? null : form.get('specialPass'),
            // special_pass_valid_until: form.get('specialPassValidUntil') == user.special_pass_valid_until ? null : form.get('specialPassValidUntil'),
            // special_pass_reduction: form.get('specialPassReduction') == user.special_pass_reduction ? null : form.get('specialPassReduction'),
            
            form_of_adress: form.get('formOfAdress') == user.form_of_adress ? null : form.get('formOfAdress'),
            first_name: form.get('firstName') == user.first_name ? null : form.get('firstName'),
            last_name: form.get('lastName') == user.last_name ? null : form.get('lastName'),
            street: form.get('street') == user.street ? null : form.get('street'),
            house_number: form.get('houseNumber') == user.house_number ? null : form.get('houseNumber'),
            postal_code: form.get('postalCode') == user.postal_code ? null : form.get('postalCode'),
            city: form.get('city') == user.city ? null : form.get('city'),
            country: form.get('country') == user.country ? null : form.get('country'),
            portrait_url: form.get('portraitUrl') == user.portrait_url ? null : form.get('portraitUrl'),
            note: form.get('note') == user.note ? null : form.get('note'),
            phone_numbers: { default: form.get('phoneNumbers') },
            // date_of_birth: form.get('dateOfBirth') == user.date_of_birth ? null : form.get('dateOfBirth'),
            // // dateOfBirthNumeric: form.get('dateOfBirthNumeric') == user.roles ? null : form.get('roles'),
            email: form.get('email') == user.email ? null : form.get('email'),
            preffered_language: form.get('prefferedLanguage') == user.preffered_language ? null : form.get('prefferedLanguage'),

            // parent: form.get('parent') == user.parent ? null : form.get('parent'),
            // children: form.get('children') == user.children ? null : form.get('children'),

            // // newMessages: form.get('newMessages') == user.roles ? null : form.get('roles'),
            // // chatrooms: form.get('chatrooms') == user.roles ? null : form.get('roles'),
            // availability: form.get('availability') == user.availability ? null : form.get('availability'),
            
            // // Courses
            // courses: form.get('courses') == user.courses ? null : form.get('courses'),
            
            // //  Invoices
            // // invoice_delivery: form.get('invoiceDelivery') == user.invoice_delivery ? null : form.get('invoiceDelivery'),
            // // invoices: form.get('invoices') == user.invoices ? null : form.get('invoices'),
        }
        // Object.keys(newUser).forEach(key => newUser[key] === null ? delete newUser[key] : {});
        Object.keys(newUser).forEach(key => newUser[key] === null && delete newUser[key])
        return newUser;
    }
    return {};
}

export default compileUpdates;