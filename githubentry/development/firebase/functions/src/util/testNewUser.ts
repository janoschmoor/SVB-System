import IUser from "../interfaces/user/user";

const getNewUser = (user: any): IUser => {
    let t = `${2000+Math.floor(Math.random()*10)}-${1+Math.floor(Math.random()*12)}-${1+Math.floor(Math.random()*31)}`;
    return {
      id: user.uid,
      roles: ["client"],
      access_level: 0,
      created_at_numeric: Date.now(),
  
      form_of_adress: "",
      first_name: user.first_name,
      last_name: user.last_name,
      street: "",
      house_number: "",
      postal_code: "",
      city: "",
      country_ISO2: "",
      country: "",
      portrait_url: null,
  
      phone_numbers: { default: "" },
      // date_of_birth: `${1+Math.floor(Math.random()*31)}.${1+Math.floor(Math.random()*12)}.${2000+Math.floor(Math.random()*10)}`,
      date_of_birth: t,
      date_of_birth_numeric: Date.parse(t),
      email: user.email,
      preffered_language: "d",
  
      status: "passive",
  
      //  LinkedAccounts
      parent: null,
      children: [],
      
      // ChatRooms
      new_messages: [
        {
          id: Math.random.toString(),
          sender_id: "admin",
          message: "Wilkommen in der Schwimmschule beider Basel",
          time_numeric: Date.now(),
        }
      ],
      chatrooms: [],
      availability: "always",
      
      // Courses
      courses: [],
      
      //  Invoices
      invoice_delivery: "email",
      invoices: [],
    }
  }

export default getNewUser