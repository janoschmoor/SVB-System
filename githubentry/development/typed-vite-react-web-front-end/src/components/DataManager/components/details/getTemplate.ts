const users = () => {
    return {
        id: "",
        roles: ["client"],
        is_admin: false,
        is_coach: false,
        is_client: true,
        sallary: "",
        access_level: 0,
        created_at: Date.now(),
        last_update: Date.now(),
        status: "created",
        linked: false,
        form_of_adress: "",
        first_name: "",
        last_name: "",
        street: "",
        house_number: "",
        postal_code: "",
        city: "",
        country_ISO2: "",
        country: "",
        portrait_url: null,
        phone_numbers: [],
        phone_number: "",
        date_of_birth: 0,
        email: undefined,
        preffered_language: "d",
        parents: [],
        parent_ids: [],
        children: [],
        new_messages: [],
        availability: "never",
        courses: [],
        invoice_delivery: "post",
    }
}


export default (type: string) => {
    switch (type) {
        case "users":
            return users;
    
        default:
            return undefined;
    }
}